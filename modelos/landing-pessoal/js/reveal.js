/* ============================================================
   REVEAL ON SCROLL — animação suave ao aparecer no viewport
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".reveal");

  // Se o navegador não suporta IntersectionObserver
  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target); // impede reanimação
        }
      });
    },
    {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  elements.forEach(el => observer.observe(el));
});
