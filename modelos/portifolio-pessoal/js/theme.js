const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

const saved = localStorage.getItem("theme");

root.classList.toggle("dark", saved === "dark");

themeToggle.textContent = root.classList.contains("dark") ? "☀️" : "🌙";

themeToggle.addEventListener("click", () => {
    root.classList.toggle("dark");
    const isDark = root.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
});
