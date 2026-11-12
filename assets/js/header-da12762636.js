
(()=>{
 const header=document.querySelector('.header');if(!header)return;
 let lastY=Math.max(0,scrollY),travel=0,direction=0,frame=0,lastSurface='';
 function reveal(){header.classList.remove('is-scroll-hidden')}
 function paint(){const height=header.getBoundingClientRect().height;const stack=document.elementsFromPoint(12,Math.min(height/2,innerHeight-1));let surface='';
  for(const element of stack){if(header.contains(element)||element===header||element.closest('.menu-scrim'))continue;
   let node=element;while(node&&node!==document.documentElement){const color=getComputedStyle(node).backgroundColor,values=color.match(/[\d.]+/g);if(values&&values.length>=3&&(values.length<4||Number(values[3])>.98)){surface=color;break}node=node.parentElement}if(surface)break
  }
  if(!surface||surface===lastSurface)return;lastSurface=surface;const rgb=surface.match(/[\d.]+/g).slice(0,3).map(Number),linear=rgb.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}),dark=.2126*linear[0]+.7152*linear[1]+.0722*linear[2]<.32;
  header.style.setProperty('--header-surface',surface);header.style.setProperty('--header-ink',dark?'#f7f7f2':'#222321');header.style.setProperty('--header-logo-filter',dark?'invert(1)':'none');header.style.setProperty('--header-rule',dark?'#f7f7f250':'#22232140');header.style.setProperty('--header-hover',dark?'#f7f7f20d':'#22232108');
 }
 function update(){frame=0;const y=Math.max(0,scrollY),delta=y-lastY;lastY=y;const next=Math.sign(delta);if(next&&next!==direction){travel=0;direction=next}travel+=delta;
  if(y<24||header.classList.contains('is-open')||header.contains(document.activeElement)){reveal();travel=0}else if(direction>0&&travel>12&&y>header.offsetHeight){header.classList.add('is-scroll-hidden');travel=0}else if(direction<0&&travel<-7){reveal();travel=0}paint();
 }
 function queue(){if(!frame)frame=requestAnimationFrame(update)}
 addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);addEventListener('pageshow',queue);addEventListener('load',queue);header.addEventListener('focusin',reveal);header.querySelector('.menu-button')?.addEventListener('click',()=>{reveal();queue()});queue();
})();
