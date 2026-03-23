// ── TOAST ──
  const toastMessages = {
    download: (name) => ({ icon: 'green', iconSvg: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>', title: 'Download Started', msg: `"${name}" is downloading...` }),
    view:     (name) => ({ icon: 'blue',  iconSvg: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>', title: 'Preview', msg: `Opening preview for "${name}"` }),
    upload:   ()     => ({ icon: 'blue',  iconSvg: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>', title: 'Upload Resource', msg: 'Upload feature coming soon!' }),
    mentorship:()    => ({ icon: 'orange',iconSvg: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>', title: 'Mentorship', msg: 'Mentorship page coming soon!' }),
    facilities:()    => ({ icon: 'orange',iconSvg: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/></svg>', title: 'Facilities', msg: 'Facilities page coming soon!' }),
    notifications:() => ({ icon: 'blue', iconSvg: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>', title: 'Notifications', msg: 'Notifications page coming soon!' }),
    profile:  ()     => ({ icon: 'blue', iconSvg: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>', title: 'Profile', msg: 'Profile page coming soon!' }),
  };

  function showToast(type, name) {
    const data = toastMessages[type] ? toastMessages[type](name) : null;
    if (!data) return;

    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon ${data.icon}">${data.iconSvg}</div>
      <div class="toast-body">
        <div class="toast-title">${data.title}</div>
        <div class="toast-msg">${data.msg}</div>
      </div>
      <button class="toast-close" onclick="dismissToast(this.parentElement)">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;
    container.appendChild(toast);
    requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));

    setTimeout(() => dismissToast(toast), 3500);
  }

  function dismissToast(toast) {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 350);
  }

  // ── CARD CLICK ──
  document.querySelectorAll('.resource-card').forEach(card => {
    card.addEventListener('click', function() {
      const title = this.dataset.title;
      showToast('view', title);
    });
  });

  // ── SEARCH & FILTER ──
  function filterCards() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const type = document.getElementById('filter-type').value;
    const year = document.getElementById('filter-year').value;
    const cards = document.querySelectorAll('.resource-card');
    let visible = 0;

    cards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      const subject = card.dataset.subject.toLowerCase();
      const cardType = card.dataset.type;
      const cardYear = card.dataset.year;

      const matchSearch = !query || title.includes(query) || subject.includes(query);
      const matchType = type === 'All' || cardType === type;
      const matchYear = year === 'All' || cardYear === year;

      if (matchSearch && matchType && matchYear) {
        card.style.display = '';
        visible++;
      } else {
        card.style.display = 'none';
      }
    });

    document.getElementById('no-results').style.display = visible === 0 ? 'block' : 'none';
  }