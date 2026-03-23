// ── DATA ──
var approvals = [
  { id: 1, title: 'Database Management Systems Notes', uploader: 'Rahul Sharma', date: '2023-10-18', type: 'Notes', subject: 'DBMS', year: '3rd Year', size: '3.2 MB', status: 'pending' },
  { id: 2, title: 'Computer Networks Lecture Slides', uploader: 'Priya Patel', date: '2023-10-17', type: 'Notes', subject: 'CN', year: '4th Year', size: '5.1 MB', status: 'pending' },
  { id: 3, title: 'Algorithms PYQ 2021', uploader: 'Amit Kumar', date: '2023-10-16', type: 'PYQ', subject: 'Algorithms', year: '2nd Year', size: '1.4 MB', status: 'pending' },
];

var passkeys = [
  { id: 1, code: 'CS-BATCH-2026', batch: 'Computer Science 2026', uses: 48, maxUses: 100, expiry: '2026-12-31', status: 'active' },
  { id: 2, code: 'IT-SEM3-2025', batch: 'IT Semester 3', uses: 30, maxUses: 50, expiry: '2025-06-30', status: 'expired' },
  { id: 3, code: 'DS-BATCH-2025', batch: 'Data Science 2025', uses: 12, maxUses: 60, expiry: '2026-05-01', status: 'active' },
];

// ── VIEWS ──
function showView(name) {
  document.querySelectorAll('.view').forEach(function(v){ v.classList.remove('active'); });
  document.querySelectorAll('.nav-item').forEach(function(n){ n.classList.remove('active'); });
  document.getElementById('view-' + name).classList.add('active');
  var navEl = document.getElementById('nav-' + name);
  if (navEl) navEl.classList.add('active');

  if (name === 'approvals') renderApprovals();
  if (name === 'passkeys') renderPasskeys();
}

// ── APPROVALS ──
function renderApprovals() {
  var list = document.getElementById('approval-list');
  var pending = approvals.filter(function(a){ return a.status === 'pending'; });
  document.getElementById('approval-badge').textContent = pending.length;
  document.getElementById('approval-badge').style.display = pending.length ? '' : 'none';
  document.getElementById('dash-pending-count').textContent = pending.length;

  if (pending.length === 0) {
    list.innerHTML = '';
    document.getElementById('empty-approvals').style.display = 'block';
    return;
  }
  document.getElementById('empty-approvals').style.display = 'none';
  list.innerHTML = pending.map(function(a) {
    return '<div class="approval-card" id="acard-'+a.id+'">' +
      '<div class="approval-top">' +
        '<div class="approval-icon"><svg width="26" height="26" fill="none" stroke="#388bfd" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>' +
        '<div class="approval-info">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">' +
            '<div class="approval-title">' + a.title + '</div>' +
            '<span class="status-badge-pending">Pending Review</span>' +
          '</div>' +
          '<div class="approval-uploader">Uploaded by <a href="#">' + a.uploader + '</a> on ' + a.date + '</div>' +
          '<div class="approval-tags">' +
            '<span class="atag">' + a.type + '</span>' +
            '<span class="atag">' + a.subject + '</span>' +
            '<span class="atag">' + a.year + '</span>' +
            '<span class="atag">' + a.size + '</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="approval-divider"></div>' +
      '<div class="approval-actions">' +
        '<div class="action-left">' +
          '<button class="btn-approve" onclick="approveFile('+a.id+')"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Approve</button>' +
          '<button class="btn-reject" onclick="rejectFile('+a.id+')"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Reject</button>' +
        '</div>' +
        '<button class="btn-preview" onclick="fireToast(\'blue\',\'Preview\',\'Opening preview for '+a.title.replace(/'/g,"'")+'...\')">Preview File</button>' +
      '</div>' +
    '</div>';
  }).join('');
}

function approveFile(id) {
  var a = approvals.find(function(x){ return x.id === id; });
  if (!a) return;
  a.status = 'approved';
  var card = document.getElementById('acard-' + id);
  if (card) { card.style.opacity = '0'; card.style.transform = 'translateX(20px)'; card.style.transition = 'all 0.3s'; setTimeout(function(){ renderApprovals(); }, 300); }
  fireToast('green', 'Approved!', '"' + a.title + '" is now live in the repository.');
}

function rejectFile(id) {
  var reason = prompt('Reason for rejection (optional):');
  var a = approvals.find(function(x){ return x.id === id; });
  if (!a) return;
  a.status = 'rejected';
  var card = document.getElementById('acard-' + id);
  if (card) { card.style.opacity = '0'; card.style.transform = 'translateX(20px)'; card.style.transition = 'all 0.3s'; setTimeout(function(){ renderApprovals(); }, 300); }
  fireToast('red', 'Rejected', '"' + a.title + '" has been rejected.');
}

// ── PASSKEYS ──
function renderPasskeys() {
  var list = document.getElementById('passkey-list');
  list.innerHTML = passkeys.map(function(pk) {
    return '<div class="passkey-card" id="pkcard-'+pk.id+'">' +
      '<div class="passkey-icon"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg></div>' +
      '<div class="passkey-info">' +
        '<div class="passkey-code">' + pk.code + '</div>' +
        '<div class="passkey-meta">' + pk.batch + ' &nbsp;&#8226;&nbsp; ' + pk.uses + '/' + pk.maxUses + ' uses &nbsp;&#8226;&nbsp; Expires ' + pk.expiry + '</div>' +
      '</div>' +
      '<span class="passkey-status ' + pk.status + '">' + pk.status + '</span>' +
      '<div class="passkey-actions">' +
        '<button class="pk-btn" onclick="copyPasskey(\'' + pk.code + '\')">Copy</button>' +
        '<button class="pk-btn danger" onclick="deletePasskey('+pk.id+')">Revoke</button>' +
      '</div>' +
    '</div>';
  }).join('');
}

function copyPasskey(code) {
  if (navigator.clipboard) navigator.clipboard.writeText(code);
  fireToast('purple', 'Copied!', '"' + code + '" copied to clipboard.');
}

function deletePasskey(id) {
  if (!confirm('Revoke this passkey? Students using it will lose access.')) return;
  passkeys = passkeys.filter(function(pk){ return pk.id !== id; });
  renderPasskeys();
  fireToast('red', 'Passkey Revoked', 'The passkey has been revoked successfully.');
}

// ── GENERATE PASSKEY MODAL ──
var generatedKey = '';
function openPasskeyModal() {
  document.getElementById('pk-modal').classList.add('open');
  document.getElementById('gen-key').classList.remove('show');
  document.getElementById('key-hint').classList.remove('show');
  document.getElementById('pk-action-btn').textContent = 'Generate';
  document.getElementById('pk-name').value = '';
  document.getElementById('pk-uses').value = '';
  generatedKey = '';
}
function closePkModal() { document.getElementById('pk-modal').classList.remove('open'); }
function handlePkOverlay(e) { if (e.target === document.getElementById('pk-modal')) closePkModal(); }

function generateKey() {
  var name = document.getElementById('pk-name').value.trim();
  if (!name) { fireToast('blue', 'Missing Name', 'Please enter a batch or community name.'); return; }

  var clean = name.toUpperCase().replace(/\s+/g, '-').replace(/[^A-Z0-9\-]/g, '');
  var rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  generatedKey = clean + '-' + rand;

  var genEl = document.getElementById('gen-key');
  genEl.textContent = generatedKey;
  genEl.classList.add('show');
  document.getElementById('key-hint').classList.add('show');
  document.getElementById('pk-action-btn').textContent = 'Save Passkey';
  document.getElementById('pk-action-btn').onclick = savePasskey;
}

function savePasskey() {
  if (!generatedKey) { generateKey(); return; }
  var name = document.getElementById('pk-name').value.trim();
  var expDays = parseInt(document.getElementById('pk-expiry').value);
  var maxUses = parseInt(document.getElementById('pk-uses').value) || 999;
  var expDate = expDays === 0 ? 'Never' : new Date(Date.now() + expDays * 86400000).toISOString().slice(0,10);
  passkeys.push({ id: Date.now(), code: generatedKey, batch: name, uses: 0, maxUses: maxUses, expiry: expDate, status: 'active' });
  closePkModal();
  renderPasskeys();
  fireToast('purple', 'Passkey Created!', '"' + generatedKey + '" is now active.');
  document.getElementById('pk-action-btn').onclick = generateKey;
}

function copyKey() {
  if (!generatedKey) return;
  if (navigator.clipboard) navigator.clipboard.writeText(generatedKey);
  fireToast('purple', 'Copied!', '"' + generatedKey + '" copied to clipboard.');
}

// ── TOAST ──
function fireToast(color, title, msg) {
  var icons = {
    green: '<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
    red:   '<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    blue:  '<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    purple:'<svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3"/></svg>'
  };
  var container = document.getElementById('toast-container');
  var toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = '<div class="toast-icon '+color+'">'+(icons[color]||icons.blue)+'</div>' +
    '<div class="toast-body"><div class="t-title">'+title+'</div><div class="t-msg">'+msg+'</div></div>' +
    '<button class="t-close" onclick="this.parentElement.remove()"><svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
  container.appendChild(toast);
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ toast.classList.add('show'); }); });
  setTimeout(function(){ toast.classList.add('hide'); setTimeout(function(){ toast.remove(); }, 350); }, 4000);
}

// Init
renderApprovals();
renderPasskeys();
