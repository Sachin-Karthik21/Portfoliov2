/* ═══════════════════════════════════════
   CINEMATIC SHADOW DRAGON — script.js
═══════════════════════════════════════ */

/* ── ELEMENTS ── */
const dragon      = document.getElementById('dragonTrigger');
const fire        = document.getElementById('fire');
const fireNum     = document.getElementById('fireNum');
const header      = document.getElementById('header');
const scrollBar   = document.getElementById('scrollBar');
const enterBtn    = document.getElementById('enterRealmBtn');
const viewWorkBtn = document.getElementById('viewWorkBtn');
const sendBtn     = document.getElementById('sendBtn');
const backTop     = document.getElementById('backTop');
const toast       = document.getElementById('toast');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose  = document.getElementById('modalClose');
const modalLbl    = document.getElementById('modalLbl');
const modalTitle  = document.getElementById('modalTitle');
const modalDesc   = document.getElementById('modalDesc');
const formStatus  = document.getElementById('formStatus');
const nameInput   = document.getElementById('nameInput');
const emailInput  = document.getElementById('emailInput');
const msgInput    = document.getElementById('msgInput');

let breathCount = 0;

/* ══════════════════════════════
   1. DRAGON — fire breath
══════════════════════════════ */
dragon.addEventListener('click', () => {
  // retrigger animation
  fire.classList.remove('fire-active');
  void fire.offsetWidth;
  fire.classList.add('fire-active');

  // flash
  dragon.style.filter = 'brightness(1.5) drop-shadow(0 0 30px rgba(255,100,0,0.6))';
  setTimeout(() => { dragon.style.filter = ''; }, 500);

  // counter
  breathCount++;
  fireNum.textContent = breathCount;
  fireNum.style.animation = 'none';
  void fireNum.offsetWidth;
  fireNum.style.animation = 'countPop .4s ease';

  // milestone toast
  if (breathCount === 5)  showToast('🔥 Five breaths of fury!');
  if (breathCount === 10) showToast('🐉 The dragon awakens fully!');
  if (breathCount === 20) showToast('💀 Unstoppable dragonfire!');
});

/* ══════════════════════════════
   2. SCROLL — bar + header shrink
══════════════════════════════ */
window.addEventListener('scroll', () => {
  // progress bar
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  scrollBar.style.width = pct + '%';

  // shrink header
  header.classList.toggle('shrunk', window.scrollY > 60);
});

/* ══════════════════════════════
   3. HERO BUTTONS
══════════════════════════════ */
// "ENTER REALM" — smooth scroll to About
enterBtn.addEventListener('click', () => {
  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

// "VIEW WORK" — smooth scroll to Projects
viewWorkBtn.addEventListener('click', () => {
  document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
});

/* ══════════════════════════════
   4. PROJECT CARDS — modal
══════════════════════════════ */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    modalLbl.textContent   = card.dataset.label || '';
    modalTitle.textContent = card.dataset.title || '';
    modalDesc.textContent  = card.dataset.desc  || '';
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modalBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', e => { if (e.target === modalBackdrop) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ══════════════════════════════
   5. CONTACT FORM — validation
══════════════════════════════ */
sendBtn.addEventListener('click', () => {
  const name  = nameInput.value.trim();
  const email = emailInput.value.trim();
  const msg   = msgInput.value.trim();

  // clear old state
  formStatus.className = 'form-status';
  formStatus.textContent = '';

  if (!name) {
    showFormError('Please enter your name.'); return;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFormError('Please enter a valid email.'); return;
  }
  if (!msg) {
    showFormError('Please write a message.'); return;
  }

  // simulate send
  sendBtn.textContent = 'SENDING…';
  sendBtn.disabled = true;

  setTimeout(() => {
    sendBtn.textContent = 'SEND MESSAGE';
    sendBtn.disabled = false;
    nameInput.value = emailInput.value = msgInput.value = '';
    formStatus.textContent = '✓ Message sent! I\'ll respond soon.';
    formStatus.className = 'form-status ok';
    showToast('📨 Message sent!');
  }, 1400);
});

function showFormError(msg) {
  formStatus.textContent = '✕ ' + msg;
  formStatus.className = 'form-status err';
}

/* ══════════════════════════════
   6. NAV LINKS — smooth scroll
══════════════════════════════ */
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ══════════════════════════════
   7. BACK TO TOP
══════════════════════════════ */
backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ══════════════════════════════
   8. TOAST HELPER
══════════════════════════════ */
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ══════════════════════════════
   9. COUNTER POP KEYFRAME (injected)
══════════════════════════════ */
const style = document.createElement('style');
style.textContent = `
  @keyframes countPop {
    0%   { transform:scale(1); }
    40%  { transform:scale(1.7); color:#fff; }
    100% { transform:scale(1); }
  }
`;
document.head.appendChild(style);
