// ===================================================
// SCIMASTER - HUMAN BODY SYSTEMS (ร่างกายมนุษย์) M.2 ENGINE
// ===================================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let bodyQueue = [];

const bodyMasterDatabase = [
  {
    category: "🫀 ระบบหมุนเวียนเลือด",
    sentence: "หัวใจห้องใดมีผนังกล้ามเนื้อหนาที่สุด ทำหน้าที่สูบฉีดเลือดที่มีปริมาณออกซิเจนสูงไปเลี้ยงส่วนต่างๆ ของร่างกาย?",
    ans: "ห้องล่างซ้าย (Left Ventricle)",
    options: [
      "ห้องล่างซ้าย (Left Ventricle)",
      "ห้องบนซ้าย (Left Atrium)",
      "ห้องล่างขวา (Right Ventricle)",
      "ห้องบนขวา (Right Atrium)"
    ],
    hint: "ต้องใช้แรงดันสูงมากในการดันเลือดไปเลี้ยงทั่วร่างกายจนถึงปลายเท้า",
    exp: "ตอบ <b>ห้องล่างซ้าย (Left Ventricle)</b>[cite: 13] มีผนังหนาที่สุดเพื่อสร้างแรงดันส่งเลือดออกทางหลอดเลือดเอออร์ตาไปทั่วร่างกาย"
  },
  {
    category: "🫁 ระบบหายใจ",
    sentence: "ในขณะที่เรา 'หายใจเข้า' การทำงานของกระบังลมและกระดูกซี่โครงจะมีการเปลี่ยนแปลงอย่างไร?",
    ans: "กระบังลมลดต่ำลง กระดูกซี่โครงยกสูงขึ้น",
    options: [
      "กระบังลมลดต่ำลง กระดูกซี่โครงยกสูงขึ้น",
      "กระบังลมยกสูงขึ้น กระดูกซี่โครงลดต่ำลง",
      "ทั้งกระบังลมและกระดูกซี่โครงยกสูงขึ้นพร้อมกัน",
      "ทั้งกระบังลมและกระดูกซี่โครงลดต่ำลงพร้อมกัน"
    ],
    hint: "การหายใจเข้าทำให้อกขยายใหญ่ขึ้น ปริมาตรช่องอกเพิ่มขึ้น",
    exp: "ตอบ <b>กระบังลมลดต่ำลง กระดูกซี่โครงยกสูงขึ้น</b>[cite: 13] ทำให้ปริมาตรช่องอกเพิ่มขึ้น ความดันอากาศในปอดลดลง อากาศภายนอกจึงไหลเข้ามา"
  },
  {
    category: "🩺 ระบบขับถ่าย",
    sentence: "โครงสร้างขนาดเล็กภายในไตที่ทำหน้าที่กรองของเสียออกจากเลือด และดูดสารที่มีประโยชน์กลับคืนเข้าสู่ร่างกายคืออะไร?",
    ans: "หน่วยไต (Nephron)",
    options: [
      "หน่วยไต (Nephron)",
      "กรวยไต (Renal Pelvis)",
      "ท่อไต (Ureter)",
      "กระเพาะปัสสาวะ (Urinary Bladder)"
    ],
    hint: "ไตแต่ละข้างมีโครงสร้างนี้มากกว่า 1 ล้านหน่วย",
    exp: "ตอบ <b>หน่วยไต (Nephron)</b>[cite: 13] ทำหน้าที่กรองของเสียออกจากเลือดและผลิตน้ำปัสสาวะ"
  },
  {
    category: "🧠 ระบบประสาท",
    sentence: "สมองส่วน 'เซรีบรัม (Cerebrum)' ทำหน้าที่หลักเกี่ยวกับเรื่องใดในร่างกายมนุษย์?",
    ans: "การเรียนรู้ ความจำ สติปัญญา การคิด และการรับรู้สัมผัส",
    options: [
      "การเรียนรู้ ความจำ สติปัญญา การคิด และการรับรู้สัมผัส",
      "การทรงตัวและการประสานงานของกล้ามเนื้อ",
      "การควบคุมการหายใจและการเต้นของหัวใจโดยอัตโนมัติ",
      "การควบคุมอุณหภูมิร่างกายและความอิ่ม"
    ],
    hint: "เป็นสมองส่วนที่มีขนาดใหญ่ที่สุดในมนุษย์",
    exp: "ตอบ <b>การเรียนรู้ ความจำ และสติปัญญา</b>[cite: 13] ส่วนการทรงตัวเป็นหน้าที่ของเซรีเบลลัม (Cerebellum)"
  },
  {
    category: "🧬 ระบบสืบพันธุ์และการคุมกำเนิด",
    sentence: "การทำหมันชาย (Vasectomy) เป็นการคุมกำเนิดแบบถาวร โดยการทำหัตถการกับโครงสร้างใดในระบบสืบพันธุ์เพศชาย?",
    ans: "การตัดและผูกหลอดนำอสุจิ (Vas Deferens)",
    options: [
      "การตัดและผูกหลอดนำอสุจิ (Vas Deferens)",
      "การตัดอัณฑะออกทั้งสองข้าง",
      "การผูกท่อปัสสาวะ",
      "การตัดต่อมลูกหมาก"
    ],
    hint: "เป็นการขัดขวางไม่ให้ตัวอสุจิเดินทางออกมาผสมกับน้ำอสุจิได้",
    exp: "ตอบ <b>การตัดและผูกหลอดนำอสุจิ</b>[cite: 13] ทำให้ไม่มีอสุจิปนออกมาขณะหลั่ง"
  }
];

let currentBodyAns = "";
let currentBodyExp = "";

function shuffle(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return sorted = shuffled;
}

function switchTab(tabId, btnEl) {
  document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(tb => tb.classList.remove('active'));

  const targetTab = document.getElementById(tabId);
  if (targetTab) targetTab.classList.add('active');
  if (btnEl) btnEl.classList.add('active');

  if (tabId === 'tab-drill') {
    generateBodyQuestion();
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

function buildBodyQueue() {
  return shuffle([...bodyMasterDatabase]);
}

function generateBodyQuestion() {
  if (bodyQueue.length === 0) {
    bodyQueue = buildBodyQueue();
  }

  const qData = bodyQueue.pop();
  if (!qData) return;

  currentBodyAns = qData.ans;
  currentBodyExp = qData.exp;

  const badgeEl = document.getElementById('body-category-badge');
  const qTextEl = document.getElementById('body-q-text');
  const qHintEl = document.getElementById('body-q-hint');

  if (badgeEl) badgeEl.innerHTML = `<i class="fa-solid fa-bookmark"></i> ${qData.category}`;
  if (qTextEl) qTextEl.innerText = qData.sentence;
  if (qHintEl) qHintEl.innerText = `คำใบ้: ${qData.hint}`;

  const fbEl = document.getElementById('body-feedback');
  const nextBtnEl = document.getElementById('body-next-btn');
  if (fbEl) fbEl.classList.add('hidden');
  if (nextBtnEl) nextBtnEl.classList.add('hidden');

  const container = document.getElementById('body-options-container');
  if (!container) return;
  container.innerHTML = "";

  const options = shuffle(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkBodyAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkBodyAnswer(selected, btn) {
  const isCorrect = selected === currentBodyAns;
  document.querySelectorAll('#body-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentBodyAns) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('body-feedback');
  if (fb) {
    fb.classList.remove('hidden', 'success', 'error');
    fb.classList.add(isCorrect ? 'success' : 'error');
  }

  const titleEl = document.getElementById('body-fb-title');
  const descEl = document.getElementById('body-fb-desc');
  if (titleEl) titleEl.innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องยอดเยี่ยม!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  if (descEl) descEl.innerHTML = currentBodyExp;

  const nextBtn = document.getElementById('body-next-btn');
  if (nextBtn) nextBtn.classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  bodyQueue = buildBodyQueue();
};