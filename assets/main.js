// kleine, toegankelijke reveal + stagger implementatie
(function () {
  if (typeof window === 'undefined') return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.addEventListener('DOMContentLoaded', () => {
    // automatisch elementen markeren (zodat je geen HTML hoeft aan te passen)
    document.querySelectorAll('.card, .hero, .section-title, article').forEach(el => {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
    });

    const revealEls = Array.from(document.querySelectorAll('.reveal'));
    if (!revealEls.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          // find parent stagger container
          const staggerParent = el.closest('.reveal-stagger');
          if (staggerParent) {
            // mark parent to trigger children's transitions (script will set delays)
            staggerParent.classList.add('show');
            // set incremental delays for children
            const children = Array.from(staggerParent.children);
            children.forEach((c, i) => c.style.transitionDelay = `${i * 90}ms`);
            // unobserve all children
            children.forEach(c => io.unobserve(c));
          } else {
            el.classList.add('show');
            io.unobserve(el);
          }
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => io.observe(el));

    // extra: kleine randomisatie voor card-icon animaties (variatie)
    document.querySelectorAll('.card-icon').forEach((icon, idx) => {
      const dur = 5 + Math.random() * 4;
      icon.style.animationDuration = `${dur}s`;
      icon.style.animationDelay = `${Math.random() * 1.2}s`;
    });
  });
})();

(function () {
      const form = document.getElementById('contactForm');
      const alertEl = document.getElementById('formAlert');
      const mailtoBtn = document.getElementById('mailtoBtn');
      const toEmail = 'werkZoeken@gmail.com';

      function validateField(el) {
        if (!el) return true;
        if (el.hasAttribute('required') && !el.value.trim()) {
          el.classList.add('is-invalid');
          return false;
        }
        el.classList.remove('is-invalid');
        return true;
      }

      function buildMailto(values) {
        const subject = encodeURIComponent(values.subject);
        const bodyLines = [
          `Naam: ${values.name}`,
          `E-mail: ${values.email}`,
          '',
          values.message
        ];
        const body = encodeURIComponent(bodyLines.join('\n'));
        return `mailto:${toEmail}?subject=${subject}&body=${body}`;
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        alertEl.classList.add('d-none');

        // spam honeypot
        if (document.getElementById('hp').value) {
          return;
        }

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        const valid = [name, email, subject, message].map(validateField).every(v => v);
        if (!valid) {
          return;
        }

        // open mail client with prefilled content
        const mailto = buildMailto({
          name: name.value.trim(),
          email: email.value.trim(),
          subject: subject.value.trim(),
          message: message.value.trim()
        });

        // probeer mailto te openen
        window.location.href = mailto;

        // toon bevestiging en reset formulier
        alertEl.classList.remove('d-none');
        form.reset();
      });

      mailtoBtn.addEventListener('click', function () {
        const subject = encodeURIComponent('Vraag via website');
        window.location.href = `mailto:${toEmail}?subject=${subject}`;
      });

      // inline validation removal on input
      document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(el => {
        el.addEventListener('input', () => el.classList.remove('is-invalid'));
      });
    })();

    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

     document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

       // Zet huidig jaar
    document.querySelector('#year').textContent = new Date().getFullYear();