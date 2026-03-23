// ── OPEN/CLOSE MODALS ──
  function openEdit() { document.getElementById('edit-modal').classList.add('open'); }
  function openSettings() { document.getElementById('settings-modal').classList.add('open'); }
  function closeModal(id) { document.getElementById(id).classList.remove('open'); }
  function handleOverlay(e, id) { if (e.target === document.getElementById(id)) closeModal(id); }

  // ── AVATAR CHANGE ──
  function handleAvatarChange(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      const src = e.target.result;
      // Update main avatar
      const circle = document.getElementById('profile-avatar');
      circle.innerHTML = `<img src="${src}" alt="avatar" />`;
      // Update modal preview
      document.getElementById('modal-avatar-preview').innerHTML = `<img src="${src}" alt="avatar" />`;
      // Update sidebar
      document.getElementById('sidebar-avatar-letter').style.background = 'var(--accent-blue)';
      fireToast('green', 'Photo Updated', 'Profile photo changed successfully.');
    };
    reader.readAsDataURL(file);
  }

  // ── SAVE PROFILE ──
  function saveProfile() {
    const first = document.getElementById('edit-firstname').value.trim();
    const last  = document.getElementById('edit-lastname').value.trim();
    const email = document.getElementById('edit-email').value.trim();
    const dept  = document.getElementById('edit-department').value;
    const year  = document.getElementById('edit-year').value;
    const role  = document.getElementById('edit-role').value;

    if (!first || !last) { fireToast('orange','Missing Name','Please enter your full name.'); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { fireToast('orange','Invalid Email','Please enter a valid email address.'); return; }

    const fullName = `${first} ${last}`;

    // Update profile card
    document.getElementById('display-name').textContent = fullName;
    document.getElementById('display-dept').textContent = `${dept} • ${year}`;
    document.getElementById('display-role').textContent = role;
    document.getElementById('display-email').textContent = email;
    document.getElementById('display-department').textContent = dept;
    document.getElementById('avatar-letter').textContent = first[0].toUpperCase();

    // Update modal preview
    document.getElementById('modal-preview-name').textContent = fullName;
    document.getElementById('modal-avatar-letter').textContent = first[0].toUpperCase();

    // Update sidebar
    document.getElementById('sidebar-name').textContent = fullName;
    document.getElementById('sidebar-role').textContent = role;
    document.getElementById('sidebar-avatar-letter').textContent = first[0].toUpperCase();

    closeModal('edit-modal');
    fireToast('green', 'Profile Updated', 'Your changes have been saved successfully.');
  }

  // ── SAVE SETTINGS ──
  function saveSettings() {
    closeModal('settings-modal');
    fireToast('green', 'Settings Saved', 'Your preferences have been updated.');
  }

  // ── TOAST ──
  function fireToast(color, title, msg) {
    const icons = {
      blue:   '<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
      green:  '<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
      orange: '<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
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