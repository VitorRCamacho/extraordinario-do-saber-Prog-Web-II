(function(){
  const params = new URLSearchParams(location.search);
  const msg = params.get('msg');
  if (msg) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = decodeURIComponent(msg);
    document.body.appendChild(el);
    setTimeout(() => el.classList.add('show'), 10);
    setTimeout(() => el.classList.remove('show'), 3500);
    setTimeout(() => el.remove(), 3800);
    window.history.replaceState({}, document.title, location.pathname);
  }
})();