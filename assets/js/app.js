document.addEventListener('DOMContentLoaded', function () {
  initMobileMenu();
  initStickyNav();
  initSmoothScroll();
  initScrollToTop();
  initContactForm();
});

function initMobileMenu() {
  var toggle = document.querySelector('.nav__mobile-toggle');
  var menu = document.querySelector('.nav__menu');
  var overlay = document.querySelector('.nav__overlay');

  if (!toggle || !menu) return;

  function closeMenu() {
    toggle.classList.remove('active');
    menu.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openMenu() {
    toggle.classList.add('active');
    menu.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  toggle.addEventListener('click', function () {
    if (menu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
}

function initStickyNav() {
  var nav = document.querySelector('.nav');
  if (!nav) return;

  function onScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
      var top = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
}

function initScrollToTop() {
  var btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initContactForm() {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var resultDiv = document.getElementById('formResult');
  var submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (resultDiv) resultDiv.innerHTML = '';
    if (submitBtn) submitBtn.disabled = true;

    var data = new FormData(form);

    fetch('https://formsubmit.co/ajax/peyton@tryastor.com', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Submission failed');
        return response.json();
      })
      .then(function () {
        if (resultDiv) {
          resultDiv.style.color = 'var(--color-primary-dark, #3d8f33)';
          resultDiv.style.background = 'var(--color-primary-light, #e8f5e6)';
          resultDiv.style.padding = '14px 20px';
          resultDiv.style.borderRadius = '8px';
          resultDiv.style.marginTop = '12px';
          resultDiv.textContent = 'Thank you! Your request has been submitted successfully.';
        }
        form.reset();
      })
      .catch(function () {
        if (resultDiv) {
          resultDiv.style.color = '#b91c1c';
          resultDiv.style.background = '#fef2f2';
          resultDiv.style.padding = '14px 20px';
          resultDiv.style.borderRadius = '8px';
          resultDiv.style.marginTop = '12px';
          resultDiv.textContent = 'Something went wrong. Please call (561) 401-8079 instead.';
        }
      })
      .finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
  });
}
