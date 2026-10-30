// ===================================================
// SCIMASTER - PLANT LIFE PROCESSES (การดำรงชีวิตของพืช) ENGINE
// ===================================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let plantQueue = [];

const plantMasterDatabase = [
  {
    category: "☀️ การสังเคราะห์ด้วยแสง",
    sentence: "ผลผลิตที่สำคัญที่สุดที่พืชสร้างขึ้นจากกระบวนการสังเคราะห์ด้วยแสง และนำไปใช้เป็นพลังงานในการเจริญเติบโตคือข้อใด?",
    ans: "น้ำตาลกลูโคส",
    options: ["น้ำตาลกลูโคส", "แก๊สคาร์บอนไดออกไซด์", "แร่ธาตุในดิน", "กรดอะมิโนอิสระ"],
    hint: "เป็นสารอินทรีย์ประเภทคาร์โบไฮเดรตตัวแรกที่ได้จากกระบวนการนี้",
    exp: "ตอบ <b>น้ำตาลกลูโคส</b> เป็นผลผลิตโดยตรงจากการสังเคราะห์ด้วยแสงของพืช"
  },
  {
    category: "🌿 ท่อลำเลียงของพืช",
    sentence: "เนื้อเยื่อท่อลำเลียงในข้อใด ทำหน้าที่หลักในการลำเลียงน้ำและแร่ธาตุต่างๆ จากรากขึ้นไปสู่ลำต้นและใบของพืช?",
    ans: "ไซเล็ม (Xylem)",
    options: ["ไซเล็ม (Xylem)", "โฟลเอ็ม (Phloem)", "แคมเบียม (Cambium)", "คอร์เทกซ์ (Cortex)"],
    hint: "มีทิศทางการลำเลียงส่วนใหญ่ขึ้นสู่ด้านบนของพืช",
    exp: "ตอบ <b>ไซเล็ม (Xylem)</b> เป็นท่อลำเลียงน้ำและแร่ธาตุ"
  },
  {
    category: "🌸 การสืบพันธุ์ของพืชดอก",
    sentence: "ส่วนประกอบใดของดอกไม้ที่ทำหน้าที่ในการสร้างเซลล์สืบพันธุ์เพศผู้ (ละอองเรณู)?",
    ans: "อับเรณู (Anther) บนเกสรเพศผู้",
    options: ["อับเรณู (Anther) บนเกสรเพศผู้", "รังไข่ (Ovary)", "ยอดเกสรเพศเมีย (Stigma)", "กลีบดอก (Petal)"],
    hint: "อยู่ส่วนปลายของก้านชูเกสรเพศผู้",
    exp: "ตอบ <b>อับเรณูบนเกสรเพศผู้</b> ทำหน้าที่ผลิตละอองเรณูซึ่งภายในมีเซลล์สืบพันธุ์เพศผู้"
  },
  {
    category: "🧬 เทคโนโลยีชีวภาพของพืช",
    sentence: "วิธีการขยายพันธุ์พืชในห้องปฏิบัติการโดยนำเนื้อเยื่อหรือส่วนของพืชมาเพาะเลี้ยงในอาหารสังเคราะห์ภายใต้สภาวะปลอดเชื้อเรียกว่าอะไร?",
    ans: "การเพาะเลี้ยงเนื้อเยื่อ (Tissue Culture)",
    options: ["การเพาะเลี้ยงเนื้อเยื่อ (Tissue Culture)", "การตัดต่อพันธุกรรม (GMOs)", "การตอนกิ่ง", "การติดตาต่อกิ่ง"],
    hint: "สามารถผลิตต้นพืชปริมาณมากๆ ได้ในเวลาอันรวดเร็วและมีลักษณะเหมือนต้นแม่ทุกประการ",
    exp: "ตอบ <b>การเพาะเลี้ยงเนื้อเยื่อ (Tissue Culture)</b> เป็นเทคโนโลยีชีวภาพในการขยายพันธุ์พืชอย่างรวดเร็ว"
  },
  {
    category: "🌿 ท่อลำเลียงของพืช",
    sentence: "อาหารที่พืชสร้างขึ้นจากการสังเคราะห์ด้วยแสง (ในรูปของน้ำตาล) จะถูกลำเลียงไปเลี้ยงส่วนต่างๆ ของพืชผ่านท่อลำเลียงชนิดใด?",
    ans: "โฟลเอ็ม (Phloem)",
    options: ["โฟลเอ็ม (Phloem)", "ไซเล็ม (Xylem)", "สตอมาตา (Stomata)", "คิวติเคิล (Cuticle)"],
    hint: "มีทิศทางการลำเลียงทั้งขึ้นและลงเพื่อกระจายอาหาร",
    exp: "ตอบ <b>โฟลเอ็ม (Phloem)</b> เป็นท่อลำเลียงอาหาร (น้ำตาลและสารอินทรีย์อื่นๆ)"
  }
];

let currentPlantAns = "";
let currentPlantExp = "";

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
    generatePlantQuestion();
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

function buildPlantQueue() {
  return shuffle([...plantMasterDatabase]);
}

function generatePlantQuestion() {
  if (plantQueue.length === 0) {
    plantQueue = buildPlantQueue();
  }

  const qData = plantQueue.pop();
  if (!qData) return;

  currentPlantAns = qData.ans;
  currentPlantExp = qData.exp;

  const badgeEl = document.getElementById('plant-category-badge');
  const qTextEl = document.getElementById('plant-q-text');
  const qHintEl = document.getElementById('plant-q-hint');

  if (badgeEl) badgeEl.innerHTML = `<i class="fa-solid fa-bookmark"></i> ${qData.category}`;
  if (qTextEl) qTextEl.innerText = qData.sentence;
  if (qHintEl) qHintEl.innerText = `คำใบ้: ${qData.hint}`;

  const fbEl = document.getElementById('plant-feedback');
  const nextBtnEl = document.getElementById('plant-next-btn');
  if (fbEl) fbEl.classList.add('hidden');
  if (nextBtnEl) nextBtnEl.classList.add('hidden');

  const container = document.getElementById('plant-options-container');
  if (!container) return;
  container.innerHTML = "";

  const options = shuffle(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkPlantAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkPlantAnswer(selected, btn) {
  const isCorrect = selected === currentPlantAns;
  document.querySelectorAll('#plant-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentPlantAns) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('plant-feedback');
  if (fb) {
    fb.classList.remove('hidden', 'success', 'error');
    fb.classList.add(isCorrect ? 'success' : 'error');
  }

  const titleEl = document.getElementById('plant-fb-title');
  const descEl = document.getElementById('plant-fb-desc');
  if (titleEl) titleEl.innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องยอดเยี่ยม!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  if (descEl) descEl.innerHTML = currentPlantExp;

  const nextBtn = document.getElementById('plant-next-btn');
  if (nextBtn) nextBtn.classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  plantQueue = buildPlantQueue();
};