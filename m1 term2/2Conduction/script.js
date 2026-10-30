// ===================================================
// SCIMASTER - HEAT TRANSFER (การถ่ายโอนความร้อน) ENGINE
// ===================================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let transferQueue = [];

const transferMasterDatabase = [
  {
    category: "🔥 การนำความร้อน (Conduction)",
    sentence: "เมื่อใช้ช้อนโลหะคนน้ำแกงร้อนๆ สักครู่จะรู้สึกร้อนมือ เหตุการณ์นี้เป็นการถ่ายโอนความร้อนด้วยวิธีใด?",
    ans: "การนำความร้อน (Conduction)",
    options: [
      "การนำความร้อน (Conduction)",
      "การพาความร้อน (Convection)",
      "การแผ่รังสีความร้อน (Radiation)",
      "การคายความร้อนอิสระ"
    ],
    hint: "ความร้อนส่งผ่านเนื้อโลหะจากปลายด้านหนึ่งไปยังอีกด้านโดยที่ตัวกลางไม่เคลื่อนที่",
    exp: "ตอบ <b>การนำความร้อน (Conduction)</b> เป็นการถ่ายโอนความร้อนผ่านตัวกลางที่เป็นของแข็ง"
  },
  {
    category: "🌪️ การพาความร้อน (Convection)",
    sentence: "ปรากฏการณ์การเกิด 'ลมบก' และ 'ลมทะเล' เกิดจากการถ่ายโอนความร้อนด้วยวิธีใดเป็นหลัก?",
    ans: "การพาความร้อน (Convection)",
    options: [
      "การพาความร้อน (Convection)",
      "การนำความร้อน (Conduction)",
      "การแผ่รังสีความร้อน (Radiation)",
      "การสะท้อนความร้อน"
    ],
    hint: "เกี่ยวข้องกับการเคลื่อนที่ของมวลอากาศร้อนลอยตัวสูงขึ้นและอากาศเย็นเข้ามาแทนที่",
    exp: "ตอบ <b>การพาความร้อน (Convection)</b> อาศัยการเคลื่อนที่ของตัวกลางที่เป็นของเหลวหรือแก๊ส"
  },
  {
    category: "☀️ การแผ่รังสีความร้อน (Radiation)",
    sentence: "ความร้อนจากดวงอาทิตย์เดินทางผ่านอวกาศที่ว่างเปล่ามายังโลกได้ด้วยกระบวนการในข้อใด?",
    ans: "การแผ่รังสีความร้อน (Radiation)",
    options: [
      "การแผ่รังสีความร้อน (Radiation)",
      "การนำความร้อน (Conduction)",
      "การพาความร้อน (Convection)",
      "การหักเหความร้อน"
    ],
    hint: "เป็นวิธีเดียวที่ไม่ต้องอาศัยตัวกลางในการส่งผ่านความร้อน",
    exp: "ตอบ <b>การแผ่รังสีความร้อน (Radiation)</b> เป็นการส่งพลังงานในรูปคลื่นแม่เหล็กไฟฟ้าโดยไม่ต้องมีตัวกลาง"
  },
  {
    category: "⚖️ สมดุลความร้อน",
    sentence: "เมื่อนำน้ำอุณหภูมิ 80 °C มวลเท่ากับน้ำอุณหภูมิ 20 °C มาผสมกัน จะเกิดผลอย่างไรเมื่อเข้าสู่สมดุลความร้อน?",
    ans: "อุณหภูมิผสมจะมีค่าประมาณ 50 °C",
    options: [
      "อุณหภูมิผสมจะมีค่าประมาณ 50 °C",
      "อุณหภูมิผสมจะอยู่ที่ 80 °C เท่ากับน้ำร้อน",
      "อุณหภูมิผสมจะลดลงเหลือ 20 °C เท่ากับน้ำเย็น",
      "น้ำทั้งสองส่วนจะไม่ยอมถ่ายโอนความร้อนให้กัน"
    ],
    hint: "ใช้หลักการความร้อนที่สสารสูญเสียเท่ากับความร้อนที่สสารได้รับ (Q_lost = Q_gain)",
    exp: "ตอบ <b>อุณหภูมิผสมจะมีค่าประมาณ 50 °C</b> เนื่องจากมวลเท่ากัน อุณหภูมิจะเฉลี่ยอยู่ตรงกลางพอดี"
  },
  {
    category: "🌡️ การนำความร้อนไปใช้ประโยชน์",
    sentence: "เพราะเหตุใดด้ามจับของภาชนะทำอาหาร เช่น หม้อหรือกระทะ จึงนิยมทำด้วยไม้หรือพลาสติกทนความร้อน?",
    ans: "เพราะไม้และพลาสติกเป็นตัวนำความร้อนที่ไม่ดี (ฉนวนความร้อน)",
    options: [
      "เพราะไม้และพลาสติกเป็นตัวนำความร้อนที่ไม่ดี (ฉนวนความร้อน)",
      "เพราะช่วยให้ความร้อนกระจายเข้าสู่ตัวอาหารได้เร็วขึ้น",
      "เพราะทำให้กระทะมีน้ำหนักเบาและดูสวยงาม",
      "เพราะไม้และพลาสติกดูดกลืนรังสีความร้อนได้ดีที่สุด"
    ],
    hint: "วัสดุเหล่านี้ช่วยป้องกันไม่ให้ความร้อนจากตัวหม้อส่งผ่านลามมาโดื้อมือเรา",
    exp: "ตอบ <b>เพราะไม้และพลาสติกเป็นตัวนำความร้อนที่ไม่ดี</b> ทำหน้าที่เป็นฉนวนป้องกันไม่ให้ความร้อนมาสัมผัสมือโดยตรง"
  }
];

let currentTransferAns = "";
let currentTransferExp = "";

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
    generateTransferQuestion();
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

function buildTransferQueue() {
  return shuffle([...transferMasterDatabase]);
}

function generateTransferQuestion() {
  if (transferQueue.length === 0) {
    transferQueue = buildTransferQueue();
  }

  const qData = transferQueue.pop();
  if (!qData) return;

  currentTransferAns = qData.ans;
  currentTransferExp = qData.exp;

  const badgeEl = document.getElementById('transfer-category-badge');
  const qTextEl = document.getElementById('transfer-q-text');
  const qHintEl = document.getElementById('transfer-q-hint');

  if (badgeEl) badgeEl.innerHTML = `<i class="fa-solid fa-bookmark"></i> ${qData.category}`;
  if (qTextEl) qTextEl.innerText = qData.sentence;
  if (qHintEl) qHintEl.innerText = `คำใบ้: ${qData.hint}`;

  const fbEl = document.getElementById('transfer-feedback');
  const nextBtnEl = document.getElementById('transfer-next-btn');
  if (fbEl) fbEl.classList.add('hidden');
  if (nextBtnEl) nextBtnEl.classList.add('hidden');

  const container = document.getElementById('transfer-options-container');
  if (!container) return;
  container.innerHTML = "";

  const options = shuffle(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkTransferAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkTransferAnswer(selected, btn) {
  const isCorrect = selected === currentTransferAns;
  document.querySelectorAll('#transfer-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentTransferAns) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('transfer-feedback');
  if (fb) {
    fb.classList.remove('hidden', 'success', 'error');
    fb.classList.add(isCorrect ? 'success' : 'error');
  }

  const titleEl = document.getElementById('transfer-fb-title');
  const descEl = document.getElementById('transfer-fb-desc');
  if (titleEl) titleEl.innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องยอดเยี่ยม!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  if (descEl) descEl.innerHTML = currentTransferExp;

  const nextBtn = document.getElementById('transfer-next-btn');
  if (nextBtn) nextBtn.classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  transferQueue = buildTransferQueue();
};