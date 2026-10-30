// ==========================================
// SCIMASTER ม.3 เทอม 1 - UNIT 2: WAVES & LIGHT ENGINE
// ==========================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let sciWaveQueue = [];

// คลังวัตถุดิบโจทย์คลื่นและแสง วิทยาศาสตร์ ม.3 เทอม 1
const sciWaveIngredients = [
  {
    sentence: "คลื่นในข้อใด จัดเป็น 'คลื่นตามขวาง (Transverse Wave)' ทั้งหมด?",
    ans: "คลื่นในเส้นเชือก และคลื่นแม่เหล็กไฟฟ้า (แสง)",
    options: [
      "คลื่นในเส้นเชือก และคลื่นแม่เหล็กไฟฟ้า (แสง)",
      "คลื่นเสียง และคลื่นในสปริง (อัด-ขยาย)",
      "คลื่นในเส้นเชือก และคลื่นเสียงในอากาศ",
      "คลื่นในสปริงตามยาว และคลื่นน้ำ"
    ],
    hint: "คลื่นตามขวางคืออนุภาคสั่นตั้งฉากกับการเคลื่อนที่ เช่น แสงและคลื่นบนผิวน้ำ/เส้นเชือก",
    exp: "ตอบ <b>คลื่นในเส้นเชือก และคลื่นแม่เหล็กไฟฟ้า (แสง)</b> เป็นคลื่นตามขวางที่มีทิศการสั่นตั้งฉากกับทิศการเคลื่อนที่"
  },
  {
    sentence: "ถ้าคลื่นมีความถี่ 50 เฮิรตซ์ และมีความยาวคลื่น 2 เมตร อัตราเร็วของคลื่นนี้จะมีค่าเท่าใด?",
    ans: "100 เมตรต่อวินาที",
    options: ["100 เมตรต่อวินาที", "25 เมตรต่อวินาที", "52 เมตรต่อวินาที", "200 เมตรต่อวินาที"],
    hint: "ใช้สูตรคำนวณอัตราเร็วคลื่น: v = f × lambda",
    exp: "ตอบ <b>100 เมตรต่อวินาที</b> คำนวณจากสูตร <b>v = fλ</b> = 50 × 2 = 100 m/s"
  },
  {
    sentence: "ปรากฏการณ์ที่แสงเดินทางผ่านรอยต่อระหว่างตัวกลางสองชนิดที่มีความหนาแน่นต่างกัน แล้วทำให้แนวทางเดินของแสงเบี่ยงเบนไป เรียกว่าอะไร?",
    ans: "การหักเหของแสง (Refraction)",
    options: ["การหักเหของแสง (Refraction)", "การสะท้อนของแสง (Reflection)", "การแทรกสอดของแสง", "การเลี้ยวเบนของแสง"],
    hint: "ทำให้เกิดภาพลวงตา เช่น มองเห็นเหรียญในน้ำตื้นกว่าความเป็นจริง",
    exp: "ตอบ <b>การหักเหของแสง (Refraction)</b> เกิดขึ้นเมื่อแสงเคลื่อนที่ผ่านตัวกลางโปร่งใสต่างชนิดกัน ทำให้อัตราเร็วและทิศทางเปลี่ยนไป"
  },
  {
    sentence: "เลนส์ชนิดใด ที่มีคุณสมบัติในการรวมแสงให้มารวมกันที่จุดโฟกัส (Focus) และใช้รักษาผู้ป่วยสายตายาว?",
    ans: "เลนส์นูน (Convex Lens)",
    options: ["เลนส์นูน (Convex Lens)", "เลนส์เว้า (Concave Lens)", "กระจกเงาเว้า", "กระจกเงาราบ"],
    hint: "ตรงกลางจะหนากว่าขอบทั้งสองข้าง ทำหน้าที่รวมแสง",
    exp: "ตอบ <b>เลนส์นูน (Convex Lens)</b> เป็นเลนส์รวมแสง ใช้แก้ไขสายตายาวเพื่อให้ภาพตกพอดีบนจอตา"
  },
  {
    sentence: "มุมสะท้อน (Reflected angle) จะมีค่าสัมพันธ์อย่างไรกับมุมตกกระทบ (Incident angle) ตามกฎการสะท้อนของแสง?",
    ans: "มุมสะท้อนเท่ากับมุมตกกระทบเสมอ",
    options: [
      "มุมสะท้อนเท่ากับมุมตกกระทบเสมอ",
      "มุมสะท้อนมีค่ามากกว่ามุมตกกระทบสองเท่า",
      "มุมสะท้อนขึ้นอยู่กับความหนาแน่นของตัวกลาง",
      "มุมสะท้อนมีค่าเป็นครึ่งหนึ่งของมุมตกกระทบ"
    ],
    hint: "กฎการสะท้อนข้อที่สองกล่าวถึงขนาดของมุมทั้งสอง",
    exp: "ตอบ <b>มุมสะท้อนเท่ากับมุมตกกระทบเสมอ</b> เมื่อวัดเทียบกับเส้นแนวฉาก (Normal line)"
  }
];

let currentSciWaveAns = "";
let currentSciWaveExp = "";

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

function buildSciWaveQueue() {
  return shuffle([...sciWaveIngredients]);
}

function generateSciWaveQuestion() {
  if (sciWaveQueue.length === 0) {
    sciWaveQueue = buildSciWaveQueue();
  }

  const qData = sciWaveQueue.pop();
  currentSciWaveAns = qData.ans;
  currentSciWaveExp = qData.exp;

  document.getElementById('sci-wave-q-text').innerText = qData.sentence;
  document.getElementById('sci-wave-q-hint').innerText = `คำใบ้: ${qData.hint}`;

  document.getElementById('sci-wave-feedback').classList.add('hidden');
  document.getElementById('sci-wave-next-btn').classList.add('hidden');

  const container = document.getElementById('sci-wave-options-container');
  container.innerHTML = "";

  const options = shuffle(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkSciWaveAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkSciWaveAnswer(selected, btn) {
  const isCorrect = selected === currentSciWaveAns;
  document.querySelectorAll('#sci-wave-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentSciWaveAns) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('sci-wave-feedback');
  fb.classList.remove('hidden', 'success', 'error');
  fb.classList.add(isCorrect ? 'success' : 'error');

  document.getElementById('sci-wave-fb-title').innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องยอดเยี่ยม!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  document.getElementById('sci-wave-fb-desc').innerHTML = currentSciWaveExp;

  document.getElementById('sci-wave-next-btn').classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  generateSciWaveQuestion();
};