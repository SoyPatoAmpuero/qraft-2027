
(()=>{
 const picture=document.querySelector('.cover-picture');if(!picture)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),caption=document.querySelector('.cover-caption'),controls=document.querySelector('.cover-controls');
 const records=[['Casa CV','casa-cv.html','CASA CV — QUILQUICO, CASTRO','212 m² · Proyecto destacado'],['Casa BG','casa-bg.html','CASA BG — PUERTO VARAS','278 m² · Proyecto destacado'],['Casa Borquez','casa-borquez.html','CASA BORQUEZ — PUERTO VARAS','290 m² · Proyecto destacado']];
 const slides=[picture.querySelector('img')];slides[0].classList.add('cover-slide','is-current');
 records.slice(1).forEach(([name])=>{const source=document.querySelector('.work-cover-link img[alt="'+name+'"],.work-card img[alt="'+name+'"]');const img=source.cloneNode();img.removeAttribute('loading');img.className='cover-slide';img.alt='';img.setAttribute('aria-hidden','true');picture.insertBefore(img,picture.querySelector('.picture-open'));slides.push(img)});
 let active=0,timer=0,inView=true,paused=false,hover=false,focused=false;
 const choices=[...controls.querySelectorAll('.cover-select')],pause=controls.querySelector('.cover-pause');
 function canPlay(){return inView&&!paused&&!document.hidden&&!reduced.matches}
 function schedule(){clearTimeout(timer);timer=0;if(canPlay())timer=setTimeout(()=>show((active+1)%records.length),6000)}
 function show(index){active=index;const [name,href,label,detail]=records[index];slides.forEach((img,i)=>{img.classList.toggle('is-current',i===index);img.alt=i===index?name:'';img.setAttribute('aria-hidden',String(i!==index))});picture.href=href;picture.setAttribute('aria-label','Ver '+name);caption.querySelector('.micro').textContent=label;caption.querySelector('.location').textContent=detail;choices.forEach((b,i)=>b.setAttribute('aria-current',String(i===index)));schedule()}
 choices.forEach((b,i)=>b.addEventListener('click',()=>show(i)));
 pause.addEventListener('click',()=>{paused=!paused;pause.textContent=paused?'Reanudar':'Pausar';pause.setAttribute('aria-pressed',String(paused));schedule()});

 function preference(){pause.hidden=reduced.matches;schedule()}reduced.addEventListener('change',preference);document.addEventListener('visibilitychange',schedule);
 if('IntersectionObserver'in window)new IntersectionObserver(es=>{inView=es[0].isIntersecting;schedule()},{threshold:.2}).observe(picture);
 preference();
})();
