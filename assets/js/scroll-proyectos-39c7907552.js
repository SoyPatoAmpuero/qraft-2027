
(()=>{
 const covers=[...document.querySelectorAll('.work-cover')];if(!covers.length)return;
 const desktop=matchMedia('(min-width:900px)'),reduced=matchMedia('(prefers-reduced-motion: reduce)');let frame=0;
 function measure(){frame=0;const header=document.querySelector('.header').getBoundingClientRect().height;covers.forEach(cover=>{if(!desktop.matches||reduced.matches){cover.style.removeProperty('--work-pin-top');return}cover.style.setProperty('--work-pin-top',Math.min(header,innerHeight-cover.offsetHeight)+'px')})}
 function update(){if(!frame)frame=requestAnimationFrame(measure)}
 new ResizeObserver(update).observe(document.querySelector('.header'));const observer=new ResizeObserver(update);covers.forEach(c=>observer.observe(c));addEventListener('resize',update);addEventListener('load',update);document.fonts.ready.then(update);desktop.addEventListener('change',update);reduced.addEventListener('change',update);update();
})();
