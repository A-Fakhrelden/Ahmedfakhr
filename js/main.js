// Ahmed Fakhrelden portfolio — main.js
(function () {
  'use strict';

  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Highlight the nav link of the section in view
  var links = Array.prototype.slice.call(nav.querySelectorAll('a'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { if (s) io.observe(s); });
  }

  // Click-to-enlarge images (projects, certificates, experience)
  var box = document.getElementById('lightbox');
  var boxImg = box.querySelector('img');
  document.querySelectorAll('[data-zoom]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var img = btn.querySelector('img');
      boxImg.src = img.src;
      boxImg.alt = img.alt;
      box.showModal();
    });
  });
  box.addEventListener('click', function (e) {
    if (e.target === box || e.target.tagName === 'BUTTON') box.close();
  });

  // Contact form: send with fetch, show a clear result message
  var form = document.getElementById('contact-form');
  var note = form.querySelector('.form-note');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
      note.textContent = 'Form is not connected yet. Add your Formspree ID in index.html.';
      return;
    }
    note.textContent = 'Sending...';
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) {
        if (!r.ok) throw new Error();
        form.reset();
        note.textContent = 'Message sent. I will reply soon.';
      })
      .catch(function () {
        note.textContent = 'Message not sent. Please email me directly.';
      });
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
