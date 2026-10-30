// ===================================================
// SCIMASTER - PURE SUBSTANCES (สารบริสุทธิ์) ENGINE
// ===================================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let pureQueue = [];

const pureMasterDatabase = [
  {
    category: "🌡️ สมบัติของสารบริสุทธิ์",
    sentence: "ข้อใดคือลักษณะสำคัญที่ใช้จำแนก 'สารบริสุทธิ์' ออกจาก 'สารผสม' ได้ชัดเจนที่สุดเมื่อนำไปให้ความร้อนจนเดือด?",
    ans: "สารบริสุทธิ์จะมีอุณหภูมิคงที่ขณะเดือด แต่สารผสมอุณหภูมิจะเพิ่มขึ้นเรื่อยๆ",
    options: [
      "สารบริสุทธิ์จะมีอุณหภูมิคงที่ขณะเดือด แต่สารผสมอุณหภูมิจะเพิ่มขึ้นเรื่อยๆ",
      "สารบริสุทธิ์จะต้องมีสถานะเป็นของแข็งเสมอ",
      "สารผสมไม่สามารถกลาย เป็นไอได้",
      "สารบริสุทธิ์ทุกชนิดมีจุดเดือดเท่ากับ 100 องศาเซลเซียสเสมอ"
    ],
    hint: "สังเกตความคงที่ของอุณหภูมิระหว่างการเปลี่ยนสถานะ",
    exp: "ตอบ <b>สารบริสุทธิ์จะมีอุณหภูมิคงที่ขณะเดือด</b> เนื่องจากมีจุดเดือดและจุดหลอมเหลวคงที่เฉพาะตัว"
  },
  {
    category: "⚛️ ธาตุและสารประกอบ",
    sentence: "สารในข้อใดจัดเป็น 'สารประกอบ (Compound)' ทั้งหมดตามหลักเคมี?",
    ans: "น้ำ (H₂O) และคาร์บอนไดออกไซด์ (CO₂)",
    options: [
      "น้ำ (H₂O) และคาร์บอนไดออกไซด์ (CO₂)",
      "แก๊สออกซิเจน (O₂) และแก๊สไนโตรเจน (N₂)",
      "ทองคำ (Au) และเงิน (Ag)",
      "น้ำเกลือและอากาศ"
    ],
    hint: "สารประกอบเกิดจากการรวมตัวของธาตุตั้งแต่ 2 ชนิดขึ้นไปทางเคมี",
    exp: "ตอบ <b>น้ำ (H₂O) และคาร์บอนไดออกไซด์ (CO₂)</b> เพราะประกอบด้วยธาตุต่างชนิดกันมารวมตัวกันด้วยอัตราส่วนคงที่"
  },
  {
    category: "⚛️ โครงสร้างอะตอมเบื้องต้น",
    sentence: "อนุภาคในอะตอมข้อใดที่มีประจุไฟฟ้าเป็นบวก และอยู่ที่บริเวณนิวเคลียสตรงกลาง?",
    ans: "โปรตอน (Proton)",
    options: ["โปรตอน (Proton)", "อิเล็กตรอน (Electron)", "นิวตรอน (Neutron)", "ไอออน (Ion)"],
    hint: "เป็นอนุภาคที่กำหนดเลขอะตอมของธาตุ",
    exp: "ตอบ <b>โปรตอน (Proton)</b> มีประจุไฟฟ้าเป็นบวก อยู่รวมกับนิวตรอนภายในนิวเคลียส"
  },
  {
    category: "🧪 สารละลายและค่า pH",
    sentence: "สารละลายชนิดหนึ่งเมื่อนำมาทดสอบด้วยกระดาษลิตมัสปรากฏว่าเปลี่ยนจากสีแดงเป็นสีน้ำเงิน และค่า pH ของสารละลายนี้ควรอยู่ในช่วงใด?",
    ans: "มากกว่า 7 (pH > 7)",
    options: ["มากกว่า 7 (pH > 7)", "น้อยกว่า 7 (pH < 7)", "เท่ากับ 7 พอดี", "เท่ากับ 0 เท่านั้น"],
    hint: "กระดาษลิตมัสสีแดงเปลี่ยนเป็นน้ำเงินแสดงว่าเป็นสมบัติของเบส",
    exp: "ตอบ <b>มากกว่า 7 (pH > 7)</b> ซึ่งแสดงถึงความเป็นเบส (Alkaline)"
  },
  {
    category: "🌡️ สถานะและความร้อน",
    sentence: "กระบวนการที่สารเปลี่ยนสถานะจาก 'ของแข็งกลายเป็นแก๊ส' โดยไม่ผ่านสถานะของเหลวเรียกว่าอะไร?",
    ans: "การระเหิด (Sublimation)",
    options: ["การระเหิด (Sublimation)", "การระเหย (Evaporation)", "การหลอมเหลว (Melting)", "การควบแน่น (Condensation)"],
    hint: "ตัวอย่างเช่น ลูกเหม็นหรือแห้งแข็ง (Dry Ice)",
    exp: "ตอบ <b>การระเหิด (Sublimation)</b> เป็นการเปลี่ยนสถานะจากของแข็งกลายเป็นไอหรือแก๊สโดยตรง"
  }
];

let currentPureAns = "";
let currentPureExp = "";

function shuffle(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function switchTab(tabId, btnEl) {
  document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(tb => tb.classList.remove('active'));

  const targetTab = document.getElementById(tabId);
  if (targetTab) targetTab.classList.add('active');
  if (btnEl) btnEl.classList.add('active');

  if (tabId === 'tab-drill') {
    generatePureQuestion();
  }
}

function updateScoreBoard(isCorrect) {
  totalAttempts++;
  if (isCorrect) {
    globalScore += 10;
    globalStreak++;
  } else {
    globalStreak = 0;
  }

  const scoreEl = document.getElementById('score-val');
  const streakEl = document.getElementById('streak-val');
  const progressEl = document.getElementById('progress-val');

  if (scoreEl) scoreEl.innerText = globalScore;
  if (streakEl) streakEl.innerText = globalStreak;

  const progressPercent = Math.min(100, Math.round((totalAttempts / 10) * 100));
  if (progressEl) progressEl.innerText = `${progressPercent}%`;
}

function buildPureQueue() {
  return shuffle([...pureMasterDatabase]);
}

function generatePureQuestion() {
  if (pureQueue.length === 0) {
    pureQueue = buildPureQueue();
  }

  const qData = pureQueue.pop();
  if (!qData) return;

  currentPureAns = qData.ans;
  currentPureExp = qData.exp;

  const badgeEl = document.getElementById('pure-category-badge');
  const qTextEl = document.getElementById('pure-q-text');
  const qHintEl = document.getElementById('pure-q-hint');

  if (badgeEl) badgeEl.innerHTML = `<i class="fa-solid fa-bookmark"></i> ${qData.category}`;
  if (qTextEl) qTextEl.innerText = qData.sentence;
  if (qHintEl) qHintEl.innerText = `คำใบ้: ${qData.hint}`;

  const fbEl = document.getElementById('pure-feedback');
  const nextBtnEl = document.getElementById('pure-next-btn');
  if (fbEl) fbEl.classList.add('hidden');
  if (nextBtnEl) nextBtnEl.classList.add('hidden');

  const container = document.getElementById('pure-options-container');
  if (!container) return;
  container.innerHTML = "";

  const options = shuffle(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkPureAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkPureAnswer(selected, btn) {
  const isCorrect = selected === currentPureAns;
  document.querySelectorAll('#pure-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentPureAns) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('pure-feedback');
  if (fb) {
    fb.classList.remove('hidden', 'success', 'error');
    fb.classList.add(isCorrect ? 'success' : 'error');
  }

  const titleEl = document.getElementById('pure-fb-title');
  const descEl = document.getElementById('pure-fb-desc');
  if (titleEl) titleEl.innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องยอดเยี่ยม!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  if (descEl) descEl.innerHTML = currentPureExp;

  const nextBtn = document.getElementById('pure-next-btn');
  if (nextBtn) nextBtn.classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  pureQueue = buildPureQueue();
};