let scene = 0;
const scenes = [...document.querySelectorAll('.scene')];
const total = scenes.length - 1;
const q = (selector) => document.querySelector(selector);

function go(n) {
  scenes.forEach((el) => el.classList.remove('active'));
  scene = Math.max(0, Math.min(total, n));
  q(`[data-scene="${scene}"]`).classList.add('active');
  q('#progress').style.width = `${(scene / total) * 100}%`;
  localStorage.setItem('mysterySceneNY', String(scene));
  window.scrollTo(0, 0);
}

function next() { go(scene + 1); }
function resetStory() { localStorage.removeItem('mysterySceneNY'); go(0); }
function triggerGlitch() { go(4); }
function openClue(el) { el.classList.add('open'); el.querySelector('p').classList.remove('hidden'); }

function checkCountry() {
  const input = q('#country');
  const message = q('#answerMessage');
  const value = input.value.trim().toLowerCase();
  if (value === 'italy' || value === 'italia') {
    message.textContent = '';
    next();
  } else {
    message.textContent = 'Not quite. Think farther than New York.';
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 450);
  }
}

q('#country').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') checkCountry();
});

let holdTimer;
const seal = q('#seal');
function beginHold() {
  holdTimer = setTimeout(() => {
    seal.textContent = '✓';
    q('#sealBtn').classList.remove('hidden');
  }, 900);
}
function endHold() { clearTimeout(holdTimer); }
seal.addEventListener('mousedown', beginHold);
seal.addEventListener('mouseup', endHold);
seal.addEventListener('mouseleave', endHold);
seal.addEventListener('touchstart', beginHold, { passive: true });
seal.addEventListener('touchend', endHold);

function updateCountdown() {
  const target = new Date('2026-10-16T15:50:00-05:00');
  const difference = target - new Date();
  const remaining = Math.max(0, difference);
  q('#days').textContent = Math.floor(remaining / 86400000);
  q('#hours').textContent = Math.floor((remaining % 86400000) / 3600000);
  q('#minutes').textContent = Math.floor((remaining % 3600000) / 60000);
  q('#seconds').textContent = Math.floor((remaining % 60000) / 1000);
}
setInterval(updateCountdown, 1000);
updateCountdown();

function celebrate() {
  for (let i = 0; i < 90; i += 1) {
    const piece = document.createElement('div');
    piece.className = 'piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.top = '-20px';
    piece.style.animationDelay = `${Math.random() * 1.2}s`;
    piece.style.background = ['#c8a96b', '#efd8a4', '#f4eee4'][i % 3];
    q('#confetti').appendChild(piece);
    setTimeout(() => piece.remove(), 4500);
  }
}

const saved = Number(localStorage.getItem('mysterySceneNY'));
if (Number.isInteger(saved) && saved > 0 && saved <= total) go(saved);
