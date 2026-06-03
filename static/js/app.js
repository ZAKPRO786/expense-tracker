/* ── CATEGORY SELECTOR ── */
function selectCat(btn) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  document.getElementById('categoryInput').value = btn.dataset.cat;
}

// Activate first cat button on load
window.addEventListener('DOMContentLoaded', () => {
  const first = document.querySelector('.cat-btn');
  if (first) first.classList.add('selected');

  // Set today's date as default for add form
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(input => {
    if (!input.value && !input.closest('#editForm')) {
      const today = new Date().toISOString().split('T')[0];
      input.value = today;
    }
  });
});

/* ── EDIT MODAL ── */
function openEditModal(button) {
  const d = button.dataset;

  document.getElementById('editForm').action = '/edit/' + d.id;
  document.getElementById('editTitle').value   = d.title;
  document.getElementById('editAmount').value  = d.amount;
  document.getElementById('editCategory').value = d.category;
  document.getElementById('editDate').value    = d.date;
  document.getElementById('editNote').value    = d.note;

  document.getElementById('editModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('editModal').classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on overlay click
document.getElementById('editModal')?.addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// Close modal on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ── TOAST NOTIFICATIONS ── */
function showToast(message, type = 'info') {
  const icons = { success: '✅', danger: '❌', info: 'ℹ️' };
  const colors = { success: 'var(--success)', danger: 'var(--danger)', info: 'var(--accent)' };

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.borderLeft = `3px solid ${colors[type]}`;
  toast.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;

  document.getElementById('toast-container').appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s, transform 0.3s';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ── ADD FORM SUBMIT FEEDBACK ── */
const addForm = document.getElementById('addForm');
if (addForm) {
  addForm.addEventListener('submit', () => {
    const btn = addForm.querySelector('button[type="submit"]');
    if (btn) {
      btn.textContent = '⏳ Adding…';
      btn.disabled = true;
    }
  });
}

/* ── ANIMATE SUMMARY BARS ON LOAD ── */
window.addEventListener('load', () => {
  document.querySelectorAll('.summary-bar').forEach((bar, i) => {
    const target = bar.style.width;
    bar.style.width = '0';
    bar.style.transition = `width 0.6s ease ${i * 0.08}s`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bar.style.width = target;
      });
    });
  });
});

/* ── ACTIVE SIDEBAR LINK ── */
const path = window.location.pathname;
document.querySelectorAll('.nav-link').forEach(link => {
  link.classList.remove('active');
  if (link.getAttribute('href') === path) link.classList.add('active');
});
if (path === '/') {
  const dash = document.querySelector('.nav-link[href="/"]');
  if (dash) dash.classList.add('active');
}