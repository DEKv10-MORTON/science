// ==========================================
// SCIMASTER ม.2 เทอม 2 - UNIT 3: EARTH & CHANGES ENGINE
// ==========================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let sciEarthQueue = [];

// คลังวัตถุดิบโจทย์โครงสร้างโลก ดิน และน้ำ วิทยาศาสตร์ ม.2 เทอม 2
const sciEarthIngredients = [
  {
    sentence: "ชั้นโครงสร้างภายในของโลกชั้นใดที่มีสถานะเป็นของเหลวและประกอบด้วยธาตุเหล็กกับนิกเกิลหลอมเหลว?",
    ans: "แก่นโลกชั้นนอก (Outer Core)",
    options: ["แก่นโลกชั้นนอก (Outer Core)", "แก่นโลกชั้นใน (Inner Core)", "เนื้อโลกชั้นบน", "เปลือกโลกมหาสมุทร"],
    hint: "อยู่ถัดจากเนื้อโลกเข้าไปและเป็นของเหลว ซึ่งทำให้เกิดสนามแม่เหล็กโลก",
    exp: "ตอบ <b>แก่นโลกชั้นนอก (Outer Core)</b> มีสถานะเป็นของเหลวไหลวนอยู่รอบแก่นโลกชั้นในที่เป็นของแข็ง"
  },
  {
    sentence: "ชั้นดินในข้อใดที่มีการสะสมของอินทรียวัตถุหรือซากพืชซากสัตว์เน่าเปื่อยสะสมอยู่หนาแน่นที่สุด (มักเรียกว่าชั้นอินทรียวัตถุ)?",
    ans: "ชั้นดิน A (Topsoil)",
    options: ["ชั้นดิน A (Topsoil)", "ชั้นดิน C", "ชั้นหินพื้น (R)", "ชั้นดิน B"],
    hint: "เป็นชั้นบนสุดที่มีสีคล้ำเพราะมีฮิุมัสและอินทรียวัตถุมาก เหมาะแก่การเพาะปลูก",
    exp: "ตอบ <b>ชั้นดิน A (Topsoil)</b> เป็นชั้นหน้าดินที่มีอินทรียวัตถุและฮิวมัสสะสมอยู่มากที่สุด มีสีคล้ำและอุดมสมบูรณ์"
  },
  {
    sentence: "หินหนืด (Magma) ที่อยู่ภายในชั้นโครงสร้างโลก จะพบได้หนาแน่นที่สุดในบริเวณชั้นใดของโลก?",
    ans: "ชั้นเนื้อโลก (Mantle)",
    options: ["ชั้นเนื้อโลก (Mantle)", "ชั้นเปลือกโลก", "แก่นโลกชั้นใน", "แก่นโลกชั้นนอก"],
    hint: "อยู่ระหว่างเปลือกโลกและแก่นโลก มีความหนามากที่สุด",
    exp: "ตอบ <b>ชั้นเนื้อโลก (Mantle)</b> เป็นชั้นที่อยู่ใต้เปลือกโลก และมีหินหลอมเหลวหนืด (Magma) เคลื่อนที่หมุนวนอยู่ภายใน"
  },
  {
    sentence: "น้ำจืดส่วนใหญ่บนโลกใบนี้ ถูกกักเก็บไว้ที่บริเวณใดมากที่สุด?",
    ans: "ธารน้ำแข็งและพืดน้ำแข็งขั้วโลก",
    options: ["ธารน้ำแข็งและพืดน้ำแข็งขั้วโลก", "น้ำใต้ดิน", "แม่น้ำและทะเลสาบ", "ความชื้นในบรรยากาศ"],
    hint: "น้ำจืดบนโลกไม่ได้อยู่ในแม่น้ำหรือทะเลสาบเป็นหลัก แต่ถูกแช่แข็งไว้",
    exp: "ตอบ <b>ธารน้ำแข็งและพืดน้ำแข็งขั้วโลก</b> กักเก็บน้ำจืดไว้มากที่สุดถึงประมาณ 68-70% ของน้ำจืดทั้งหมดบนโลก"
  },
  {
    sentence: "นักธรณีวิทยาใช้เกณฑ์สิ่งใดในการแบ่งโครงสร้างภายในโลกออกเป็น เปลือกโลก เนื้อโลก และแก่นโลก?",
    ans: "องค์ประกอบทางเคมีของหินและแร่",
    options: ["องค์ประกอบทางเคมีของหินและแร่", "อุณหภูมิผิวโลกภายนอก", "ความหนาแน่นของชั้นบรรยากาศ", "ปริมาณน้ำใต้ดิน"],
    hint: "พิจารณาจากสารประกอบเคมีหลัก เช่น ซิลิเกต เหล็ก และนิกเกิล",
    exp: "ตอบ <b>องค์ประกอบทางเคมีของหินและแร่</b> เป็นเกณฑ์หลักในการแบ่งโครงสร้างภายในโลกออกเป็น 3 ชั้นหลัก"
  }
];

let currentSciEarthAns = "";
let currentSciEarthExp = "";

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

function buildSciEarthQueue() {
  return shuffle([...sciEarthIngredients]);
}

function generateSciEarthQuestion() {
  if (sciEarthQueue.length === 0) {
    sciEarthQueue = buildSciEarthQueue();
  }

  const qData = sciEarthQueue.pop();
  currentSciEarthAns = qData.ans;
  currentSciEarthExp = qData.exp;

  document.getElementById('sci-earth-q-text').innerText = qData.sentence;
  document.getElementById('sci-earth-q-hint').innerText = `คำใบ้: ${qData.hint}`;

  document.getElementById('sci-earth-feedback').classList.add('hidden');
  document.getElementById('sci-earth-next-btn').classList.add('hidden');

  const container = document.getElementById('sci-earth-options-container');
  container.innerHTML = "";

  const options = shuffle(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkSciEarthAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkSciEarthAnswer(selected, btn) {
  const isCorrect = selected === currentSciEarthAns;
  document.querySelectorAll('#sci-earth-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentSciEarthAns) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('sci-earth-feedback');
  fb.classList.remove('hidden', 'success', 'error');
  fb.classList.add(isCorrect ? 'success' : 'error');

  document.getElementById('sci-earth-fb-title').innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องยอดเยี่ยม!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  document.getElementById('sci-earth-fb-desc').innerHTML = currentSciEarthExp;

  document.getElementById('sci-earth-next-btn').classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  generateSciEarthQuestion();
};