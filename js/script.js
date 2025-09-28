// --- configuração inicial ---
const defaultStart = '2024-11-28T00:00:00';

// diferença de tempo
function diffBreakdown(start, now) {
  let s = new Date(start), n = new Date(now);
  if (n < s) return {negative:true};

  let years = n.getFullYear() - s.getFullYear(),
      months = n.getMonth() - s.getMonth(),
      days = n.getDate() - s.getDate(),
      hours = n.getHours() - s.getHours(),
      minutes = n.getMinutes() - s.getMinutes(),
      seconds = n.getSeconds() - s.getSeconds();

  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }

  if (days < 0) {
    const prevMonth = new Date(n.getFullYear(), n.getMonth(), 0);
    days += prevMonth.getDate(); months--;
  }
  if (months < 0) { months += 12; years--; }

  return {years, months, days, hours, minutes, seconds};
}

// render timer
function renderTimer(obj) {
  const container = document.getElementById('timer');
  if (!obj || obj.negative) {
    container.innerHTML = '<div class="muted">A data escolhida é no futuro</div>';
    return;
  }
  container.innerHTML = '';
  const entries = [
    ['Anos', obj.years],
    ['Meses', obj.months],
    ['Dias', obj.days],
    ['Horas', obj.hours],
    ['Min', obj.minutes],
    ['Seg', obj.seconds]
  ];
  for (const [label, num] of entries) {
    const seg = document.createElement('div'); 
    seg.className='time-seg';
    seg.innerHTML = `<div class="num">${String(num).padStart(2,'0')}</div><div class="small">${label}</div>`;
    container.appendChild(seg);
  }
}

// carrossel
let carouselIndex = 0;
const carouselEl = document.getElementById('carousel');
function showIndex(i){
  const imgs = carouselEl.querySelectorAll('img');
  imgs.forEach((img, idx)=> img.classList.toggle('active', idx===i));
}
document.getElementById('prevBtn').addEventListener('click', ()=>{
  const imgs = carouselEl.querySelectorAll('img');
  carouselIndex = (carouselIndex-1+imgs.length)%imgs.length;
  showIndex(carouselIndex);
});
document.getElementById('nextBtn').addEventListener('click', ()=>{
  const imgs = carouselEl.querySelectorAll('img');
  carouselIndex = (carouselIndex+1)%imgs.length;
  showIndex(carouselIndex);
});
setInterval(()=>{
  const imgs = carouselEl.querySelectorAll('img');
  carouselIndex=(carouselIndex+1)%imgs.length;
  showIndex(carouselIndex);
}, 4000);

// localStorage
const STORAGE_KEY = 'relacionamento_data_v1';
function loadState(){ try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) } catch{ return null } }
function saveState(state){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) }

const saved = loadState();
const startISO = saved?.start || defaultStart;
const startDate = new Date(startISO);

document.getElementById('startDateText').textContent = startDate.toLocaleDateString();
document.getElementById('title').textContent = saved?.title || 'Nosso Relacionamento ❤️';

// loop timer
function tick(){
  const now = new Date();
  const d = diffBreakdown(startISO, now.toISOString());
  renderTimer(d);
}
tick(); 
setInterval(tick, 1000);

// edição
/*const editToggle = document.getElementById('editToggle');
const editBar = document.getElementById('editBar');
editToggle.addEventListener('click',(e)=>{
  e.preventDefault();
  editBar.style.display = editBar.style.display === 'flex' ? 'none' : 'flex';
});

const startInput = document.getElementById('startDateInput');
const titleInput = document.getElementById('titleInput');
const fileInput = document.getElementById('fileInput');

startInput.value = startISO.split('T')[0];
titleInput.value = document.getElementById('title').textContent;

document.getElementById('saveBtn').addEventListener('click', ()=>{
  const newStart = startInput.value ? new Date(startInput.value+'T00:00:00').toISOString() : startISO;
  const newTitle = titleInput.value || document.getElementById('title').textContent;
  const state = { start:newStart, title:newTitle };
  saveState(state);
  alert('Salvo localmente no navegador. Para tornar permanente no site, edite o arquivo HTML.');
  location.reload();
});

// upload local (não persiste no servidor)
fileInput.addEventListener('change', async (ev)=>{
  const files = Array.from(ev.target.files);
  const promises = files.map(f=>new Promise((res,rej)=>{
    const r = new FileReader(); r.onload = ()=>res(r.result); r.onerror = rej; r.readAsDataURL(f);
  }));
  const dataurls = await Promise.all(promises);
  carouselEl.innerHTML = '';
  dataurls.forEach((d,idx)=>{
    const img = document.createElement('img'); 
    img.src=d; 
    if(idx===0) img.classList.add('active'); 
    carouselEl.appendChild(img);
  });
});*/

// corações caindo
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "💙"; // coração azul

  // posição horizontal aleatória
  heart.style.left = Math.random() * 100 + "vw";

  // tamanho aleatório
  heart.style.fontSize = (Math.random() * 20 + 15) + "px";

  // duração da queda aleatória
  const duration = Math.random() * 3 + 3; // entre 3 e 6s
  heart.style.animationDuration = duration + "s";

  document.body.appendChild(heart);

  // remove o coração depois da animação
  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

// cria corações a cada 300ms
setInterval(createHeart, 300);

const startBtn = document.getElementById("startBtn");
const introScreen = document.getElementById("intro-screen");
const audioPlayer = document.getElementById("audioPlayer");

startBtn.addEventListener("click", () => {
  // efeito de explosão
  startBtn.classList.add("explode");

  setTimeout(() => {
    introScreen.style.display = "none"; // esconde tela inicial
    document.body.style.overflow = "auto"; // permite rolagem do site
    audioPlayer.play(); // inicia a música automaticamente
  }, 600); // tempo da animação
});
