// ==========================================
// SCIMASTER ม.3 เทอม 2 - UNIT 6: ELECTRICITY ENGINE
// ==========================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let sciElec2Queue = [];

const sciElec2Ingredients = [
  {
    sentence: "ลวดตัวนำเส้นหนึ่งมีความต้านทาน 15 โอห์ม มีกระแสไฟฟ้าไหลผ่าน 3 แอมแปร์ ความต่างศักย์ระหว่างปลายทั้งสองของลวดเส้นนี้มีค่าเท่าใด?",
    ans: "45 โวลต์",
    options: ["45 โวลต์", "5 โวลต์", "18 โวลต์", "150 โวลต์"],
    hint: "ใช้กฎของโอห์ม: V = I × R",
    exp: "ตอบ <b>45 โวลต์</b> คำนวณจากสูตร <b>V = IR</b> = 3 × 15 = 45 โวลต์"
  },
  {
    sentence: "เครื่องใช้ไฟฟ้าขนาด 2,000 วัตต์ เปิดใช้งานเป็นเวลา 3 ชั่วโมง จะใช้พลังงานไฟฟ้าไปกี่หน่วย (kWh)?",
    ans: "6 หน่วย",
    options: ["6 หน่วย", "2 หน่วย", "6,000 หน่วย", "0.6 หน่วย"],
    hint: "แปลงวัตต์เป็นกิโลวัตต์โดยหาร 1000 ก่อน แล้วคูณจำนวนชั่วโมง (E = P × t)",
    exp: "ตอบ <b>6 หน่วย</b> คำนวณจาก พลังงาน = (2,000 / 1000 kW) × 3 ชั่วโมง = 6 kWh (หน่วย)"
  },
  {
    sentence: "การต่อตัวต้านทาน 3 ตัว ขนาดตัวละ 6 โอห์ม แบบ 'อนุกรม' จะมีความต้านทานรวมของวงจรเท่าใด?",
    ans: "18 โอห์ม",
    options: ["18 โอห์ม", "2 โอห์ม", "6 โอห์ม", "36 โอห์ม"],
    hint: "การต่ออนุกรมให้นำค่าความต้านทานมาบวกกันทั้งหมด (Rรวม = R1 + R2 + R3)",
    exp: "ตอบ <b>18 โอห์ม</b> คำนวณจาก 6 + 6 + 6 = 18 โอห์ม"
  },
  {
    sentence: "บ้านหลังหนึ่งเปิดหลอดไฟขนาด 100 วัตต์ จำนวน 5 ดวง พร้อมกันเป็นเวลา 4 ชั่วโมง จะสิ้นเปลืองพลังงานไฟฟ้าทั้งหมดกี่หน่วย?",
    ans: "2 หน่วย",
    options: ["2 หน่วย", "20 หน่วย", "0.2 หน่วย", "200 หน่วย"],
    hint: "หากำลังไฟฟ้ารวมทั้งหมดก่อน (100 W × 5 ดวง = 500 W = 0.5 kW) แล้วคูณด้วยเวลา 4 ชั่วโมง",
    exp: "ตอบ <b>2 หน่วย</b> คำนวณจาก (0.5 kW) × 4 ชั่วโมง = 2 หน่วย"
  },
  {
    sentence: "อุปกรณ์ชนิดใดทำหน้าที่ตัดกระแสไฟฟ้าในบ้านโดยอัตโนมัติเมื่อมีกระแสไฟฟ้าไหลผ่านเกินพิกัด และสามารถสับสวิทช์กลับมาใช้ใหม่ได้ทันที?",
    ans: "เบรกเกอร์ (Circuit Breaker)",
    options: ["เบรกเกอร์ (Circuit Breaker)", "ฟิวส์เส้นลวด", "สวิตช์ทางเดียว", "หม้อแปลงไฟฟ้า"],
    hint: "ใช้หลักการแม่เหล็กไฟฟ้าหรือความร้อนในการตัดวงจร และไม่ต้องเปลี่ยนเส้นลวดใหม่",
    exp: "ตอบ <b>เบรกเกอร์ (Circuit Breaker)</b> สะดวกและปลอดภัย สามารถกดเปิดกลับมาใช้งานใหม่ได้ทันทีหลังแก้ไขจุดที่ลัดวงจร"
  }
];

let currentSciElec2Ans = "";
let currentSciElec2Exp = "";

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

  // ถ้ากดสลับมาที่หน้า Drill ให้สั่งสุ่มสร้างโจทย์ทันที ป้องกันหน้าจอโล่ง
  if (tabId === 'tab-drill') {
    generateSciElec2Question();
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

function buildSciElec2Queue() {
  return shuffle([...sciElec2Ingredients]);
}

function generateSciElec2Question() {
  if (sciElec2Queue.length === 0) {
    sciElec2Queue = buildSciElec2Queue();
  }

  const qData = sciElec2Queue.pop();
  if (!qData) return;

  currentSciElec2Ans = qData.ans;
  currentSciElec2Exp = qData.exp;

  const qTextEl = document.getElementById('sci-elec2-q-text');
  const qHintEl = document.getElementById('sci-elec2-q-hint');
  if (qTextEl) qTextEl.innerText = qData.sentence;
  if (qHintEl) qHintEl.innerText = `คำใบ้: ${qData.hint}`;

  const fbEl = document.getElementById('sci-elec2-feedback');
  const nextBtnEl = document.getElementById('sci-elec2-next-btn');
  if (fbEl) fbEl.classList.add('hidden');
  if (nextBtnEl) nextBtnEl.classList.add('hidden');

  const container = document.getElementById('sci-elec2-options-container');
  if (!container) return;
  container.innerHTML = "";

  const options = shuffle(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkSciElec2Answer(opt, btn);
    container.appendChild(btn);
  });
}

function checkSciElec2Answer(selected, btn) {
  const isCorrect = selected === currentSciElec2Ans;
  document.querySelectorAll('#sci-elec2-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentSciElec2Ans) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('sci-elec2-feedback');
  if (fb) {
    fb.classList.remove('hidden', 'success', 'error');
    fb.classList.add(isCorrect ? 'success' : 'error');
  }

  const titleEl = document.getElementById('sci-elec2-fb-title');
  const descEl = document.getElementById('sci-elec2-fb-desc');
  if (titleEl) titleEl.innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องยอดเยี่ยม!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  if (descEl) descEl.innerHTML = currentSciElec2Exp;

  const nextBtn = document.getElementById('sci-elec2-next-btn');
  if (nextBtn) nextBtn.classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  sciElec2Queue = buildSciElec2Queue();
};