document.addEventListener('DOMContentLoaded', function () {

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Simple reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowH = window.innerHeight;
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= windowH - 80) el.classList.add('active');
    });
  };
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);

  // Contact form (mock) - replace with your backend integration
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // Basic validation already handled by required attrs; show success
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Enviando...';

      // Simulate network delay
      setTimeout(() => {
        btn.textContent = 'Enviado!';
        form.reset();
        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = 'Enviar';
        }, 1400);
      }, 900);
    });
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Hover effect: add/remove 'hovered' class on elements with .hoverable
  const hoverables = document.querySelectorAll('.hoverable');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => el.classList.add('hovered'));
    el.addEventListener('mouseleave', () => el.classList.remove('hovered'));

    // For accessibility / touch devices: toggle on focus/blur and touchstart
    el.addEventListener('focus', () => el.classList.add('hovered'));
    el.addEventListener('blur', () => el.classList.remove('hovered'));
    el.addEventListener('touchstart', function onTouch(e) {
      // Toggle on touch; prevent duplicate click
      e.stopPropagation();
      el.classList.toggle('hovered');
      // remove listener shortly after to allow normal interactions
      setTimeout(() => { el.removeEventListener('touchstart', onTouch); }, 300);
    }, { passive: true });
  });

  window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});



const popup = document.getElementById("popup-overlay");
const popupBtn = document.getElementById("popup-confirm");

// abre popup
document.querySelectorAll(".btn-choose").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.add("active");
  });
});

// botão fale conosco
popupBtn.addEventListener("click", () => {
  const numero = "11934900204";
  const msg = encodeURIComponent("Olá! Gostaria de saber mais sobre este modelo de site.");
  window.open(`https://wa.me/${numero}?text=${msg}`, "_blank");
});

// fechar clicando FORA do popup-box
popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.remove("active");
  }
});


});

const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");

navToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});
