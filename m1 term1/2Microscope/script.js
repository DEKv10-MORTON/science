// ===================================================
// SCIMASTER - BASIC UNIT OF LIFE (หน่วยพื้นฐานชีวิต) ENGINE
// ===================================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let lifeQueue = [];

const lifeMasterDatabase = [
  {
    category: "🔍 กล้องจุลทรรศน์ใช้แสง",
    sentence: "หากนักเรียนใช้เลนส์ใกล้วัตถุกำลังขยาย 40x และเลนส์ใกลตากำลังขยาย 10x ภาพที่มองเห็นภายใต้กล้องจุลทรรศน์จะมีกำลังขยายรวมเท่าใด?",
    ans: "400 เท่า",
    options: ["400 เท่า", "50 เท่า", "4,000 เท่า", "140 เท่า"],
    hint: "กำลังขยายรวมหาได้จากการนำกำลังขยายของเลนส์ทั้งสองมาคูณกัน",
    exp: "ตอบ <b>400 เท่า</b> คำนวณจาก $40 \times 10 = 400$ เท่า"
  },
  {
    category: "🔬 โครงสร้างเซลล์ (Cell)",
    sentence: "ออร์แกเนลล์หรือส่วนประกอบใดของเซลล์ที่ทำหน้าที่ควบคุมกิจกรรมต่างๆ ภายในเซลล์ และเก็บรักษาสารพันธุกรรม (DNA)?[cite: 6]",
    ans: "นิวเคลียส (Nucleus)[cite: 6]",
    options: ["นิวเคลียส (Nucleus)[cite: 6]", "ไซโทพลาซึม (Cytoplasm)[cite: 6]", "เยื่อหุ้มเซลล์ (Cell membrane)[cite: 6]", "แวคิวโอล (Vacuole)"],
    hint: "เปรียบเสมือนศูนย์กลางหรือมันสมองของเซลล์",
    exp: "ตอบ <b>นิวเคลียส (Nucleus)[cite: 6]</b> ทำหน้าที่ควบคุมการทำงานของเซลล์และถ่ายทอดทางพันธุกรรม"
  },
  {
    category: "💧 การลำเลียงสาร: การแพร่",
    sentence: "การที่นักเรียนได้กลิ่นน้ำหอมฟุ้งกระจายไปทั่วห้องเรียน เป็นผลมาจากปรากฏการณ์ทางชีววิทยาและฟิสิกส์ในข้อใด?",
    ans: "การแพร่ (Diffusion)[cite: 6]",
    options: ["การแพร่ (Diffusion)[cite: 6]", "การออสโมซิส (Osmosis)[cite: 6]", "แอคทีฟทรานสปอร์ต", "การสังเคราะห์ด้วยแสง"],
    hint: "อนุภาคของแก๊สเคลื่อนที่จากบริเวณที่มีความเข้มข้นสูงไปสู่ความเข้มข้นต่ำ",
    exp: "ตอบ <b>การแพร่ (Diffusion)[cite: 6]</b> คือการเคลื่อนที่ของสารจากบริเวณที่มีความเข้มข้นมากไปสู่บริเวณที่มีความเข้มข้นน้อย"
  },
  {
    category: "💧 การลำเลียงสาร: ออสโมซิส",
    sentence: "ข้อใดกล่าวถึงกระบวนการ 'ออสโมซิส (Osmosis)' ได้ถูกต้องที่สุด?[cite: 6]",
    ans: "เป็นการเคลื่อนที่ของโมเลกุลน้ำผ่านเยื่อเลือกผ่านจากบริเวณที่มีความเข้มข้นของน้ำมากไปหาน้อย[cite: 6]",
    options: [
      "เป็นการเคลื่อนที่ของโมเลกุลน้ำผ่านเยื่อเลือกผ่านจากบริเวณที่มีความเข้มข้นของน้ำมากไปหาน้อย[cite: 6]",
      "เป็นการเคลื่อนที่ของสารละลายเข้มข้นผ่านผิวเซลล์โดยตรง",
      "เป็นกระบวนการที่ต้องใช้พลังงาน ATP จากเซลล์เสมอ",
      "เป็นการเคลื่อนที่ของแก๊สออกซิเจนเข้าสู่เซลล์เม็ดเลือดแดง"
    ],
    hint: "เน้นการเคลื่อนที่ของ 'น้ำ' ผ่านเยื่อเลือกผ่าน[cite: 6]",
    exp: "ตอบ <b>เป็นการเคลื่อนที่ของโมเลกุลน้ำผ่านเยื่อเลือกผ่าน[cite: 6]</b> จากบริเวณที่น้ำมาก (สารละลายเจือจาง) ไปยังบริเวณที่น้ำน้อย (สารละลายเข้มข้น)"
  },
  {
    category: "🔬 โครงสร้างเซลล์ (Cell)",
    sentence: "โครงสร้างในข้อใดที่พบได้ใน 'เซลล์พืช' แต่ 'ไม่พบ' ในเซลล์สัตว์ เพื่อช่วยให้เซลล์คงรูปและมีความแข็งแรง?[cite: 6]",
    ans: "ผนังเซลล์ (Cell Wall)[cite: 6]",
    options: ["ผนังเซลล์ (Cell Wall)[cite: 6]", "เยื่อหุ้มเซลล์ (Cell membrane)[cite: 6]", "ไมโตคอนเดรีย (Mitochondria)", "ไรโบโซม (Ribosome)"],
    hint: "อยู่ชั้นนอกสุดของเซลล์พืช ห่อหุ้มเยื่อหุ้มเซลล์ไว้อีกชั้น",
    exp: "ตอบ <b>ผนังเซลล์ (Cell Wall)[cite: 6]</b> เป็นชั้นนอกสุดของเซลล์พืชประกอบด้วยเซลลูโลสช่วยให้ความแข็งแรง"
  }
];

let currentLifeAns = "";
let currentLifeExp = "";

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
    generateLifeQuestion();
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

function buildLifeQueue() {
  return shuffle([...lifeMasterDatabase]);
}

function generateLifeQuestion() {
  if (lifeQueue.length === 0) {
    lifeQueue = buildLifeQueue();
  }

  const qData = lifeQueue.pop();
  if (!qData) return;

  currentLifeAns = qData.ans;
  currentLifeExp = qData.exp;

  const badgeEl = document.getElementById('life-category-badge');
  const qTextEl = document.getElementById('life-q-text');
  const qHintEl = document.getElementById('life-q-hint');

  if (badgeEl) badgeEl.innerHTML = `<i class="fa-solid fa-bookmark"></i> ${qData.category}`;
  if (qTextEl) qTextEl.innerText = qData.sentence;
  if (qHintEl) qHintEl.innerText = `คำใบ้: ${qData.hint}`;

  const fbEl = document.getElementById('life-feedback');
  const nextBtnEl = document.getElementById('life-next-btn');
  if (fbEl) fbEl.classList.add('hidden');
  if (nextBtnEl) nextBtnEl.classList.add('hidden');

  const container = document.getElementById('life-options-container');
  if (!container) return;
  container.innerHTML = "";

  const options = shuffle(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkLifeAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkLifeAnswer(selected, btn) {
  const isCorrect = selected === currentLifeAns;
  document.querySelectorAll('#life-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentLifeAns) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('life-feedback');
  if (fb) {
    fb.classList.remove('hidden', 'success', 'error');
    fb.classList.add(isCorrect ? 'success' : 'error');
  }

  const titleEl = document.getElementById('life-fb-title');
  const descEl = document.getElementById('life-fb-desc');
  if (titleEl) titleEl.innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องยอดเยี่ยม!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  if (descEl) descEl.innerHTML = currentLifeExp;

  const nextBtn = document.getElementById('life-next-btn');
  if (nextBtn) nextBtn.classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  lifeQueue = buildLifeQueue();
};