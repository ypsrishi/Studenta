var currentRole = 'student';

var demoData = {
  student: [
    { key: 'Email', val: 'rahul.s@college.edu' },
    { key: 'Password', val: 'student123' },
    { key: 'Passkey', val: 'CS-BATCH-2026' }
  ],
  moderator: [
    { key: 'Email', val: 'mod@college.edu' },
    { key: 'Password', val: 'mod123' }
  ]
};

function switchTab(role) {
  currentRole = role;
  var isStudent = role === 'student';

  // Tabs
  document.getElementById('tab-student').classList.toggle('active', isStudent);
  document.getElementById('tab-moderator').classList.toggle('active', !isStudent);

  // Passkey
  var passkeyGroup = document.getElementById('passkey-group');
  if (passkeyGroup) {
    passkeyGroup.style.display = isStudent ? '' : 'none';
  }

  // Email placeholder & label
  var emailInput = document.getElementById('email-input');
  var emailLabel = document.getElementById('email-label');

  if (emailInput)
    emailInput.placeholder = isStudent ? 'student@college.edu' : 'moderator@college.edu';

  if (emailLabel)
    emailLabel.textContent = isStudent ? 'College Email ID' : 'Email ID';

  // Button text
  var btnText = document.getElementById('btn-text');
  if (btnText)
    btnText.textContent = isStudent ? 'Sign in as Student' : 'Sign in as Moderator';

  // Button style
  var btn = document.getElementById('submit-btn');
  if (btn)
    btn.className = 'submit-btn ' + role;

  // Clear errors
  clearErr('email');
  clearErr('password');
  clearErr('passkey');

  // Update demo box if exists
  var demoBox = document.getElementById('demo-box');
  if (demoBox && demoBox.classList.contains('show')) {
    renderDemo();
  }
}

function showErr(field, msg) {
  var input = document.getElementById(field + '-input');
  var err = document.getElementById(field + '-error');
  if (!input || !err) return;

  input.classList.add('error');
  err.textContent = msg;
  err.classList.add('show');
}

function clearErr(field) {
  var input = document.getElementById(field + '-input');
  var err = document.getElementById(field + '-error');
  if (input) input.classList.remove('error');
  if (err) err.classList.remove('show');
}

function handleSignIn() {
  var email = document.getElementById('email-input').value.trim();
  var password = document.getElementById('password-input').value.trim();
  var passkeyInput = document.getElementById('passkey-input');
  var passkey = currentRole === 'student' && passkeyInput ? passkeyInput.value.trim() : 'ok';

  clearErr('email');
  clearErr('password');
  clearErr('passkey');

  var ok = true;

  if (!email) {
    showErr('email', 'Email is required.');
    ok = false;
  }

  if (!password) {
    showErr('password', 'Password is required.');
    ok = false;
  }

  if (currentRole === 'student' && !passkey) {
    showErr('passkey', 'Community Passkey is required.');
    ok = false;
  }

  if (!ok) return;
  // STORE DATA BEFORE REDIRECT
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userRole", currentRole);
  localStorage.setItem("community", passkey);

  // Redirect based on role
  if (currentRole === 'moderator') {
    window.location.href = 'moderator_dashboard.html';
  } else {
    window.location.href = 'crsp_dashboard.html';
  }
}

function renderDemo() {
  var demoContent = document.getElementById('demo-content');
  if (!demoContent) return;

  var data = demoData[currentRole];
  demoContent.innerHTML = data.map(function(d) {
    return '<div class="demo-row"><span class="demo-key">' + d.key +
           '</span><span class="demo-val">' + d.val + '</span></div>';
  }).join('');
}

function toggleDemo() {
  var box = document.getElementById('demo-box');
  if (!box) return;

  var show = !box.classList.contains('show');
  box.classList.toggle('show', show);
  if (show) renderDemo();
}

// Enter key submit
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') handleSignIn();
});