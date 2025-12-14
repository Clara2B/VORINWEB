/* simple reveal on scroll with stagger */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries, obs)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const el = entry.target;
      // stagger children if container has multiple
      const delay = parseFloat(el.dataset.delay) || 0;
      el.style.transition = `opacity 0.6s var(--transition), transform 0.6s var(--transition)`;
      el.classList.add('visible');
      obs.unobserve(el);
    }
  });
},{threshold:0.12});
reveals.forEach(r=>observer.observe(r));
