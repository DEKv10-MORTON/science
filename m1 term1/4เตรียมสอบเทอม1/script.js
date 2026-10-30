// ===================================================
// SCIMASTER - GRADE 7 TERM 1 FINAL EXAM REVIEW ENGINE
// ===================================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let term1Queue = [];

const term1MasterDatabase = [
  {
    category: "🌡️ สารบริสุทธิ์ (Pure Substances)",
    sentence: "ในการต้มสารละลายน้ำเกลือกับน้ำกลั่นอย่างละเท่าๆ กัน ข้อใดกล่าวถึงจุดเดือดของสารทั้งสองได้ถูกต้องที่สุด?",
    ans: "น้ำกลั่นมีอุณหภูมิคงที่ขณะเดือด แต่น้ำเกลืออุณหภูมิจะสูงขึ้นเรื่อยๆ",
    options: [
      "น้ำกลั่นมีอุณหภูมิคงที่ขณะเดือด แต่น้ำเกลืออุณหภูมิจะสูงขึ้นเรื่อยๆ",
      "สารทั้งสองมีจุดเดือดคงที่เท่ากันที่ 100 องศาเซลเซียส",
      "น้ำเกลือมีจุดเดือดคงที่แต่น้ำกลั่นไม่คงที่",
      "สารทั้งสองไม่มีจุดเดือดที่แน่นอน"
    ],
    hint: "น้ำกลั่นเป็นสารบริสุทธิ์ แต่น้ำเกลือเป็นสารผสม",
    exp: "ตอบ <b>น้ำกลั่นมีอุณหภูมิคงที่ขณะเดือด แต่น้ำเกลืออุณหภูมิจะสูงขึ้นเรื่อยๆ</b> เนื่องจากน้ำกลั่นเป็นสารบริสุทธิ์แต่น้ำเกลือเป็นสารผสม"
  },
  {
    category: "🔬 เซลล์และการลำเลียง (Cell & Transport)",
    sentence: "ถ้าแช่เซลล์เม็ดเลือดแดงในน้ำกลั่น (สารละลายที่มีความเข้มข้นต่ำกว่าภายในเซลล์) จะเกิดปรากฏการณ์ใดขึ้นกับเซลล์เม็ดเลือดแดง?",
    ans: "น้ำออสโมซิสเข้าสู่เซลล์ทำให้เซลล์เต่งและแตกได้",
    options: [
      "น้ำออสโมซิสเข้าสู่เซลล์ทำให้เซลล์เต่งและแตกได้",
      "น้ำออสโมซิสออกจากเซลล์ทำให้เซลล์เหี่ยว",
      "ขนาดของเซลล์เม็ดเลือดแดงจะไม่เปลี่ยนแปลง",
      "เกิดการแพร่ของสารอาหารออกจากเซลล์ทันที"
    ],
    hint: "น้ำเคลื่อนที่จากภายนอกเข้าสู่ภายในเซลล์ที่มีความเข้มข้นสูงกว่า",
    exp: "ตอบ <b>น้ำออสโมซิสเข้าสู่เซลล์ทำให้เซลล์เต่งและแตกได้</b> เพราะเซลล์สัตว์ไม่มีผนังเซลล์คอยพยุงโครงสร้าง"
  },
  {
    category: "🌿 การดำรงชีวิตของพืช (Plant Life)",
    sentence: "กระบวนการสังเคราะห์ด้วยแสงของพืชจะให้แก๊สชนิดใดออกมา ซึ่งมีความสำคัญต่อสิ่งมีชีวิตอื่นๆ ในการหายใจ?",
    ans: "แก๊สออกซิเจน (O₂)",
    options: ["แก๊สออกซิเจน (O₂)", "แก๊สคาร์บอนไดออกไซด์ (CO₂)", "แก๊สไนโตรเจน (N₂)", "แก๊สไฮโดรเจน (H₂)"],
    hint: "เป็นผลผลิตพลอยได้ (Byproduct) จากกระบวนการสร้างอาหารของพืช",
    exp: "ตอบ <b>แก๊สออกซิเจน (O₂)</b> ซึ่งพืชปล่อยออกมาทางปากใบหลังกระบวนการสังเคราะห์ด้วยแสง"
  },
  {
    category: "⚛️ โครงสร้างอะตอมเบื้องต้น",
    sentence: "อนุภาคในอะตอมข้อใดที่มีประจุไฟฟ้าเป็นลบ และวิ่งวนอยู่รอบๆ นิวเคลียส?",
    ans: "อิเล็กตรอน (Electron)",
    options: ["อิเล็กตรอน (Electron)", "โปรตอน (Proton)", "นิวตรอน (Neutron)", "นิวเคลียส (Nucleus)"],
    hint: "มีมวลน้อยมากๆ เมื่อเทียบกับโปรตอนหรือนิวตรอน",
    exp: "ตอบ <b>อิเล็กตรอน (Electron)</b> มีประจุไฟฟ้าเป็นลบและโคจรอยู่รอบนิวเคลียส"
  },
  {
    category: "🌿 ท่อลำเลียงของพืช",
    sentence: "หากนักเรียนทำการทดลองตัดก้านขึ้นฉ่ายแช่ในน้ำสีแดง แล้วนำไปส่องกล้องจุลทรรศน์ดูเนื้อเยื่อลำต้น ส่วนใดที่จะติดสีแดงชัดเจนที่สุด?",
    ans: "ไซเล็ม (Xylem)",
    options: ["ไซเล็ม (Xylem)", "โฟลเอ็ม (Phloem)", "คิวติเคิล (Cuticle)", "สตอมาตา (Stomata)"],
    hint: "เป็นเนื้อเยื่อทำหน้าที่ลำเลียงน้ำและแร่ธาตุ",
    exp: "ตอบ <b>ไซเล็ม (Xylem)</b> เพราะทำหน้าที่ลำเลียงน้ำและแร่ธาตุขึ้นสู่ด้านบนของพืช"
  }
];

let currentTerm1Ans = "";
let currentTerm1Exp = "";

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
    generateTerm1Question();
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

function buildTerm1Queue() {
  return shuffle([...term1MasterDatabase]);
}

function generateTerm1Question() {
  if (term1Queue.length === 0) {
    term1Queue = buildTerm1Queue();
  }

  const qData = term1Queue.pop();
  if (!qData) return;

  currentTerm1Ans = qData.ans;
  currentTerm1Exp = qData.exp;

  const badgeEl = document.getElementById('term1-category-badge');
  const qTextEl = document.getElementById('term1-q-text');
  const qHintEl = document.getElementById('term1-q-hint');

  if (badgeEl) badgeEl.innerHTML = `<i class="fa-solid fa-bookmark"></i> ${qData.category}`;
  if (qTextEl) qTextEl.innerText = qData.sentence;
  if (qHintEl) qHintEl.innerText = `คำใบ้: ${qData.hint}`;

  const fbEl = document.getElementById('term1-feedback');
  const nextBtnEl = document.getElementById('term1-next-btn');
  if (fbEl) fbEl.classList.add('hidden');
  if (nextBtnEl) nextBtnEl.classList.add('hidden');

  const container = document.getElementById('term1-options-container');
  if (!container) return;
  container.innerHTML = "";

  const options = shuffle(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkTerm1Answer(opt, btn);
    container.appendChild(btn);
  });
}

function checkTerm1Answer(selected, btn) {
  const isCorrect = selected === currentTerm1Ans;
  document.querySelectorAll('#term1-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentTerm1Ans) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('term1-feedback');
  if (fb) {
    fb.classList.remove('hidden', 'success', 'error');
    fb.classList.add(isCorrect ? 'success' : 'error');
  }

  const titleEl = document.getElementById('term1-fb-title');
  const descEl = document.getElementById('term1-fb-desc');
  if (titleEl) titleEl.innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องยอดเยี่ยม!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  if (descEl) descEl.innerHTML = currentTerm1Exp;

  const nextBtn = document.getElementById('term1-next-btn');
  if (nextBtn) nextBtn.classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  term1Queue = buildTerm1Queue();
};