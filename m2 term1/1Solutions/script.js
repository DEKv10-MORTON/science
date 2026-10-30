// ===================================================
// SCIMASTER - SOLUTIONS (สารละลาย) M.2 ENGINE
// ===================================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let solQueue = [];

const solMasterDatabase = [
  {
    category: "🧪 องค์ประกอบของสารละลาย",
    sentence: "ในการเตรียมสารละลายน้ำตาลทราย โดยใช้น้ำ 100 ลูกบาศก์เซนติเมตร และน้ำตาลทราย 20 กรัม ข้อใดระบุตัวละลายและตัวทำละลายได้ถูกต้องที่สุด?",
    ans: "น้ำตาลทรายเป็นตัวละลาย และน้ำเป็นตัวทำละลาย",
    options: [
      "น้ำตาลทรายเป็นตัวละลาย และน้ำเป็นตัวทำละลาย",
      "น้ำเป็นตัวละลาย และน้ำตาลทรายเป็นตัวทำละลาย",
      "สารทั้งสองชนิดทำหน้าที่เป็นตัวทำละลายร่วมกัน",
      "น้ำตาลทรายเป็นทั้งตัวละลายและตัวทำละลาย"
    ],
    hint: "สารที่มีปริมาณน้อยกว่ามักทำหน้าที่เป็นตัวละลาย",
    exp: "ตอบ <b>น้ำตาลทรายเป็นตัวละลาย และน้ำเป็นตัวทำละลาย</b> เนื่องจากน้ำตาลทรายมีปริมาณน้อยกว่าและถูกกระจายในน้ำ"
  },
  {
    category: "🌡️ สารละลายอิ่มตัวและสภาพละลายได้",
    sentence: "สารละลายอิ่มตัว (Saturated Solution) หมายถึงข้อใดตามหลักวิทยาศาสตร์?",
    ans: "สารละลายที่ไม่สามารถละลายตัวละลายเพิ่มได้อีกแล้วที่อุณหภูมิและความดันคงที่",
    options: [
      "สารละลายที่ไม่สามารถละลายตัวละลายเพิ่มได้อีกแล้วที่อุณหภูมิและความดันคงที่",
      "สารละลายที่มีปริมาณตัวละลายอยู่จำนวนน้อยมากๆ จนเจือจาง",
      "สารละลายที่มีตัวทำละลายอยู่ในสถานะของแข็งเท่านั้น",
      "สารละลายที่เกิดจากการต้มจนเดือดพล่าน"
    ],
    hint: "จุดที่เกินกว่านี้จะเริ่มมีตัวละลายตกตะกอนนอนก้นภาชนะ",
    exp: "ตอบ <b>สารละลายที่ไม่สามารถละลายตัวละลายเพิ่มได้อีกแล้ว</b> ที่อุณหภูมินั้นๆ"
  },
  {
    category: "📈 ปัจจัยที่มีผลต่อสภาพละลายได้",
    sentence: "การเพิ่มอุณหภูมิของตัวทำละลาย จะส่งผลต่อสภาพการละลายได้ของสารละลาย 'ของแข็งในของเหลว' อย่างไร?",
    ans: "โดยทั่วไปสภาพการละลายได้ของสารละลายของแข็งจะเพิ่มสูงขึ้นเมื่ออุณหภูมิสูงขึ้น",
    options: [
      "โดยทั่วไปสภาพการละลายได้ของสารละลายของแข็งจะเพิ่มสูงขึ้นเมื่ออุณหภูมิสูงขึ้น",
      "ทำให้ของแข็งละลายได้น้อยลงและตกตะกอนทันที",
      "ไม่มีผลใดๆ ต่อการละลายของของแข็ง",
      "ทำให้ของแข็งเปลี่ยนสถานะเป็นแก๊สทันที"
    ],
    hint: "เช่น การละลายน้ำตาลหรือเกลือในน้ำร้อนจะละลายได้ดีกว่าน้ำเย็น",
    exp: "ตอบ <b>สภาพการละลายได้ของของแข็งจะเพิ่มสูงขึ้นเมื่ออุณหภูมิสูงขึ้น</b>"
  },
  {
    category: "🥤 ปัจจัยของแก๊สในของเหลว",
    sentence: "เพราะเหตุใดเมื่อเปิดฝาขวดน้ำอัดลม จึงมีฟองแก๊สพุ่งขึ้นมาจำนวนมาก?",
    ans: "เพราะความดันภายในขวดลดลงกะทันหัน ทำให้ความสามารถในการละลายของแก๊สคาร์บอนไดออกไซด์ลดลง",
    options: [
      "เพราะความดันภายในขวดลดลงกะทันหัน ทำให้ความสามารถในการละลายของแก๊สคาร์บอนไดออกไซด์ลดลง",
      "เพราะอุณหภูมิภายนอกขวดต่ำกว่าภายในขวด",
      "เพราะน้ำอัดลมทำปฏิกิริยากับออกซิเจนในอากาศ",
      "เพราะขวดพลาสติกขยายตัวเมื่อเปิดฝา"
    ],
    hint: "เกี่ยวข้องกับกฎของความดันที่มีผลต่อการละลายของแก๊สในของเหลว",
    exp: "ตอบ <b>ความดันลดลงทำให้แก๊สละลายได้น้อยลง</b> ตามกฎของความดัน"
  },
  {
    category: "🧪 สถานะของสารละลาย",
    sentence: "ทองคำ 14 คะรัต ซึ่งเกิดจากการผสมระหว่างทองคำแท้กับเงินและทองแดง จัดเป็นสารละลายในสถานะใด?",
    ans: "สารละลายสถานะของแข็ง",
    options: [
      "สารละลายสถานะของแข็ง",
      "สารละลายสถานะของเหลว",
      "สารละลายสถานะแก๊ส",
      "สารผสมเนื้อผสม (Suspension)"
    ],
    hint: "โลหะผสม (Alloy) ถือเป็นสารละลายของแข็ง",
    exp: "ตอบ <b>สารละลายสถานะของแข็ง</b> (Solid Solution) เช่น ทองคำ 14k, 18k และนาก"
  }
];

let currentSolAns = "";
let currentSolExp = "";

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
    generateSolQuestion();
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

function buildSolQueue() {
  return shuffle([...solMasterDatabase]);
}

function generateSolQuestion() {
  if (solQueue.length === 0) {
    solQueue = buildSolQueue();
  }

  const qData = solQueue.pop();
  if (!qData) return;

  currentSolAns = qData.ans;
  currentSolExp = qData.exp;

  const badgeEl = document.getElementById('sol-category-badge');
  const qTextEl = document.getElementById('sol-q-text');
  const qHintEl = document.getElementById('sol-q-hint');

  if (badgeEl) badgeEl.innerHTML = `<i class="fa-solid fa-bookmark"></i> ${qData.category}`;
  if (qTextEl) qTextEl.innerText = qData.sentence;
  if (qHintEl) qHintEl.innerText = `คำใบ้: ${qData.hint}`;

  const fbEl = document.getElementById('sol-feedback');
  const nextBtnEl = document.getElementById('sol-next-btn');
  if (fbEl) fbEl.classList.add('hidden');
  if (nextBtnEl) nextBtnEl.classList.add('hidden');

  const container = document.getElementById('sol-options-container');
  if (!container) return;
  container.innerHTML = "";

  const options = shuffle(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkSolAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkSolAnswer(selected, btn) {
  const isCorrect = selected === currentSolAns;
  document.querySelectorAll('#sol-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentSolAns) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('sol-feedback');
  if (fb) {
    fb.classList.remove('hidden', 'success', 'error');
    fb.classList.add(isCorrect ? 'success' : 'error');
  }

  const titleEl = document.getElementById('sol-fb-title');
  const descEl = document.getElementById('sol-fb-desc');
  if (titleEl) titleEl.innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องยอดเยี่ยม!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  if (descEl) descEl.innerHTML = currentSolExp;

  const nextBtn = document.getElementById('sol-next-btn');
  if (nextBtn) nextBtn.classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  solQueue = buildSolQueue();
};