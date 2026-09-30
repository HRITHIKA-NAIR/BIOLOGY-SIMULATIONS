'use strict';
const $=id=>document.getElementById(id);
const stages=[
 {title:'Set up the apparatus',caption:'A water bath surrounds the pondweed tube. Keep temperature and solution concentration constant.',kind:'setup',duration:7},
 {title:'Place the lamp at 40 cm',caption:'Start with the lamp further from the pondweed.',kind:'move',distance:40,duration:3},
 {title:'Allow the pondweed to adjust',caption:'After changing the light, allow time for the pondweed to adjust. Waiting is shortened here.',kind:'wait',distance:40,duration:3},
 {title:'Watch the oxygen bubbles',caption:'Count bubbles for one simulated minute. The stopwatch and recording happen automatically.',kind:'measure',distance:40,duration:12},
 {title:'Bring the lamp closer',caption:'Now move the same lamp to 20 cm. More light reaches the pondweed.',kind:'move',distance:20,duration:3},
 {title:'Adjust, then measure again',caption:'Keep all other conditions the same. Allow the pondweed to adjust to the brighter light.',kind:'wait',distance:20,duration:3},
 {title:'Compare the bubbling',caption:'More bubbles are produced in the same time in this light-limited teaching model.',kind:'measure',distance:20,duration:12},
 {title:'Move to 10 cm',caption:'Bring the lamp closer once more. Temperature remains controlled at 25°C.',kind:'move',distance:10,duration:3},
 {title:'Allow adjustment',caption:'The waiting period is abbreviated. A real plant needs time to respond.',kind:'wait',distance:10,duration:3},
 {title:'Observe the faster rate',caption:'Watch the bubbles rise. Results are recorded automatically at the end of the minute.',kind:'measure',distance:10,duration:12},
 {title:'What did you observe?',caption:'Moving the lamp closer increased the bubble rate. At high light levels, other factors can limit photosynthesis.',kind:'end',duration:1}
];
let index=0,t=0,playing=false,mode='watch',distance=50,from=50,last=null,results={},drag=null,selected=false;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));const rate=d=>90/(1+(d/20)**2);const lampX=d=>705-10*d-68;
function enter(i){index=clamp(i,0,stages.length-1);t=0;drag=null;selected=false;const s=stages[index];from=index===1?50:index===4?40:index===7?20:s.distance||50;distance=s.kind==='move'?from:s.distance||50;if(s.kind==='end'){distance=10;playing=false;}const keep={40:3,20:6,10:9};for(const d of Object.keys(results))if(keep[d]>=index)delete results[d];if(mode==='try'&&s.kind==='move')playing=false;announce();paint();}
function announce(){const s=stages[index];$('stepLabel').textContent=`${String(index+1).padStart(2,'0')} / ${stages.length} · ${mode==='watch'?'WATCH':'TRY IT'}`;$('title').textContent=s.title;$('caption').textContent=mode==='try'&&s.kind==='move'?`Move the lamp itself to the highlighted ${s.distance} cm position. Drag it, or select the lamp and then its outline.`:s.caption;}
function opacity(id,v){$(id).setAttribute('opacity',clamp(v,0,1));}function transform(id,v){$(id).setAttribute('transform',v);}
function canMove(){return mode==='try'&&stages[index].kind==='move';}
function place(){distance=stages[index].distance;playing=true;enter(index+1);}
function paint(){const s=stages[index],p=clamp(t/s.duration,0,1),setup=s.kind==='setup';if(s.kind==='move'&&mode==='watch')distance=from+(s.distance-from)*(p*p*(3-2*p));
 const x=lampX(distance);transform('lamp',`translate(${x} 0)`);$('light').setAttribute('d',`M${x+71} 159L725 190V337L${x+71} 234Z`);opacity('light',setup?0: .55+(50-distance)/90);
 opacity('bath',setup?t/1.8:1);opacity('tube',setup?(t-1)/1.5:1);opacity('plant',setup?(t-2.4)/1.5:1);transform('plant',`translate(0 ${setup?-100*(1-clamp((t-2.4)/1.8,0,1)):0})`);opacity('thermometer',setup?(t-4)/1.2:1);opacity('lamp',setup?(t-4.5)/1.2:1);opacity('ruler',setup?(t-5)/1:1);opacity('clock',s.kind==='measure'?1:.25);
 $('lamp').classList.toggle('active',canMove());$('lamp').setAttribute('aria-disabled',String(!canMove()));$('target').style.display=canMove()?'':'none';$('target').setAttribute('tabindex',canMove()?'0':'-1');transform('target',`translate(${lampX(s.distance||40)} 0)`);
 $('distanceLabel').textContent=`Light source to pondweed: ${Math.round(distance)} cm`;
 const secs=s.kind==='measure'?Math.min(60,t*5):0;const count=Math.floor((secs*rate(s.distance||40)/60)+1e-8);$('timer').textContent=Math.floor(secs)+' s';$('count').textContent=count+' bubbles';
 // Reconstruct bubbles from their emission times; pause and seeking cannot desynchronise counts.
 let bubbles='';if(s.kind==='measure'){const interval=12/rate(s.distance);for(let n=Math.max(1,count-10);n<=count;n++){const age=t-n*interval;if(age>=0&&age<1.25)bubbles+=`<circle cx="${705+Math.sin(age*7+n)*3}" cy="${243-age*43}" r="4"/>`;}}$('bubbles').innerHTML=bubbles;
 const notes=setup?['Pondweed in solution','The apparatus assembles automatically.']:s.kind==='move'?['Change only the lamp distance',canMove()?'Drag the highlighted lamp →':'The lamp moves into position.']:s.kind==='wait'?['Adjustment period','Waiting time shortened for demonstration.']:s.kind==='measure'?['Oxygen released by pondweed','60 simulated seconds · 5× playback']:['Compare equal measurement times','Results below are simulated.'];$('note1').textContent=notes[0];$('note2').textContent=notes[1];
 $('play').textContent=playing?'Ⅱ Pause':'▶ Play';$('play').disabled=canMove()||s.kind==='end';$('back').disabled=index===0;$('next').disabled=s.kind==='end';$('hint').textContent=canMove()?(selected?'Now select the outlined destination.':'Your turn: move the lamp itself.'):s.kind==='end'?'Replay, or switch to Try it.':playing?'The practical advances automatically.':'Press Play to continue.';
 $('progress').style.width=100*(index+p)/stages.length+'%';$('summary').hidden=s.kind!=='end';if(s.kind==='end')$('bars').innerHTML=[40,20,10].map(d=>`<div class="barrow"><strong>${d} cm</strong><div class="bartrack"><div class="bar" style="width:${(results[d]??0)/80*100}%"></div></div><span>${results[d]===undefined?'Skipped':results[d]+' bubbles/min'}</span></div>`).join('');}
function tick(dt){if(!playing||drag)return;const s=stages[index];t=Math.min(s.duration,t+dt);if(t>=s.duration){if(s.kind==='measure')results[s.distance]=Math.floor(rate(s.distance)+1e-8);if(index<stages.length-1)enter(index+1);else playing=false;}paint();}
function frame(now){const dt=last===null?0:Math.min((now-last)/1000,.1);last=now;tick(dt);requestAnimationFrame(frame);}
$('play').onclick=()=>{playing=!playing;paint();};$('next').onclick=()=>enter(index+1);$('back').onclick=()=>enter(index-1);$('restart').onclick=()=>{playing=false;results={};enter(0);};
function setMode(m){mode=m;playing=false;results={};$('watch').setAttribute('aria-pressed',String(m==='watch'));$('try').setAttribute('aria-pressed',String(m==='try'));enter(0);}
$('watch').onclick=()=>setMode('watch');$('try').onclick=()=>setMode('try');
function svgX(e){const point=$('scene').createSVGPoint();point.x=e.clientX;point.y=e.clientY;return point.matrixTransform($('scene').getScreenCTM().inverse()).x;}
$('lamp').onpointerdown=e=>{if(!canMove())return;drag={id:e.pointerId,start:svgX(e),d:distance};$('lamp').setPointerCapture(e.pointerId);selected=true;paint();};
$('lamp').onpointermove=e=>{if(!drag||e.pointerId!==drag.id)return;distance=clamp(drag.d-(svgX(e)-drag.start)/10,10,50);paint();};
$('lamp').onpointerup=e=>{if(!drag)return;const moved=Math.abs(svgX(e)-drag.start);drag=null;if(moved>3&&Math.abs(distance-stages[index].distance)<5){place();}else{distance=from;paint();}};
$('lamp').onpointercancel=()=>{drag=null;distance=from;paint();};$('lamp').onkeydown=e=>{if(canMove()&&(e.key==='Enter'||e.key===' ')){e.preventDefault();place();}};
$('target').onclick=()=>{if(canMove()&&selected)place();};$('target').onkeydown=e=>{if(canMove()&&(e.key==='Enter'||e.key===' ')){e.preventDefault();place();}};
$('ticks').innerHTML=Array.from({length:51},(_,i)=>{const x=705-i*10;return `<path d="M${x} 430v${i%10===0?15:7}" stroke="#9c8a54"/>`+(i%10===0?`<text x="${x}" y="460" text-anchor="middle" font-size="13">${i}</text>`:'');}).join('');enter(0);requestAnimationFrame(frame);
