// ==========================================
// SCIMASTER ม.2 เทอม 2 - UNIT 4: ENERGY & HAZARDS ENGINE
// ==========================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let sciEnergyHazQueue = [];

// คลังวัตถุดิบโจทย์ ทรัพยากรพลังงานและภัยธรรมชาติ ม.2 เทอม 2
const sciEnergyHazIngredients = [
  {
    sentence: "แหล่งพลังงานในข้อใดจัดเป็น 'พลังงานหมุนเวียน (Renewable Energy)' ที่สามารถนำกลับมาใช้ใหม่ได้ไม่หมดสิ้น?",
    ans: "พลังงานแสงอาทิตย์และพลังงานลม",
    options: ["พลังงานแสงอาทิตย์และพลังงานลม", "ถ่านหินและน้ำมันดิบ", "ก๊าซธรรมชาติ", "พลังงานนิวเคลียร์จากยูเรเนียม"],
    hint: "เป็นพลังงานธรรมชาติที่ได้จากแสงแดด กระแสลม หรือสายน้ำที่ไม่จำกัด",
    exp: "ตอบ <b>พลังงานแสงอาทิตย์และพลังงานลม</b> จัดเป็นพลังงานหมุนเวียนที่มีความสะอาดยั่งยืนและไม่หมดไป"
  },
  {
    sentence: "เชื้อเพลิงซากดึกดำบรรพ์ (Fossil Fuels) ประเภทใดที่พบสถานะเป็นของเหลวและนำมากลั่นเป็นน้ำมันเชื้อเพลิงยานพาหนะ?",
    ans: "น้ำมันดิบ (Petroleum)",
    options: ["น้ำมันดิบ (Petroleum)", "ถ่านหินลิกไนต์", "ก๊าซธรรมชาติชีวภาพ", "หินน้ำมัน"],
    hint: "ของเหลวข้นสีดำที่สูบขึ้นมาจากใต้ดินก่อนนำไปเข้าโรงกลั่น",
    exp: "ตอบ <b>น้ำมันดิบ (Petroleum)</b> เป็นเชื้อเพลิงฟอสซิลเหลวที่ใช้มากที่สุดในภาคการคมนาคมขนส่ง"
  },
  {
    sentence: "ภัยธรรมชาติประเภทใดที่มีสาเหตุหลักมาจากการเคลื่อนตัวตามรอยเลื่อนของแผ่นธรณีภาคใต้เปลือกโลก?",
    ans: "แผ่นดินไหว (Earthquake)",
    options: ["แผ่นดินไหว (Earthquake)", "วาตภัยพายุหมุน", "ภัยแล้งฝนทิ้งช่วง", "ไฟป่าธรรมชาติ"],
    hint: "ทำให้เกิดแรงสั่นสะเทือนรุนแรงและอาจก่อให้เกิดสึนามิตามมา",
    exp: "ตอบ <b>แผ่นดินไหว (Earthquake)</b> เกิดจากการปลดปล่อยพลังงานสะสมตามรอยเลื่อนของเปลือกโลกอย่างฉับพลัน"
  },
  {
    sentence: "แนวทางใดในการอนุรักษ์พลังงานที่มีประสิทธิภาพและยั่งยืนที่สุดในชีวิตประจำวัน?",
    ans: "ใช้พลังงานอย่างประหยัดและปิดอุปกรณ์ไฟฟ้าเมื่อไม่ใช้งาน",
    options: [
      "ใช้พลังงานอย่างประหยัดและปิดอุปกรณ์ไฟฟ้าเมื่อไม่ใช้งาน",
      "หยุดใช้พลังงานทุกชนิดในทันที",
      "ห้ามใช้รถยนต์ส่วนบุคคลตลอดชีวิต",
      "พึ่งพาพลังงานจากถ่านหินนำเข้าเท่านั้น"
    ],
    hint: "การปรับพฤติกรรมการบริโภคพลังงานในครัวเรือนและอุตสาหกรรม",
    exp: "ตอบ <b>ใช้พลังงานอย่างประหยัดและปิดอุปกรณ์ไฟฟ้าเมื่อไม่ใช้งาน</b> เป็นการลดการสูญเสียพลังงานที่ต้นเหตุอย่างยั่งยืน"
  },
  {
    sentence: "ปรากฏการณ์ 'สึนามิ' ที่ซัดเข้าสู่ชายฝั่งด้วยความเร็วสูง มักมีสาเหตุเริ่มต้นมาจากเหตุการณ์ใดในทะเล?",
    ans: "แผ่นดินไหวรุนแรงใต้พื้นท้องมหาสมุทร",
    options: ["แผ่นดินไหวรุนแรงใต้พื้นท้องมหาสมุทร", "พายุดีเปรสชันก่อตัวกลางทะเล", "น้ำขึ้นน้ำลงสูงสุดตามแรงดึงดูดของดวงจันทร์", "การระเบิดของคลื่นความร้อนในบรรยากาศ"],
    hint: "เกิดการยุบหรือยกตัวของแผ่นเปลือกโลกใต้ทะเลลึก",
    exp: "ตอบ <b>แผ่นดินไหวรุนแรงใต้พื้นท้องมหาสมุทร</b> ทำให้มวลน้ำปริมาณมหาศาลเคลื่อนตัวกลายเป็นคลื่นยักษ์สึนามิ"
  }
];

let currentSciEnergyHazAns = "";
let currentSciEnergyHazExp = "";

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

function buildSciEnergyHazQueue() {
  return shuffle([...sciEnergyHazIngredients]);
}

function generateSciEnergyHazQuestion() {
  if (sciEnergyHazQueue.length === 0) {
    sciEnergyHazQueue = buildSciEnergyHazQueue();
  }

  const qData = sciEnergyHazQueue.pop();
  currentSciEnergyHazAns = qData.ans;
  currentSciEnergyHazExp = qData.exp;

  document.getElementById('sci-energy-haz-q-text').innerText = qData.sentence;
  document.getElementById('sci-energy-haz-q-hint').innerText = `คำใบ้: ${qData.hint}`;

  document.getElementById('sci-energy-haz-feedback').classList.add('hidden');
  document.getElementById('sci-energy-haz-next-btn').classList.add('hidden');

  const container = document.getElementById('sci-energy-haz-options-container');
  container.innerHTML = "";

  const options = shuffle(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkSciEnergyHazAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkSciEnergyHazAnswer(selected, btn) {
  const isCorrect = selected === currentSciEnergyHazAns;
  document.querySelectorAll('#sci-energy-haz-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentSciEnergyHazAns) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('sci-energy-haz-feedback');
  fb.classList.remove('hidden', 'success', 'error');
  fb.classList.add(isCorrect ? 'success' : 'error');

  document.getElementById('sci-energy-haz-fb-title').innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องยอดเยี่ยม!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  document.getElementById('sci-energy-haz-fb-desc').innerHTML = currentSciEnergyHazExp;

  document.getElementById('sci-energy-haz-next-btn').classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  generateSciEnergyHazQuestion();
};