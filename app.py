from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import func

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///expenses.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(200), nullable=False)

    amount = db.Column(db.Float, nullable=False)

    category = db.Column(db.String(50), nullable=False)

    date = db.Column(db.Date, nullable=False)

    note = db.Column(db.Text)


with app.app_context():
    db.create_all()


@app.route("/")
def index():

    category = request.args.get("category", "")
    search = request.args.get("search", "")
    from_date = request.args.get("from_date", "")
    to_date = request.args.get("to_date", "")

    query = Expense.query

    if category:
        query = query.filter(Expense.category == category)

    if search:
        query = query.filter(Expense.title.ilike(f"%{search}%"))

    if from_date:
        query = query.filter(
            Expense.date >= datetime.strptime(
                from_date,
                "%Y-%m-%d"
            ).date()
        )

    if to_date:
        query = query.filter(
            Expense.date <= datetime.strptime(
                to_date,
                "%Y-%m-%d"
            ).date()
        )

    expenses = query.order_by(
        Expense.date.desc()
    ).all()

    now = datetime.now()

    summary = db.session.query(
        Expense.category,
        func.sum(Expense.amount)
    ).filter(
        func.extract("month", Expense.date) == now.month,
        func.extract("year", Expense.date) == now.year
    ).group_by(
        Expense.category
    ).all()

    total = sum(item[1] for item in summary) if summary else 0

    return render_template(
        "index.html",
        expenses=expenses,
        summary=summary,
        total=total
    )


@app.route("/add", methods=["POST"])
def add_expense():

    title = request.form["title"].strip()

    amount = float(request.form["amount"])

    category = request.form["category"]

    date = datetime.strptime(
        request.form["date"],
        "%Y-%m-%d"
    ).date()

    note = request.form["note"]

    if not title:
        return redirect("/")

    if amount <= 0:
        return redirect("/")

    expense = Expense(
        title=title,
        amount=amount,
        category=category,
        date=date,
        note=note
    )

    db.session.add(expense)
    db.session.commit()

    return redirect("/")


@app.route("/delete/<int:id>")
def delete_expense(id):

    expense = Expense.query.get_or_404(id)

    db.session.delete(expense)

    db.session.commit()

    return redirect("/")


@app.route("/edit/<int:id>", methods=["POST"])
def edit_expense(id):

    expense = Expense.query.get_or_404(id)

    expense.title = request.form["title"]

    expense.amount = float(request.form["amount"])

    expense.category = request.form["category"]

    expense.date = datetime.strptime(
        request.form["date"],
        "%Y-%m-%d"
    ).date()

    expense.note = request.form["note"]

    db.session.commit()

    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)