/* THEME TOGGLE */
const themeToggleEls = {
  desktop: document.querySelector('#themeToggle'),
  // mobile toggle will be injected inside mobile-menu (use delegated approach if needed)
};

const root = document.documentElement;
const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if(saved){
  root.classList.toggle('dark', saved === 'dark');
}else{
  root.classList.toggle('dark', prefersDark);
}

// safe setter for icon
function setToggleIcon(){
  const isDark = root.classList.contains('dark');
  if(themeToggleEls.desktop) themeToggleEls.desktop.textContent = isDark ? '☀️' : '🌙';
  // if mobile exists inside mobile menu, set it there too
  const mobileBtn = document.querySelector('#themeToggleMobile');
  if(mobileBtn) mobileBtn.textContent = isDark ? '☀️' : '🌙';
}
setToggleIcon();

function toggleTheme(){
  // small animation class
  const btn = themeToggleEls.desktop || document.querySelector('#themeToggleMobile');
  btn?.classList.add('animate');
  setTimeout(()=>{
    root.classList.toggle('dark');
    const isDark = root.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    setToggleIcon();
    btn?.classList.remove('animate');
  }, 140);
}

themeToggleEls.desktop?.addEventListener('click', toggleTheme);
document.addEventListener('click', (e)=>{
  // delegate mobile toggle if it appears inside mobile menu
  const m = e.target.closest && e.target.closest('#themeToggleMobile');
  if(m) toggleTheme();
});
