// Ahmed Fakhrelden portfolio: main.js
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // Mobile menu
  var toggle = $('.nav-toggle'), nav = $('#nav');
  toggle.addEventListener('click', function () {
    toggle.setAttribute('aria-expanded', String(nav.classList.toggle('is-open')));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }
  });

  // Active nav link
  var links = $$('a', nav);
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (a) { var s = $(a.getAttribute('href')); if (s) io.observe(s); });
  }

  // Scroll progress + header shadow
  var bar = $('.progress'), header = $('.site-header'), ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
      header.classList.toggle('is-scrolled', window.scrollY > 10);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Scroll reveal (staggered in groups of 3)
  var rev = $$('.section-head, .about-grid > *, .timeline li, .svc, .filters, .work, .gallery figure, .contact > div, .form');
  rev.forEach(function (el, i) { el.classList.add('reveal'); el.style.setProperty('--d', ((i % 3) * 90) + 'ms'); });
  if ('IntersectionObserver' in window) {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); rio.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    rev.forEach(function (el) { rio.observe(el); });
  } else { rev.forEach(function (el) { el.classList.add('is-in'); }); }

  // Project filters
  var chips = $$('.filters .chip'), works = $$('.work');
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      chips.forEach(function (x) { x.classList.toggle('is-on', x === c); });
      works.forEach(function (w) { w.hidden = !(c.dataset.filter === 'all' || w.dataset.cat === c.dataset.filter); });
    });
  });

  // Project modal (reads title, tags, image, text and link from the card)
  var modal = $('#modal');
  works.forEach(function (w) {
    $('.work-btn', w).addEventListener('click', function () {
      var img = $('img', w);
      $('img', modal).src = img.src; $('img', modal).alt = img.alt;
      $('h3', modal).textContent = $('h3', w).textContent;
      $('.tags', modal).innerHTML = $('.tags', w).innerHTML;
      $('.modal-body p', modal).textContent = $('.full', w).textContent;
      $('.modal-body a', modal).href = w.dataset.link;
      modal.showModal();
    });
  });
  modal.addEventListener('click', function (e) { if (e.target === modal || e.target.classList.contains('x')) modal.close(); });

  // Certificate lightbox
  var box = $('#lightbox'), boxImg = $('img', box);
  $$('[data-zoom]').forEach(function (b) {
    b.addEventListener('click', function () {
      var img = $('img', b); boxImg.src = img.src; boxImg.alt = img.alt; box.showModal();
    });
  });
  box.addEventListener('click', function (e) { if (e.target === box || e.target.tagName === 'BUTTON') box.close(); });

  // Copy email
  var copy = $('#copy');
  copy.addEventListener('click', function () {
    var t = $('#mail').textContent;
    (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(function () { copy.textContent = 'Copied'; }, function () { copy.textContent = 'Press Ctrl+C'; });
    setTimeout(function () { copy.textContent = 'Copy'; }, 2000);
  });

  // Contact form
  var form = $('#contact-form'), note = $('.form-note', form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.action.indexOf('YOUR_FORM_ID') !== -1) { note.textContent = 'Form is not connected yet. Add your Formspree ID in index.html.'; return; }
    note.textContent = 'Sending...';
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error(); form.reset(); note.textContent = 'Message sent. I will reply soon.'; })
      .catch(function () { note.textContent = 'Message not sent. Please email me directly.'; });
  });

  $('#year').textContent = new Date().getFullYear();
})();
