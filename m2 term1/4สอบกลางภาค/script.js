// ===================================================
// SCIMASTER - GRADE 8 TERM 1 MIDTERM EXAM ENGINE
// ===================================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let midtermQueue = [];

const midtermMasterDatabase = [
  {
    category: "🧪 หน่วยที่ 1: สารละลาย",
    sentence: "ในการเตรียมสารละลายแอลกอฮอล์ล้างแผล โดยมีแอลกอฮอล์ 70 ลูกบาศก์เซนติเมตร และน้ำ 30 ลูกบาศก์เซนติเมตร ข้อใดระบุตัวละลายและตัวทำละลายได้ถูกต้อง",
    ans: "น้ำเป็นตัวละลาย และแอลกอฮอล์เป็นตัวทำละลาย",
    options: [
      "น้ำเป็นตัวละลาย และแอลกอฮอล์เป็นตัวทำละลาย",
      "แอลกอฮอล์เป็นตัวละลาย และน้ำเป็นตัวทำละลาย",
      "สารทั้งสองชนิดทำหน้าที่เป็นตัวทำละลายพร้อมกัน",
      "น้ำและแอลกอฮอล์ทำหน้าที่เป็นตัวละลายทั้งคู่"
    ],
    hint: "สารที่มีปริมาณมากกว่าและมีสถานะเดียวกับสารละลายจะทำหน้าที่เป็นตัวทำละลาย",
    exp: "ตอบ <b>น้ำเป็นตัวละลาย และแอลกอฮอล์เป็นตัวทำละลาย</b> เนื่องจากแอลกอฮอล์มีปริมาณมากกว่า (70 cm³)"
  },
  {
    category: "🌡️ หน่วยที่ 1: สภาพละลายได้",
    sentence: "ปัจจัยใดที่มีผลทำให้แก๊สคาร์บอนไดออกไซด์ละลายในน้ำอัดลมได้ดีขึ้นขณะอยู่ในโรงงานผลิต?",
    ans: "การเพิ่มความดันและลดอุณหภูมิ",
    options: [
      "การเพิ่มความดันและลดอุณหภูมิ",
      "การลดความดันและเพิ่มอุณหภูมิ",
      "การเพิ่มทั้งความดันและอุณหภูมิให้สูงขึ้น",
      "การลดทั้งความดันและอุณหภูมิให้ต่ำลงพร้อมกัน"
    ],
    hint: "แก๊สชอบความดันสูงและอุณหภูมิต่ำในการละลาย",
    exp: "ตอบ <b>การเพิ่มความดันและลดอุณหภูมิ</b> ช่วยให้แก๊สละลายในของเหลวได้ดีขึ้นตามหลักของกฎความดัน"
  },
  {
    category: "🫀 หน่วยที่ 2: ระบบหมุนเวียนเลือด",
    sentence: "หลอดเลือดแดงขนาดใหญ่ที่สุดที่ทำหน้าที่นำเลือดที่มีออกซิเจนสูงออกจากหัวใจห้องล่างซ้ายไปเลี้ยงร่างกายคือหลอดเลือดใด?",
    ans: "หลอดเลือดเอออร์ตา (Aorta)",
    options: [
      "หลอดเลือดเอออร์ตา (Aorta)",
      "หลอดเลือดพัลโมนารีอาร์เทอรี (Pulmonary Artery)",
      "หลอดเลือดเวนาคาวา (Vena Cava)",
      "หลอดเลือดฝอย (Capillary)"
    ],
    hint: "เป็นหลอดเลือดหลักที่มีผนังหนาและยืดหยุ่นสูงมาก",
    exp: "ตอบ <b>หลอดเลือดเอออร์ตา (Aorta)</b> นำเลือดแดงบริสุทธิ์จากหัวใจห้องล่างซ้ายส่งต่อสู้ระบบไหลเวียนทั่วร่างกาย"
  },
  {
    category: "🫁 หน่วยที่ 2: ระบบหายใจ",
    sentence: "โครงสร้างใดในระบบหายใจของมนุษย์ที่เป็นบริเวณแลกเปลี่ยนแก๊สออกซิเจนและคาร์บอนไดออกไซด์กับหลอดเลือดฝอยโดยตรง?",
    ans: "ถุงลม (Alveoli)",
    options: [
      "ถุงลม (Alveoli)",
      "หลอดลมฝอย (Bronchioles)",
      "กล่องเสียง (Larynx)",
      "โพรงจมูก (Nasal Cavity)"
    ],
    hint: "มีลักษณะเป็นกระเปาะเล็กๆ อยู่ปลายสุดของหลอดลมฝอยจำนวนหลายล้านถุง",
    exp: "ตอบ <b>ถุงลม (Alveoli)</b> มีผนังบางมากและมีหลอดเลือดฝอยห่อหุ้มเพื่อการแลกเปลี่ยนแก๊ส"
  },
  {
    category: "🏃 หน่วยที่ 3: การเคลื่อนที่",
    sentence: "เด็กชาย A เดินเป็นเส้นตรงไปทางทิศตะวันออก 40 เมตร แล้วเดินกลับมาทางทิศตะวันตก 30 เมตร ใช้เวลาทั้งหมด 10 วินาที ขนาดความเร็วเฉลี่ยของเด็กชาย A มีค่าเท่าใด?",
    ans: "1 เมตรต่อวินาที",
    options: [
      "1 เมตรต่อวินาที",
      "7 เมตรต่อวินาที",
      "3.5 เมตรต่อวินาที",
      "70 เมตรต่อวินาที"
    ],
    hint: "ความเร็ว = การกระจัดรวม / เวลาทั้งหมด (การกระจัดคือ 40 - 30 = 10 เมตรไปทางตะวันออก)",
    exp: "ตอบ <b>1 เมตรต่อวินาที</b> คำนวณจากการกระจัดสุทธิ 10 เมตร หารด้วยเวลา 10 วินาที"
  },
  {
    category: "⚖️ หน่วยที่ 3: แรงและโมเมนต์",
    sentence: "คานงัดอันหนึ่งยาว 3 เมตร มีจุดหมุนอยู่ห่างจากปลายด้านซ้าย 1 เมตร ถ้าออกแรงกดที่ปลายด้านขวา 20 นิวตัน จะสามารถยกวัตถุที่แขวนไว้ที่ปลายด้านซ้ายซึ่งมีน้ำหนักเท่าใดจึงจะสมดุล?",
    ans: "40 นิวตัน",
    options: [
      "40 นิวตัน",
      "10 นิวตัน",
      "20 นิวตัน",
      "60 นิวตัน"
    ],
    hint: "ระยะคานซ้าย 1 ม. ระยะคานขวา = 3 - 1 = 2 ม. (F1 x L1 = F2 x L2)",
    exp: "ตอบ <b>40 นิวตัน</b> คำนวณจาก F₁ × 1 = 20 N × 2 m ดังนั้น F₁ = 40 นิวตัน"
  }
];

let currentMidtermAns = "";
let currentMidtermExp = "";

function shuffleArray(arr) {
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
  if (targetTab) {
    targetTab.classList.add('active');
  }
  if (btnEl) {
    btnEl.classList.add('active');
  }

  if (tabId === 'tab-drill') {
    generateMidtermQuestion();
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

function buildMidtermQueue() {
  return shuffleArray([...midtermMasterDatabase]);
}

function generateMidtermQuestion() {
  if (midtermQueue.length === 0) {
    midtermQueue = buildMidtermQueue();
  }

  const qData = midtermQueue.pop();
  if (!qData) return;

  currentMidtermAns = qData.ans;
  currentMidtermExp = qData.exp;

  const badgeEl = document.getElementById('midterm-category-badge');
  const qTextEl = document.getElementById('midterm-q-text');
  const qHintEl = document.getElementById('midterm-q-hint');

  if (badgeEl) badgeEl.innerHTML = `<i class="fa-solid fa-bookmark"></i> ${qData.category}`;
  if (qTextEl) qTextEl.innerText = qData.sentence;
  if (qHintEl) qHintEl.innerText = `คำใบ้: ${qData.hint}`;

  const fbEl = document.getElementById('midterm-feedback');
  const nextBtnEl = document.getElementById('midterm-next-btn');
  if (fbEl) fbEl.classList.add('hidden');
  if (nextBtnEl) nextBtnEl.classList.add('hidden');

  const container = document.getElementById('midterm-options-container');
  if (!container) return;
  container.innerHTML = "";

  const options = shuffleArray(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkMidtermAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkMidtermAnswer(selected, btn) {
  const isCorrect = selected === currentMidtermAns;
  document.querySelectorAll('#midterm-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentMidtermAns) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('midterm-feedback');
  if (fb) {
    fb.classList.remove('hidden', 'success', 'error');
    fb.classList.add(isCorrect ? 'success' : 'error');
  }

  const titleEl = document.getElementById('midterm-fb-title');
  const descEl = document.getElementById('midterm-fb-desc');
  if (titleEl) titleEl.innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องยอดเยี่ยม!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  if (descEl) descEl.innerHTML = currentMidtermExp;

  const nextBtn = document.getElementById('midterm-next-btn');
  if (nextBtn) nextBtn.classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  midtermQueue = buildMidtermQueue();
};