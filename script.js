// ---------- Page navigation ----------
function goToPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('page--active'));
  const target=document.getElementById(id);
  target.classList.add('page--active');
  window.scrollTo({top:0,behavior:'smooth'});
}

document.getElementById('yesBtn').addEventListener('click',()=>goToPage('page2'));
document.getElementById('noBtn').addEventListener('click',()=>{
  document.getElementById('noPopupOverlay').classList.add('show');
});
document.getElementById('goBackBtn').addEventListener('click',()=>{
  document.getElementById('noPopupOverlay').classList.remove('show');
});
document.getElementById('toPage3').addEventListener('click',()=>goToPage('page3'));
document.getElementById('toPage4').addEventListener('click',()=>goToPage('page4'));

// ---------- Floating hearts + sparkles background ----------
const bgFx=document.getElementById('bgFx');
const HEART_COUNT=14;
const SPARK_COUNT=10;

function spawnFx(className,symbol){
  const el=document.createElement('span');
  el.className=className;
  el.textContent=symbol;
  const left=Math.random()*100;
  const duration=9+Math.random()*8;
  const delay=Math.random()*10;
  const drift=(Math.random()*80-40)+'px';
  el.style.left=left+'vw';
  el.style.animationDuration=duration+'s';
  el.style.animationDelay=delay+'s';
  el.style.setProperty('--drift',drift);
  bgFx.appendChild(el);
}

const heartSymbols=['💗','💖','💕','🩷'];
for(let i=0;i<HEART_COUNT;i++){
  spawnFx('heart',heartSymbols[Math.floor(Math.random()*heartSymbols.length)]);
}
for(let i=0;i<SPARK_COUNT;i++){
  spawnFx('spark','✨');
}

// ---------- Memory flashcards ----------
const memoryPhotos=[
  'images/image2.jpeg',
  'images/image3.jpeg',
  'images/image4.jpeg',
  'images/image5.jpeg',
  'images/image6.jpeg',
  'images/image7.jpeg',
  'images/image8.jpeg',
  'images/image9.jpeg'
];

const grid=document.getElementById('memoryGrid');
memoryPhotos.forEach((src,i)=>{
  const card=document.createElement('div');
  card.className='mem-card';
  card.innerHTML=`
    <div class="mem-card-inner">
      <div class="mem-face front"><div class="mem-label">memory #${i+1} 📌</div></div>
      <div class="mem-face back"><img src="${src}" alt="memory ${i+1}" loading="lazy"></div>
    </div>`;
  grid.appendChild(card);

  const inner=card.querySelector('.mem-card-inner');
  const img=card.querySelector('img');

  card.addEventListener('click',(e)=>{
    if(!card.classList.contains('flipped')){
      card.classList.add('flipped');
    } else if(e.target===img){
      openLightbox(src);
    }
  });
});

const lightbox=document.getElementById('lightbox');
const lightboxImg=document.getElementById('lightboxImg');
function openLightbox(src){
  lightboxImg.src=src;
  lightbox.classList.add('show');
}
document.getElementById('lightboxClose').addEventListener('click',()=>{
  lightbox.classList.remove('show');
});
lightbox.addEventListener('click',(e)=>{
  if(e.target===lightbox) lightbox.classList.remove('show');
});

// ---------- Envelope / letter ----------
const envelope=document.getElementById('envelope');
const letterOverlay=document.getElementById('letterOverlay');
const clickHint=document.getElementById('clickHint');

envelope.addEventListener('click',()=>{
  envelope.classList.add('opened');
  clickHint.style.opacity='0';
  setTimeout(()=>{
    letterOverlay.classList.add('show');
  },550);
});

document.getElementById('letterClose').addEventListener('click',()=>{
  letterOverlay.classList.remove('show');
});
letterOverlay.addEventListener('click',(e)=>{
  if(e.target===letterOverlay) letterOverlay.classList.remove('show');
});
