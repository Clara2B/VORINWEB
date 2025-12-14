/* MENU MOBILE + BACKDROP */
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');

// create backdrop once
let backdrop = document.querySelector('.menu-backdrop');
if(!backdrop){
  backdrop = document.createElement('div');
  backdrop.className = 'menu-backdrop';
  document.body.appendChild(backdrop);
}

// mobile panel (we'll create a mobile-menu container dynamically)
let mobileMenu = document.querySelector('.mobile-menu');
if(!mobileMenu){
  mobileMenu = document.createElement('nav');
  mobileMenu.className = 'mobile-menu';
  mobileMenu.innerHTML = document.getElementById('navList') ? document.getElementById('navList').innerHTML : '';
  document.body.appendChild(mobileMenu);
}

function openMenu(){
  mobileMenu.classList.add('open');
  backdrop.classList.add('active');
  navToggle.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeMenu(){
  mobileMenu.classList.remove('open');
  backdrop.classList.remove('active');
  navToggle.classList.remove('active');
  document.body.style.overflow = '';
}

navToggle?.addEventListener('click', ()=>{
  if(mobileMenu.classList.contains('open')) closeMenu(); else openMenu();
});

// close when click on backdrop or link
backdrop.addEventListener('click', closeMenu);
mobileMenu.addEventListener('click', (e)=>{
  if(e.target.tagName === 'A') closeMenu();
});
