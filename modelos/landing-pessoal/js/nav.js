/* ============================================================
   MOBILE MENU + BACKDROP + FECHAR AO CLICAR FORA
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navList   = document.getElementById("navList");

  /* Criar backdrop somente uma vez */
  let backdrop = document.querySelector(".menu-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.classList.add("menu-backdrop");
    document.body.appendChild(backdrop);
  }

  /* Z-index corretos */
  backdrop.style.zIndex = "9000";     // atrás
  navList.style.zIndex = "10000";     // menu acima

  /* Função fechar menu */
  function closeMenu() {
    navList.classList.remove("open");
    navToggle.classList.remove("active");
    backdrop.classList.remove("active");
  }

  /* Clique no hambúrguer */
  navToggle.addEventListener("click", () => {
    navList.classList.toggle("open");
    navToggle.classList.toggle("active");
    backdrop.classList.toggle("active");
  });

  /* Clique fora fecha */
  backdrop.addEventListener("click", closeMenu);


  /* ============================================================
     SMOOTH SCROLL + OFFSET (Header + Demo bar)
  ============================================================ */

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();

      const headerH = document.querySelector(".site-header")?.offsetHeight || 0;
      const demoH   = document.querySelector(".demo-bar")?.offsetHeight || 0;

      const offset = headerH + demoH - 6;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: "smooth" });

      closeMenu();
    });
  });


  /* ============================================================
     HEADER EFFECT ON SCROLL
  ============================================================ */

  const header = document.querySelector(".site-header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  });
});
