// ── MODAL ──
  function openModal() {
    document.getElementById('modal-overlay').classList.add('open');
  }
  function closeModal() {
    document.getElementById('modal-overlay').classList.remove('open');
    document.getElementById('q-title').value = '';
    document.getElementById('q-desc').value = '';
    document.getElementById('q-category').value = '';
  }
  function handleOverlayClick(e) {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
  }
  function submitQuestion() {
    const title = document.getElementById('q-title').value.trim();
    const desc = document.getElementById('q-desc').value.trim();
    if (!title) { fireToast('blue', 'Missing Title', 'Please enter a question title.'); return; }
    if (!desc)  { fireToast('blue', 'Missing Description', 'Please add some details.'); return; }
    closeModal();
    fireToast('green', 'Question Posted!', `"${title}" is now live.`);
  }

  // ── VOTE ──
  function vote(btn, initial) {
    const col = btn.closest('.vote-col');
    const countEl = col.querySelector('.vote-count');
    if (btn.classList.contains('voted')) {
      btn.classList.remove('voted');
      countEl.textContent = parseInt(countEl.textContent) - 1;
    } else {
      btn.classList.add('voted');
      countEl.textContent = parseInt(countEl.textContent) + 1;
    }
  }

  // ── LIKE ──
  function toggleLike(btn, initial) {
    const current = parseInt(btn.textContent.trim()) || initial;
    if (btn.classList.contains('liked')) {
      btn.classList.remove('liked');
      btn.innerHTML = btn.innerHTML.replace(/\d+/, current - 1);
    } else {
      btn.classList.add('liked');
      btn.innerHTML = btn.innerHTML.replace(/\d+/, current + 1);
    }
  }

  // ── FILTER ──
  function filterPosts(tag, el) {
    document.querySelectorAll('.filter-tab').forEach(t => {
      t.classList.remove('active', 'all');
    });
    el.classList.add('active');
    if (tag === 'All') el.classList.add('all');

    document.querySelectorAll('.question-card').forEach(card => {
      const tags = card.dataset.tags || '';
      card.style.display = (tag === 'All' || tags.includes(tag)) ? '' : 'none';
    });
  }

  // ── TOAST ──
  function showToast(page) {
    fireToast('blue', page, `${page} page coming soon!`);
  }
  function fireToast(color, title, msg) {
    const icons = {
      blue: '<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
      green: '<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>'
    };
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon ${color}">${icons[color]||icons.blue}</div>
      <div class="toast-body"><div class="toast-title">${title}</div><div class="toast-msg">${msg}</div></div>
      <button class="toast-close" onclick="this.parentElement.remove()">
        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>`;
    container.appendChild(toast);
    requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
    setTimeout(() => { toast.classList.add('hide'); setTimeout(() => toast.remove(), 350); }, 3500);
  }