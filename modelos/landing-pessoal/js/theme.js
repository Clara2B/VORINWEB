/* ============================================================
   THEME TOGGLE — LIGHT / DARK (versão final)
============================================================ */

const root = document.documentElement;

const btnDesktop = document.getElementById("themeToggle");
const btnMobile = document.getElementById("themeToggleMobile");

/* ------------------------------------------------------------
   Função: retorna qual botão deve ser usado (mobile ou desktop)
------------------------------------------------------------ */
function getActiveButton() {
  return window.innerWidth <= 900 ? btnMobile : btnDesktop;
}

let activeBtn = getActiveButton();

/* Atualiza ao redimensionar */
window.addEventListener("resize", () => {
  activeBtn = getActiveButton();
  updateIcon();
});

/* ------------------------------------------------------------
   Preferências de tema (sistema + armazenamento local)
------------------------------------------------------------ */

// Se o usuário já salvou uma escolha antes
const storedTheme = localStorage.getItem("theme");

// Preferência do sistema (caso o usuário nunca tenha escolhido)
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Aplica o tema correto
if (storedTheme) {
  root.classList.toggle("dark", storedTheme === "dark");
} else {
  root.classList.toggle("dark", prefersDark);
}

/* ------------------------------------------------------------
   Atualiza o ícone (sol/lua)
------------------------------------------------------------ */
function updateIcon() {
  const isDark = root.classList.contains("dark");
  const icon = isDark ? "☀️" : "🌙";

  if (btnDesktop) btnDesktop.textContent = icon;
  if (btnMobile) btnMobile.textContent = icon;
}

updateIcon();

/* ------------------------------------------------------------
   Função para alternar o tema
------------------------------------------------------------ */
function toggleTheme() {
  // animação do botão (curtinha e suave)
  activeBtn.classList.add("animate");

  setTimeout(() => {
    root.classList.toggle("dark");

    const newTheme = root.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", newTheme);

    updateIcon();
    activeBtn.classList.remove("animate");
  }, 150);
}

/* ------------------------------------------------------------
   Eventos do botão mobile e desktop
------------------------------------------------------------ */

btnDesktop?.addEventListener("click", toggleTheme);
btnMobile?.addEventListener("click", toggleTheme);
