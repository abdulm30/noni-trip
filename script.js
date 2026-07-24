
let scene=0;const total=9;const q=s=>document.querySelector(s);
function go(n){document.querySelectorAll('.scene').forEach(x=>x.classList.remove('active'));scene=n;q(`[data-scene="${n}"]`).classList.add('active');q('#progress').style.width=(n/total*100)+'%';localStorage.setItem('mysteryScene',n);scrollTo(0,0)}
function next(){go(Math.min(total,scene+1))}
function resetStory(){localStorage.removeItem('mysteryScene');go(0)}
function openClue(el){el.classList.add('open');el.querySelector('p').classList.remove('hidden')}
function checkCountry(){const v=q('#country').value.trim().toLowerCase();if(v==='italy'||v==='italia'){next()}else{document.body.classList.add('shake');setTimeout(()=>document.body.classList.remove('shake'),450)}}
let hold;const seal=q('#seal');function beginHold(){hold=setTimeout(()=>{seal.textContent='✓';q('#sealBtn').classList.remove('hidden')},900)}function endHold(){clearTimeout(hold)}seal.addEventListener('mousedown',beginHold);seal.addEventListener('mouseup',endHold);seal.addEventListener('mouseleave',endHold);seal.addEventListener('touchstart',beginHold,{passive:true});seal.addEventListener('touchend',endHold);
function updateCountdown(){const target=new Date('2026-10-16T15:50:00-05:00'),d=target-new Date();if(d<=0){q('#days').textContent=0;q('#hours').textContent=0;q('#minutes').textContent=0;q('#seconds').textContent=0;return}q('#days').textContent=Math.floor(d/86400000);q('#hours').textContent=Math.floor(d%86400000/3600000);q('#minutes').textContent=Math.floor(d%3600000/60000);q('#seconds').textContent=Math.floor(d%60000/1000)}setInterval(updateCountdown,1000);updateCountdown();
function celebrate(){for(let i=0;i<90;i++){const p=document.createElement('div');p.className='piece';p.style.left=Math.random()*100+'%';p.style.top='-20px';p.style.animationDelay=Math.random()*1.2+'s';p.style.background=['#c8a96b','#efd8a4','#f4eee4'][i%3];q('#confetti').appendChild(p);setTimeout(()=>p.remove(),4500)}}
const saved=Number(localStorage.getItem('mysteryScene'));if(saved>0&&saved<=total)go(saved);
