
(()=>{
 const mark=document.querySelector('.animated-mark');if(!mark)return;
 const svg=mark.querySelector('svg'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const nodes=[[-28,-42],[28,-42],[28,14],[-28,14],[0,-14],[0,42]],edges=[[0,1],[1,2],[2,3],[3,0],[3,1],[4,5],[5,2]],ns='http://www.w3.org/2000/svg';
 const front=[...svg.querySelectorAll('path')];front.forEach(p=>p.classList.remove('morph-line'));
 function addPath(opacity){const p=document.createElementNS(ns,'path');p.setAttribute('opacity',opacity);svg.insertBefore(p,front[0]);return p}
 const back=edges.map(()=>addPath('.28')),rails=[0,1,2,3,5].map(()=>addPath('.32'));
 let elapsed=0,last=0,frame=0,visible=false,paused=false;
 function project([x,y],z,angle){const c=Math.cos(angle),s=Math.sin(angle),rx=x*c+z*s,rz=-x*s+z*c,tilt=-.13,ry=y*Math.cos(tilt)-rz*Math.sin(tilt),depth=y*Math.sin(tilt)+rz*Math.cos(tilt),scale=420/(420-depth);return [rx*scale,ry*scale]}
 function path(p,a,b){p.setAttribute('d',`M${a[0].toFixed(3)} ${a[1].toFixed(3)}L${b[0].toFixed(3)} ${b[1].toFixed(3)}`)}
 function draw(time){const angle=time/16000*Math.PI*2;
  if(reduced.matches){front.forEach((p,i)=>path(p,nodes[edges[i][0]],nodes[edges[i][1]]));back.concat(rails).forEach(p=>p.style.display='none');return}
  back.concat(rails).forEach(p=>p.style.display='');const f=nodes.map(n=>project(n,7,angle)),b=nodes.map(n=>project(n,-7,angle));
  edges.forEach(([a,z],i)=>{path(front[i],f[a],f[z]);path(back[i],b[a],b[z])});[0,1,2,3,5].forEach((n,i)=>path(rails[i],f[n],b[n]));
 }
 function run(now){if(!last)last=now;elapsed+=Math.min(64,now-last);last=now;draw(elapsed);frame=requestAnimationFrame(run)}
 function update(){cancelAnimationFrame(frame);frame=0;last=0;mark.disabled=reduced.matches;
  mark.classList.toggle('is-paused',paused);mark.setAttribute('aria-pressed',String(paused));mark.setAttribute('aria-label',reduced.matches?'Símbolo de Qraft, movimiento reducido':paused?'Reanudar giro del símbolo de Qraft':'Pausar giro del símbolo de Qraft');mark.title=paused?'Reanudar giro':'Pausar giro';mark.querySelector('.mark-control-hint').textContent=paused?'▷':'Ⅱ';draw(elapsed);
  if(visible&&!paused&&!document.hidden&&!reduced.matches)frame=requestAnimationFrame(run)
 }
 mark.addEventListener('click',()=>{paused=!paused;update()});new IntersectionObserver(es=>{visible=es[0].isIntersecting;update()},{threshold:.1}).observe(mark);document.addEventListener('visibilitychange',update);reduced.addEventListener('change',update);update();
})();
