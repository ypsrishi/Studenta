function go() {
    window.location.href = 'login.html';
  }

  // Hero fades in on load
  window.addEventListener('load', function() {
    document.querySelectorAll('.hero .fade').forEach(function(el, i) {
      setTimeout(function() { el.classList.add('on'); }, 80 + i * 90);
    });
  });

  // All other sections use IntersectionObserver
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('on');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade').forEach(function(el) {
    if (!el.closest('.hero')) io.observe(el);
  });