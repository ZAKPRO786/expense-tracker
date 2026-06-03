# Expense Tracker

## Overview

A simple Expense Tracker web application built with Flask and SQLite. The application allows users to create, view, update, delete, and filter expenses while also providing a monthly spending summary grouped by category.

## Features

* Add new expenses
* Edit existing expenses
* Delete expenses
* Filter by category
* Filter by date range
* Search expenses by title
* Monthly spending summary
* Category-wise expense breakdown
* SQLite database persistence

## Tech Stack

* Flask
* SQLite
* SQLAlchemy
* HTML
* CSS
* JavaScript

## Project Structure

expense-tracker/

* app.py
* templates/
* static/
* requirements.txt

## Installation

1. Create virtual environment

python -m venv venv

2. Activate environment

Windows:

venv\Scripts\activate

3. Install dependencies

pip install -r requirements.txt

4. Run application

python app.py

5. Open browser

http://127.0.0.1:5000

## Database

The application uses SQLite with SQLAlchemy ORM.

Database file:

instance/expenses.db

## Design Decisions

* SQLite was chosen for simplicity and quick setup.
* SQLAlchemy provides ORM abstraction.
* Server-side filtering keeps logic centralized.
* Monthly summaries are computed directly from database queries.

## Edge Cases Handled

* Empty titles
* Negative amounts
* No expenses available
* Empty filter results
* Invalid date ranges

## Future Improvements

* User authentication
* Expense categories management
* Export to CSV/PDF
* Charts and analytics dashboard
* PostgreSQL support
* REST API support
