document.addEventListener("DOMContentLoaded", () => {

    /* =======================================================================
       ELEMENTOS E VARIÁVEIS GLOBAIS
    ======================================================================= */

    // Seletores do Menu
    const navToggle = document.getElementById("navToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const backdrop = document.querySelector(".menu-backdrop"); // Usa o backdrop do HTML
    
    // Seletores do Tema
    const toggleDesktop = document.getElementById("themeToggle");
    const toggleMobile = document.getElementById("themeToggleMobile");
    const root = document.documentElement; // <html>

    // ------------------------------------
    // MENU MOBILE + BACKDROP
    // ------------------------------------

    /**
     * Fecha o menu móvel, resetando classes do botão e do backdrop.
     */
    function closeMenu() {
        if (mobileMenu) mobileMenu.classList.remove("open");
        if (navToggle) navToggle.classList.remove("active");
        if (backdrop) backdrop.classList.remove("active");
    }

    // Listener para Abrir/Fechar com o botão (Hambúrguer)
    if (navToggle && mobileMenu && backdrop) {
        navToggle.addEventListener("click", () => {
            navToggle.classList.toggle("active");
            mobileMenu.classList.toggle("open");
            backdrop.classList.toggle("active");
        });

        // Listener para Fechar clicando fora (no backdrop)
        // **Isto agora funciona graças ao CSS corrigido e à unificação do JS!**
        backdrop.addEventListener("click", closeMenu);
    }
    
    // ------------------------------------
    // SMOOTH SCROLL & FECHAR AO CLICAR NO LINK
    // ------------------------------------

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", (e) => {
            const id = link.getAttribute("href").slice(1);
            const target = document.getElementById(id);
            if (!target) return;

            e.preventDefault();

            // Calcular Offset para que o header não cubra o target
            const headerH = document.querySelector(".site-header")?.offsetHeight || 0;
            const demoH   = document.querySelector(".demo-bar")?.offsetHeight || 0; // Se você tiver o demo-bar
            
            const offset = headerH + demoH - 6;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({ top, behavior: "smooth" });

            // Fecha o menu após clicar em qualquer link âncora (se o menu estiver aberto)
            closeMenu();
        });
    });

    // ------------------------------------
    // TEMA GLOBAL — DESKTOP + MOBILE
    // ------------------------------------

    // Preferência salva
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Aplicar tema inicial
    if (savedTheme) {
        root.classList.toggle("dark", savedTheme === "dark");
    } else {
        root.classList.toggle("dark", prefersDark);
    }

    /**
     * Atualiza ícones dos botões de tema (sol ou lua).
     */
    function updateIcons() {
        const icon = root.classList.contains("dark") ? "☀️" : "🌙";
        if (toggleDesktop) toggleDesktop.textContent = icon;
        if (toggleMobile) toggleMobile.textContent = icon;
    }

    updateIcons();

    /**
     * Alterna o tema de claro para escuro.
     * @param {HTMLElement} btn - O botão que disparou a ação.
     */
    function toggleTheme(btn) {
        btn.classList.add("animate");

        setTimeout(() => {
            root.classList.toggle("dark");

            localStorage.setItem(
                "theme",
                root.classList.contains("dark") ? "dark" : "light"
            );

            updateIcons();
            btn.classList.remove("animate");
        }, 150);
    }

    // Adiciona listener para o botão Desktop
    if (toggleDesktop) {
        toggleDesktop.addEventListener("click", (e) => {
            e.stopPropagation(); // Previne que o clique afete outros elementos (como o backdrop, se o menu estivesse aberto acidentalmente no desktop)
            toggleTheme(toggleDesktop);
        });
    }

    // Adiciona listener para o botão Mobile
    if (toggleMobile) {
        toggleMobile.addEventListener("click", (e) => {
            e.stopPropagation(); // Essencial para que o clique não feche o menu (se o backdrop estiver abaixo)
            toggleTheme(toggleMobile);
        });
    }


    /* ============================================================
       HEADER EFFECT ON SCROLL (Do seu nav.js original)
    ============================================================ */

    const header = document.querySelector(".site-header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) header.classList.add("scrolled");
        else header.classList.remove("scrolled");
    });
});