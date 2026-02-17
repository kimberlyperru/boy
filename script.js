const container = document.getElementById('loveContainer');
const song = document.getElementById('mySong');
const muteBtn = document.getElementById('muteBtn');
const daysDisplay = document.getElementById('days-count');
const envelope = document.getElementById('envelope');
const closeBtn = document.getElementById('closeLetter');

// 1. ANNIVERSARY
const anniversaryDate = new Date('2023-05-15'); 
function updateCounter() {
    const today = new Date();
    const timeDiff = today - anniversaryDate;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    if(daysDisplay) daysDisplay.innerText = days;
}
updateCounter();

// 2. HEARTS
const colors = ['#ff4d6d', '#ff758f', '#ff8fa3', '#ffb3c1', '#c9184a'];
function createHeart(x, y, isBurst = false, isKiss = false) {
    const heart = document.createElement('div');
    if (isKiss) { heart.innerText = '💋'; heart.style.position = 'absolute'; }
    else { heart.classList.add('heart'); }
    
    heart.style.left = (x ? x : Math.random() * window.innerWidth) + 'px';
    heart.style.top = (y ? y : -50) + 'px';
    
    const size = isBurst ? (Math.random() * 15 + 5) : (Math.random() * 15 + 10);
    if (!isKiss) {
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    } else { heart.style.fontSize = '30px'; }
    
    const duration = isBurst ? (Math.random() * 0.7 + 0.6) : (Math.random() * 3 + 4);
    heart.style.setProperty('--duration', duration + 's');
    
    if (isBurst) {
        heart.classList.add('burst');
        heart.style.setProperty('--drift', (Math.random() - 0.5) * 500 + 'px');
        heart.style.setProperty('--v-drift', (Math.random() - 0.5) * 500 + 'px');
    } else { heart.classList.add('floating'); }

    container.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
}
setInterval(() => createHeart(), 450);

// 3. EVENTS
let audioStarted = false;
window.addEventListener('click', (e) => {
    if (!audioStarted) { song.play().catch(() => {}); audioStarted = true; }
    for (let i = 0; i < 6; i++) { createHeart(e.clientX, e.clientY, true); }
});

envelope.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!envelope.classList.contains('open')) {
        envelope.classList.add('open');
        const rect = envelope.getBoundingClientRect();
        for (let i = 0; i < 20; i++) { createHeart(rect.left + 50, rect.top, true, true); }
    }
});

closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    envelope.classList.remove('open');
});

muteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    song.muted = !song.muted;
    muteBtn.innerText = song.muted ? "🔇" : "🔊";
});