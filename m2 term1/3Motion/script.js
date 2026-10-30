// ===================================================
// SCIMASTER - MOTION AND FORCE (การเคลื่อนที่และแรง) M.2 ENGINE
// ===================================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let motionQueue = [];

const motionMasterDatabase = [
  {
    category: "🏃 ระยะทางและการกระจัด",
    sentence: "ข้อใดกล่าวถึงความแตกต่างระหว่าง 'ระยะทาง' กับ 'การกระจัด' ได้ถูกต้องที่สุด?",
    ans: "ระยะทางเป็นปริมาณสเกเลอร์ ส่วนการกระจัดเป็นปริมาณเวกเตอร์ที่มีทิศทาง",
    options: [
      "ระยะทางเป็นปริมาณสเกเลอร์ ส่วนการกระจัดเป็นปริมาณเวกเตอร์ที่มีทิศทาง",
      "ระยะทางมีค่าน้อยกว่าการกระจัดเสมอในการเคลื่อนที่จริง",
      "การกระจัดคือความยาวตามเส้นทางทั้งหมดที่วัตถุเคลื่อนที่ผ่าน",
      "ระยะทางและกาจัดมีหน่วยวัดที่แตกต่างกันโดยสิ้นเชิง"
    ],
    hint: "ระยะทางคิดทุกโค้งทุกเลี้ยว แต่การกระจัดมองแค่จุดเริ่มต้นกับจุดสิ้นสุด",
    exp: "ตอบ <b>ระยะทางเป็นปริมาณสเกเลอร์ ส่วนการกระจัดเป็นปริมาณเวกเตอร์</b> ที่คำนึงถึงทิศทาง"
  },
  {
    category: "🚗 อัตราเร็วและความเร็ว",
    sentence: "วิ่งรอบสนามรูปวงกลมรัศมี 7 เมตร ครบ 1 รอบพอดี ใช้เวลา 20 วินาที ขนาดของความเร็วเฉลี่ยในการวิ่งรอบนี้มีค่าเท่าใด?",
    ans: "0 เมตรต่อวินาที",
    options: [
      "0 เมตรต่อวินาที",
      "2.2 เมตรต่อวินาที",
      "4.4 เมตรต่อวินาที",
      "14 เมตรต่อวินาที"
    ],
    hint: "จุดเริ่มต้นและจุดสิ้นสุดอยู่ที่ตำแหน่งเดียวกัน ทำให้การกระจัดเป็นศูนย์",
    exp: "ตอบ <b>0 เมตรต่อวินาที</b> เพราะเมื่อวิ่งครบ 1 รอบ จุดเริ่มต้นกับจุดสุดท้ายอยู่ที่เดียวกัน ทำให้การกระจัดเป็นศูนย์"
  },
  {
    category: "摩擦 แรงเสียดทาน",
    sentence: "แรงเสียดทานชนิดใดที่มีค่ามากที่สุด ระหว่างวัตถุเริ่มเคลื่อนที่จากหยุดนิ่งกับขณะที่วัตถุกำลังเคลื่อนที่ด้วยความเร็วคงตัว?",
    ans: "แรงเสียดทานสถิต (Static Friction)",
    options: [
      "แรงเสียดทานสถิต (Static Friction)",
      "แรงเสียดทานจลน์ (Kinetic Friction)",
      "แรงเสียดทานอากาศ",
      "แรงเสียดทานกลิ้ง"
    ],
    hint: "แรงเสียดทานขณะวัตถุอยู่นิ่งแล้วเราเริ่มออกแรงผลักให้มันขยับ",
    exp: "ตอบ <b>แรงเสียดทานสถิต</b> มีค่ามากกว่าแรงเสียดทานจลน์เสมอ ทำให้เราต้องออกแรงผลักมากกว่าตอนที่มันเคลื่อนที่แล้ว"
  },
  {
    category: "⚖️ โมเมนต์ของแรง (คาน)",
    sentence: "คานอันหนึ่งยาว 2 เมตร มีจุดรองรับอยู่ตรงกลาง ถ้าแขวนน้ำหนัก 10 นิวตัน ไว้ที่ปลายคานด้านซ้าย ห่างจากจุดหมุน 1 เมตร จะต้องแขวนน้ำหนักเท่าใดที่ปลายด้านขวา ห่างจากจุดหมุน 0.5 เมตร เพื่อให้คานอยู่ในสมดุล?",
    ans: "20 นิวตัน",
    options: [
      "20 นิวตัน",
      "10 นิวตัน",
      "5 นิวตัน",
      "40 นิวตัน"
    ],
    hint: "ใช้หลักการสมดุลของโมเมนต์: โมเมนต์ทวน = โมเมนต์ตาม",
    exp: "ตอบ <b>20 นิวตัน</b> คำนวณจาก 10 N x 1 m = F2 x 0.5 m ดังนั้น F2 = 20 นิวตัน"
  },
  {
    category: "🌊 แรงพยุงของของเหลว (อาร์คิมิดีส)",
    sentence: "ตามหลักของอาร์คิมิดีส แรงพยุงที่ของเหลวกระทำต่อวัตถุที่จมอยู่ในของเหลวมีค่าเท่ากับข้อใด?",
    ans: "เท่ากับน้ำหนักของของเหลวที่มีปริมาตรเท่ากับวัตถุส่วนที่จมอยู่ในของเหลว",
    options: [
      "เท่ากับน้ำหนักของของเหลวที่มีปริมาตรเท่ากับวัตถุส่วนที่จมอยู่ในของเหลว",
      "เท่ากับน้ำหนักทั้งหมดของวัตถุตลอดเวลา",
      "เท่ากับความดันของบรรยากาศที่มากระทำบนผิวหน้าของเหลว",
      "เท่ากับศูนย์เสมอเมื่อวัตถูลอยน้ำ"
    ],
    hint: "พิจารณาจากปริมาตรของน้ำที่ล้นออกมาเมื่อวัตถุหย่อนลงไป",
    exp: "ตอบ <b>เท่ากับน้ำหนักของของเหลวที่ถูกวัตถุแทนที่</b>"
  },
  {
    category: "☁️ ความดันอากาศและแรงหนุน",
    sentence: "เครื่องมือวัดความดันบรรยากาศที่มีชื่อว่า บารอมิเตอร์ ชนิดปรอท หากวัดระดับความสูงขึ้นไปจากระดับน้ำทะเล ค่าความดันอากาศจะมีการเปลี่ยนแปลงอย่างไร?",
    ans: "ลดลงเรื่อยๆ เนื่องจากปริมาณอากาศด้านบนลดลง",
    options: [
      "ลดลงเรื่อยๆ เนื่องจากปริมาณอากาศด้านบนลดลง",
      "เพิ่มสูงขึ้นเรื่อยๆ เนื่องจากเข้าใกล้ดวงอาทิตย์มากขึ้น",
      "มีค่าคงที่เสมอไม่ว่าจะอยู่ความสูงเท่าใด",
      "ลดลงเป็นศูนย์ทันทีที่พ้นพื้นดิน"
    ],
    hint: "ยิ่งขึ้นที่สูง อากาศยิ่งเบาบางลง ทำให้แรงกดอากาศลดลงตามไปด้วย",
    exp: "ตอบ <b>ลดลงเรื่อยๆ</b> เนื่องจากความหนาแน่นของอากาศและมวลอากาศที่กดทับลดลงตามความสูง"
  }
];

let currentMotionAns = "";
let currentMotionExp = "";

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
    generateMotionQuestion();
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

function buildMotionQueue() {
  return shuffleArray([...motionMasterDatabase]);
}

function generateMotionQuestion() {
  if (motionQueue.length === 0) {
    motionQueue = buildMotionQueue();
  }

  const qData = motionQueue.pop();
  if (!qData) return;

  currentMotionAns = qData.ans;
  currentMotionExp = qData.exp;

  const badgeEl = document.getElementById('motion-category-badge');
  const qTextEl = document.getElementById('motion-q-text');
  const qHintEl = document.getElementById('motion-q-hint');

  if (badgeEl) badgeEl.innerHTML = `<i class="fa-solid fa-bookmark"></i> ${qData.category}`;
  if (qTextEl) qTextEl.innerText = qData.sentence;
  if (qHintEl) qHintEl.innerText = `คำใบ้: ${qData.hint}`;

  const fbEl = document.getElementById('motion-feedback');
  const nextBtnEl = document.getElementById('motion-next-btn');
  if (fbEl) fbEl.classList.add('hidden');
  if (nextBtnEl) nextBtnEl.classList.add('hidden');

  const container = document.getElementById('motion-options-container');
  if (!container) return;
  container.innerHTML = "";

  const options = shuffleArray(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkMotionAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkMotionAnswer(selected, btn) {
  const isCorrect = selected === currentMotionAns;
  document.querySelectorAll('#motion-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentMotionAns) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('motion-feedback');
  if (fb) {
    fb.classList.remove('hidden', 'success', 'error');
    fb.classList.add(isCorrect ? 'success' : 'error');
  }

  const titleEl = document.getElementById('motion-fb-title');
  const descEl = document.getElementById('motion-fb-desc');
  if (titleEl) titleEl.innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องยอดเยี่ยม!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  if (descEl) descEl.innerHTML = currentMotionExp;

  const nextBtn = document.getElementById('motion-next-btn');
  if (nextBtn) nextBtn.classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  motionQueue = buildMotionQueue();
};