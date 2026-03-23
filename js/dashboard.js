var sidebarOpen = false;
function toggleSidebar() { sidebarOpen ? closeSidebar() : openSidebar(); }
function openSidebar() {
  sidebarOpen = true;
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sb-overlay').classList.add('show');
}
function closeSidebar() {
  sidebarOpen = false;
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sb-overlay').classList.remove('show');
}
// Close sidebar on resize to desktop
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) closeSidebar();
});

// ── UPLOAD ──
var selFile = null, uploading = false;
function openUpload() { document.getElementById('upload-modal').classList.add('open'); }
function closeUpload() {
  if (uploading) return;
  document.getElementById('upload-modal').classList.remove('open');
  resetUpload();
}
function handleUploadOverlay(e) { if (e.target === document.getElementById('upload-modal')) closeUpload(); }
function resetUpload() {
  selFile = null; uploading = false;
  document.getElementById('drop-zone').style.display = '';
  document.getElementById('selected-file').classList.remove('show');
  document.getElementById('progress-wrap').classList.remove('show');
  document.getElementById('progress-fill').style.width = '0%';
  document.getElementById('u-title').value = '';
  document.getElementById('u-subject').value = '';
  document.getElementById('u-year').value = '';
  document.getElementById('u-type').value = '';
  document.getElementById('file-input').value = '';
}
function dragOver(e) { e.preventDefault(); document.getElementById('drop-zone').classList.add('drag-over'); }
function dragLeave() { document.getElementById('drop-zone').classList.remove('drag-over'); }
function handleDrop(e) { e.preventDefault(); dragLeave(); if (e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]); }
function fileSelected(e) { if (e.target.files[0]) processFile(e.target.files[0]); }
function processFile(f) {
  selFile = f;
  document.getElementById('drop-zone').style.display = 'none';
  document.getElementById('selected-file').classList.add('show');
  document.getElementById('sf-name').textContent = f.name;
  var kb = f.size / 1024;
  document.getElementById('sf-size').textContent = kb > 1024 ? (kb/1024).toFixed(1)+' MB' : kb.toFixed(0)+' KB';
  if (!document.getElementById('u-title').value) document.getElementById('u-title').value = f.name.replace(/\.[^/.]+$/, '');
}
function removeFile() {
  selFile = null;
  document.getElementById('drop-zone').style.display = '';
  document.getElementById('selected-file').classList.remove('show');
  document.getElementById('file-input').value = '';
}
function startUpload() {
  if (!selFile) { toast('orange','No File','Please choose a file first.'); return; }
  var title = document.getElementById('u-title').value.trim();
  var type = document.getElementById('u-type').value;
  if (!title) { toast('orange','Missing Title','Please enter a title.'); return; }
  if (!type) { toast('orange','Missing Type','Please select a resource type.'); return; }
  uploading = true;
  document.querySelector('.btn-upload').disabled = true;
  document.querySelector('.btn-cancel').disabled = true;
  var pw = document.getElementById('progress-wrap');
  var fill = document.getElementById('progress-fill');
  var lbl = document.getElementById('progress-lbl');
  pw.classList.add('show');
  var pct = 0;
  var iv = setInterval(function() {
    pct += Math.random() * 20 + 5;
    if (pct >= 100) {
      pct = 100; fill.style.width = '100%'; lbl.textContent = 'Upload complete! &#10003;';
      clearInterval(iv);
      setTimeout(function() {
        uploading = false;
        document.querySelector('.btn-upload').disabled = false;
        document.querySelector('.btn-cancel').disabled = false;
        closeUpload();
        toast('green','Upload Successful!','"'+title+'" submitted for review.');
      }, 700);
    } else {
      fill.style.width = pct+'%';
      lbl.textContent = 'Uploading... '+Math.floor(pct)+'%';
    }
  }, 180);
}

// ── CHAT ──
var chatOpen = false;
function toggleChat() {
  chatOpen = !chatOpen;
  document.getElementById('chat-panel').classList.toggle('open', chatOpen);
  if (chatOpen) { document.getElementById('chat-dot').style.display = 'none'; scrollChat(); setTimeout(function(){ document.getElementById('chat-inp').focus(); }, 300); }
}
function scrollChat() { var m = document.getElementById('chat-msgs'); m.scrollTop = m.scrollHeight; }
function chatKey(e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); } }
function resizeInp(el) { el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 100)+'px'; }
var replies = [
  { i:'PP', bg:'linear-gradient(135deg,#1a6e2e,#3fb950)', n:'Priya P.', t:'Thanks for sharing! &#128588;' },
  { i:'AK', bg:'linear-gradient(135deg,#1158a7,#388bfd)', n:'Amit K.', t:'Great! Will check it out.' },
  { i:'NG', bg:'linear-gradient(135deg,#7d4e00,#c8872a)', n:'Neha G.', t:'Very helpful, thanks! &#128522;' },
];
function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function sendMsg() {
  var inp = document.getElementById('chat-inp');
  var txt = inp.value.trim(); if (!txt) return;
  var now = new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
  var msgs = document.getElementById('chat-msgs');
  var div = document.createElement('div');
  div.className = 'chat-msg own';
  div.innerHTML = '<div class="msg-av" style="background:linear-gradient(135deg,#6e40c9,#a371f7);">RS</div><div class="msg-body"><div class="msg-meta">You &bull; '+now+'</div><div class="bubble">'+esc(txt)+'</div></div>';
  msgs.appendChild(div);
  inp.value = ''; inp.style.height = 'auto'; scrollChat();
  if (Math.random() > 0.35) {
    var r = replies[Math.floor(Math.random()*replies.length)];
    setTimeout(function() {
      var t2 = new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
      var rd = document.createElement('div');
      rd.className = 'chat-msg';
      rd.innerHTML = '<div class="msg-av" style="background:'+r.bg+';">'+r.i+'</div><div class="msg-body"><div class="msg-meta">'+r.n+' &bull; '+t2+'</div><div class="bubble">'+r.t+'</div></div>';
      msgs.appendChild(rd);
      scrollChat();
      if (!chatOpen) { document.getElementById('chat-dot').style.display = 'block'; }
    }, 1500 + Math.random()*1500);
  }
}

// ── TOAST ──
function toast(color, title, msg) {
  var icons = {
    green:'<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
    blue:'<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    orange:'<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
  };
  var wrap = document.getElementById('toast-wrap');
  var t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = '<div class="toast-ic '+color+'">'+(icons[color]||icons.blue)+'</div><div><div class="t-title">'+title+'</div><div class="t-msg">'+msg+'</div></div><button class="t-close" onclick="this.parentElement.remove()"><svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
  wrap.appendChild(t);
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ t.classList.add('show'); }); });
  setTimeout(function(){ t.classList.add('hide'); setTimeout(function(){ t.remove(); }, 350); }, 4000);
}
document.addEventListener("DOMContentLoaded", function () {
  var community = localStorage.getItem("community");

  if (community) {
    var badge = document.getElementById("communityBadge");
    var name = document.getElementById("communityName");

    if (badge) badge.textContent = community;
    if (name) name.textContent = community;
  }
});
