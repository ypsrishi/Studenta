function deleteNotif(id) {
    const card = document.getElementById(id);
    card.style.transition = 'opacity 0.3s, transform 0.3s';
    card.style.opacity = '0';
    card.style.transform = 'translateX(30px)';
    setTimeout(() => {
      card.remove();
      checkEmpty();
      fireToast('red', 'Notification Removed', 'Notification deleted successfully.');
    }, 300);
  }

  function markAllRead() {
    const cards = document.querySelectorAll('.notif-card.unread');
    if (cards.length === 0) {
      fireToast('blue', 'Already Read', 'All notifications are already marked as read.');
      return;
    }
    cards.forEach(card => {
      card.classList.remove('unread');
      card.classList.add('read');
    });
    fireToast('green', 'All Marked as Read', `${cards.length} notification${cards.length > 1 ? 's' : ''} marked as read.`);
  }

  function checkEmpty() {
    const remaining = document.querySelectorAll('.notif-card');
    if (remaining.length === 0) {
      document.getElementById('empty-state').style.display = 'block';
    }
  }

  // Click card to mark as read
  document.querySelectorAll('.notif-card').forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.closest('.delete-btn')) return;
      if (this.classList.contains('unread')) {
        this.classList.remove('unread');
        this.classList.add('read');
        fireToast('blue', 'Marked as Read', 'Notification marked as read.');
      }
    });
  });

  function fireToast(color, title, msg) {
    const icons = {
      blue:  '<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
      green: '<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
      red:   '<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>'
    };
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon ${color}">${icons[color] || icons.blue}</div>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        <div class="toast-msg">${msg}</div>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">
        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>`;
    container.appendChild(toast);
    requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
    setTimeout(() => { toast.classList.add('hide'); setTimeout(() => toast.remove(), 350); }, 3500);
  }