// ==========================================
// SCIMASTER ม.3 เทอม 1 - UNIT 3: ELECTRICITY ENGINE
// ==========================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let sciElecQueue = [];

// คลังวัตถุดิบโจทย์ไฟฟ้า วิทยาศาสตร์ ม.3 เทอม 1
const sciElecIngredients = [
  {
    sentence: "ลวดตัวนำเส้นหนึ่งมีความต้านทาน 10 โอห์ม มีกระแสไฟฟ้าไหลผ่าน 2 แอมแปร์ จะมีความต่างศักย์คร่อมลวดเส้นนี้เท่าใด?",
    ans: "20 โวลต์",
    options: ["20 โวลต์", "5 โวลต์", "12 โวลต์", "100 โวลต์"],
    hint: "ใช้สูตรกฎของโอห์ม: V = I × R",
    exp: "ตอบ <b>20 โวลต์</b> คำนวณจากสูตร <b>V = IR</b> = 2 × 10 = 20 โวลต์"
  },
  {
    sentence: "การต่อตัวต้านทานแบบใด ที่ทำให้ความต้านทานรวมของวงจรมีค่าน้อยกว่าความต้านทานของตัวต้านทานทุกตัวในวงจร?",
    ans: "การต่อแบบขนาน (Parallel circuit)",
    options: ["การต่อแบบขนาน (Parallel circuit)", "การต่อแบบอนุกรม (Series circuit)", "การต่อแบบผสมเชิงซ้อน", "การต่อลงดิน"],
    hint: "การต่อลักษณะนี้จะเพิ่มช่องทางให้กระแสไฟฟ้าไหลผ่านมากขึ้น ทำให้ความต้านทานรวมลดลง",
    exp: "ตอบ <b>การต่อแบบขนาน (Parallel circuit)</b> ทำให้ความต้านทานรวมลดลงและแรงดันไฟฟ้าเท่ากันทุกสาขา"
  },
  {
    sentence: "เครื่องใช้ไฟฟ้าขนาด 1,000 วัตต์ เปิดใช้งานนาน 2 ชั่วโมง จะใช้พลังงานไฟฟ้าไปกี่หน่วย (kWh)?",
    ans: "2 หน่วย",
    options: ["2 หน่วย", "0.5 หน่วย", "2,000 หน่วย", "500 หน่วย"],
    hint: "แปลงวัตต์เป็นกิโลวัตต์ (หาร 1000) แล้วคูณด้วยเวลาเป็นชั่วโมง (P × t)",
    exp: "ตอบ <b>2 หน่วย</b> คำนวณจากพลังงาน (kWh) = (1,000 W / 1000) × 2 ชั่วโมง = 2 หน่วย"
  },
  {
    sentence: "อุปกรณ์ป้องกันอันตรายจากกระแสไฟฟ้าเกินในบ้าน ที่ทำหน้าที่หลอมละลายและตัดวงจรโดยอัตโนมัติคืออะไร?",
    ans: "ฟิวส์ (Fuse)",
    options: ["ฟิวส์ (Fuse)", "สวิตช์ไฟ", "หม้อแปลงไฟฟ้า", "ตัวเก็บประจุ"],
    hint: "มีจุดหลอมเหลวต่ำ เมื่อกระแสไฟเกินจนเกิดความร้อนจะขาดทันที",
    exp: "ตอบ <b>ฟิวส์ (Fuse)</b> ทำจากโลหะผสมที่มีจุดหลอมเหลวต่ำ ป้องกันไม่ให้อุปกรณ์ไฟฟ้าเสียหายจากกระแสลัดวงจร"
  },
  {
    sentence: "หน่วยทางฟิสิกส์ของ 'กำลังไฟฟ้า (Electrical Power)' คือข้อใด?",
    ans: "วัตต์ (Watt หรือ W)",
    options: ["วัตต์ (Watt หรือ W)", "แอมแปร์ (Ampere)", "โวลต์ (Volt)", "โอห์ม (Ohm)"],
    hint: "เป็นอัตราการใช้พลังงานไฟฟ้าต่อหนึ่งหน่วยเวลา",
    exp: "ตอบ <b>วัตต์ (Watt)</b> หรือจูลต่อวินาที เป็นหน่วยวัดกำลังไฟฟ้าของเครื่องใช้ไฟฟ้า"
  }
];

let currentSciElecAns = "";
let currentSciElecExp = "";

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

function buildSciElecQueue() {
  return shuffle([...sciElecIngredients]);
}

function generateSciElecQuestion() {
  if (sciElecQueue.length === 0) {
    sciElecQueue = buildSciElecQueue();
  }

  const qData = sciElecQueue.pop();
  currentSciElecAns = qData.ans;
  currentSciElecExp = qData.exp;

  document.getElementById('sci-elec-q-text').innerText = qData.sentence;
  document.getElementById('sci-elec-q-hint').innerText = `คำใบ้: ${qData.hint}`;

  document.getElementById('sci-elec-feedback').classList.add('hidden');
  document.getElementById('sci-elec-next-btn').classList.add('hidden');

  const container = document.getElementById('sci-elec-options-container');
  container.innerHTML = "";

  const options = shuffle(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkSciElecAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkSciElecAnswer(selected, btn) {
  const isCorrect = selected === currentSciElecAns;
  document.querySelectorAll('#sci-elec-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentSciElecAns) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('sci-elec-feedback');
  fb.classList.remove('hidden', 'success', 'error');
  fb.classList.add(isCorrect ? 'success' : 'error');

  document.getElementById('sci-elec-fb-title').innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องยอดเยี่ยม!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  document.getElementById('sci-elec-fb-desc').innerHTML = currentSciElecExp;

  document.getElementById('sci-elec-next-btn').classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  generateSciElecQuestion();
};