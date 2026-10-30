// ==========================================
// SCIMASTER ม.2 เทอม 2 - UNIT 1: WORK & ENERGY ENGINE
// ==========================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let sciEnergyQueue = [];

// คลังวัตถุดิบโจทย์ งานและพลังงาน วิทยาศาสตร์ ม.2 เทอม 2
const sciEnergyIngredients = [
  {
    sentence: "ออกแรงผลักตู้เสื้อผ้า 50 นิวตัน แต่ตู้ไม่เคลื่อนที่เลย งานทางฟิสิกส์ที่เกิดขึ้นมีค่าเท่ากับกี่จูล?",
    ans: "0 จูล",
    options: ["0 จูล", "50 จูล", "250 จูล", "500 จูล"],
    hint: "พิจารณาระยะทาง (s) ตามแนวแรงว่ามีการเคลื่อนที่หรือไม่ (W = F × s)",
    exp: "ตอบ <b>0 จูล</b> เพราะตู้ไม่เคลื่อนที่ (ระยะทาง s = 0) ดังนั้นงานทางฟิสิกส์จึงมีค่าเป็นศูนย์ ถึงแม้จะออกแรงมากก็ตาม"
  },
  {
    sentence: "วัตถุมวล 2 กิโลกรัม อยู่สูงจากพื้นดิน 5 เมตร จะมีพลังงานศักย์โน้มถ่วงเท่าใด (กำหนดให้ g = 10 m/s²)",
    ans: "100 จูล",
    options: ["100 จูล", "50 จูล", "10 จูล", "200 จูล"],
    hint: "ใช้สูตรคำนวณพลังงานศักย์โน้มถ่วง: Ep = mgh",
    exp: "ตอบ <b>100 จูล</b> คำนวณจากสูตร <b>Ep = mgh</b> = 2 × 10 × 5 = 100 จูล"
  },
  {
    sentence: "รถมวล 1,000 กิโลกรัม กำลังแล่นด้วยอัตราเร็ว 20 เมตรต่อวินาที จะมีพลังงานจลน์เท่าใด?",
    ans: "200,000 จูล",
    options: ["200,000 จูล", "100,000 จูล", "400,000 จูล", "20,000 จูล"],
    hint: "ใช้สูตรคำนวณพลังงานจลน์: Ek = (1/2)mv²",
    exp: "ตอบ <b>200,000 จูล</b> คำนวณจากสูตร <b>Ek = (1/2)mv²</b> = (1/2) × 1000 × (20)² = 200,000 จูล"
  },
  {
    sentence: "เครื่องกลอย่างง่ายประเภทใดที่ช่วยผ่อนแรงและเปลี่ยนทิศทางของแรงดึงในเวลาเดียวกัน เช่น การชักธงชาติขึ้นสู่ยอดเสา?",
    ans: "รอกเดี่ยวเคลื่อนที่ / รอกพวง",
    options: ["รอกเดี่ยวเคลื่อนที่ / รอกพวง", "พื้นเอียง", "คานอันดับที่ 3", "ลิ่ม"],
    hint: "อุปกรณ์ทรงกลมมีร่องสำหรับเชือกพาดผ่าน",
    exp: "ตอบ <b>รอกเดี่ยวเคลื่อนที่ / รอกพวง</b> ช่วยทั้งผ่อนแรงและอำนวยความสะดวกในการเปลี่ยนทิศทางแรงดึง"
  },
  {
    sentence: "เมื่อวัตถุตกลงมาจากที่สูงสู่อากาศ พลังงานศักย์โน้มถ่วงและพลังงานจลน์ของวัตถุจะมีการเปลี่ยนแปลงอย่างไรตามกฎการอนุรักษ์พลังงาน?",
    ans: "พลังงานศักย์ลดลง แต่พลังงานจลน์เพิ่มขึ้น โดยพลังงานกลรวมคงที่",
    options: [
      "พลังงานศักย์ลดลง แต่พลังงานจลน์เพิ่มขึ้น โดยพลังงานกลรวมคงที่",
      "พลังงานศักย์และพลังงานจลน์เพิ่มขึ้นพร้อมกัน",
      "พลังงานศักย์เพิ่มขึ้น แต่พลังงานจลน์ลดลง",
      "พลังงานทั้งหมดหายไปเนื่องจากแรงโน้มถ่วง"
    ],
    hint: "ความสูงลดลง (Ep ลด) แต่อัตราเร็วเพิ่มขึ้น (Ek เพิ่ม)",
    exp: "ตอบ <b>พลังงานศักย์ลดลง แต่พลังงานจลน์เพิ่มขึ้น โดยพลังงานกลรวมคงที่</b> ตามกฎการอนุรักษ์พลังงานกล"
  }
];

let currentSciEnergyAns = "";
let currentSciEnergyExp = "";

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

function buildSciEnergyQueue() {
  return shuffle([...sciEnergyIngredients]);
}

function generateSciEnergyQuestion() {
  if (sciEnergyQueue.length === 0) {
    sciEnergyQueue = buildSciEnergyQueue();
  }

  const qData = sciEnergyQueue.pop();
  currentSciEnergyAns = qData.ans;
  currentSciEnergyExp = qData.exp;

  document.getElementById('sci-energy-q-text').innerText = qData.sentence;
  document.getElementById('sci-energy-q-hint').innerText = `คำใบ้: ${qData.hint}`;

  document.getElementById('sci-energy-feedback').classList.add('hidden');
  document.getElementById('sci-energy-next-btn').classList.add('hidden');

  const container = document.getElementById('sci-energy-options-container');
  container.innerHTML = "";

  const options = shuffle(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkSciEnergyAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkSciEnergyAnswer(selected, btn) {
  const isCorrect = selected === currentSciEnergyAns;
  document.querySelectorAll('#sci-energy-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentSciEnergyAns) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('sci-energy-feedback');
  fb.classList.remove('hidden', 'success', 'error');
  fb.classList.add(isCorrect ? 'success' : 'error');

  document.getElementById('sci-energy-fb-title').innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องยอดเยี่ยม!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  document.getElementById('sci-energy-fb-desc').innerHTML = currentSciEnergyExp;

  document.getElementById('sci-energy-next-btn').classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  generateSciEnergyQuestion();
};