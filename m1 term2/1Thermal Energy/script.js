// ===================================================
// SCIMASTER - HEAT ENERGY (พลังงานความร้อน) ENGINE
// ===================================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let heatQueue = [];

const heatMasterDatabase = [
  {
    category: "🌡️ อุณหภูมิและการวัด",
    sentence: "ข้อใดกล่าวถึงความแตกต่างระหว่าง 'ความร้อน (Heat)' กับ 'อุณหภูมิ (Temperature)' ได้ถูกต้องที่สุด?",
    ans: "ความร้อนคือพลังงานความร้อนที่ถ่ายโอนระหว่างวัตถุ แต่อุณหภูมิคือระดับความร้อนของวัตถุ",
    options: [
      "ความร้อนคือพลังงานความร้อนที่ถ่ายโอนระหว่างวัตถุ แต่อุณหภูมิคือระดับความร้อนของวัตถุ",
      "ความร้อนและอุณหภูมิคือปริมาณทางฟิสิกส์ชนิดเดียวกันแต่ใช้คนละหน่วย",
      "อุณหภูมิมีหน่วยเป็นจูล ส่วนความร้อนมีหน่วยเป็นองศาเซลเซียส",
      "วัตถุที่มีขนาดใหญ่กว่าจะมีอุณหภูมิสูงกว่าเสมอ"
    ],
    hint: "ความร้อนเป็นการถ่ายโอนพลังงาน ส่วนอุณหภูมิบอกระดับความหนาแน่นหรือพลังงานจลน์เฉลี่ย",
    exp: "ตอบ <b>ความร้อนคือพลังงานความร้อนที่ถ่ายโอนระหว่างวัตถุ แต่อุณหภูมิคือระดับความร้อนของวัตถุ</b>"
  },
  {
    category: "📏 การขยายตัวและหดตัวของสาร",
    sentence: "เพราะเหตุใดในการสร้างรางรถไฟจึงต้องเว้นระยะห่างระหว่างรอยต่อของรางรถไฟเล็กน้อย?",
    ans: "ป้องกันไม่ให้รางรถไฟคดงอหรือเสียหายเมื่อเหล็กขยายตัวในวันที่อากาศร้อน",
    options: [
      "ป้องกันไม่ให้รางรถไฟคดงอหรือเสียหายเมื่อเหล็กขยายตัวในวันที่อากาศร้อน",
      "เพื่อให้รถไฟวิ่งผ่านได้นิ่มนวลและลดเสียงดัง",
      "ช่วยระบายน้ำฝนไม่ให้ขังบนรางรถไฟ",
      "ป้องกันการเกิดสนิมจากความชื้นในอากาศ"
    ],
    hint: "โลหะเมื่อได้รับความร้อนจะเกิดการเปลี่ยนแปลงอย่างไร?",
    exp: "ตอบ <b>ป้องกันไม่ให้รางรถไฟคดงอหรือเสียหายเมื่อเหล็กขยายตัวในวันที่อากาศร้อน</b>[cite: 11] เนื่องจากของแข็งจะขยายตัวเมื่อได้รับความร้อน"
  },
  {
    category: "❄️ การเปลี่ยนแปลงสถานะ",
    sentence: "ในขณะที่น้ำแข็งกำลังหลอมเหลวกลายเป็นน้ำ อุณหภูมิของน้ำแข็งในช่วงเวลานั้นจะมีการเปลี่ยนแปลงอย่างไร?",
    ans: "อุณหภูมิจะคงที่ตลอดเวลาจนกว่าน้ำแข็งจะหลอมเหลวหมดทุกก้อน",
    options: [
      "อุณหภูมิจะคงที่ตลอดเวลาจนกว่าน้ำแข็งจะหลอมเหลวหมดทุกก้อน",
      "อุณหภูมิจะค่อยๆ สูงขึ้นเรื่อยๆ ทันทีที่ได้รับความร้อน",
      "อุณหภูมิจะลดลงอย่างรวดเร็วจนติดลบ",
      "อุณหภูมิจะพุ่งสูงขึ้นถึง 100 องศาเซลเซียสทันที"
    ],
    hint: "สังเกตพฤติกรรมอุณหภูมิของสารขณะกำลังเปลี่ยนสถานะ",
    exp: "ตอบ <b>อุณหภูมิจะคงที่ตลอดเวลาจนกว่าน้ำแข็งจะหลอมเหลวหมด</b> เนื่องจากความร้อนที่ให้ไปถูกใช้เป็นพลังงานแฝงในการเปลี่ยนสถานะ[cite: 11]"
  },
  {
    category: "🌡️ การถ่ายโอนความร้อน",
    sentence: "กระบวนการเปลี่ยนสถานะจาก 'แก๊สกลายเป็นของเหลว' เรียกว่าอะไร และต้องได้รับหรือสูญเสียความร้อน?",
    ans: "เรียกว่า การควบแน่น (Condensation) และเป็นการสูญเสียความร้อน",
    options: [
      "เรียกว่า การควบแน่น (Condensation) และเป็นการสูญเสียความร้อน",
      "เรียกว่า การระเหย (Evaporation) และเป็นการได้รับความร้อน",
      "เรียกว่า การหลอมเหลว (Melting) และเป็นการสูญเสียความร้อน",
      "เรียกว่า การระเหิด (Sublimation) และเป็นการได้รับความร้อน"
    ],
    hint: "ตัวอย่างเช่น การเกิดหยดน้ำบนผิวกระป๋องน้ำเย็น",
    exp: "ตอบ <b>เรียกว่า การควบแน่น และเป็นการสูญเสียความร้อน</b>[cite: 11] ทำให้โมเลกุลเกาะตัวกันแน่นขึ้นจนกล the เป็นของเหลว"
  },
  {
    category: "🌡️ อุณหภูมิและการวัด",
    sentence: "หากวัดอุณหภูมิของอากาศได้ 30 องศาเซลเซียส อุณหภูมินี้จะมีค่าเท่ากับกี่องศาฟาเรนไฮต์ (°F)?",
    ans: "86 องศาฟาเรนไฮต์",
    options: ["86 องศาฟาเรนไฮต์", "54 องศาฟาเรนไฮต์", "72 องศาฟาเรนไฮต์", "95 องศาฟาเรนไฮต์"],
    hint: "ใช้สูตรการแปลงหน่วย: F = (9/5)C + 32",
    exp: "ตอบ <b>86 องศาฟาเรนไฮต์</b> คำนวณจาก (9/5 × 30) + 32 = 54 + 32 = 86 °F"
  }
];

let currentHeatAns = "";
let currentHeatExp = "";

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
    generateHeatQuestion();
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

function buildHeatQueue() {
  return shuffle([...heatMasterDatabase]);
}

function generateHeatQuestion() {
  if (heatQueue.length === 0) {
    heatQueue = buildHeatQueue();
  }

  const qData = heatQueue.pop();
  if (!qData) return;

  currentHeatAns = qData.ans;
  currentHeatExp = qData.exp;

  const badgeEl = document.getElementById('heat-category-badge');
  const qTextEl = document.getElementById('heat-q-text');
  const qHintEl = document.getElementById('heat-q-hint');

  if (badgeEl) badgeEl.innerHTML = `<i class="fa-solid fa-bookmark"></i> ${qData.category}`;
  if (qTextEl) qTextEl.innerText = qData.sentence;
  if (qHintEl) qHintEl.innerText = `คำใบ้: ${qData.hint}`;

  const fbEl = document.getElementById('heat-feedback');
  const nextBtnEl = document.getElementById('heat-next-btn');
  if (fbEl) fbEl.classList.add('hidden');
  if (nextBtnEl) nextBtnEl.classList.add('hidden');

  const container = document.getElementById('heat-options-container');
  if (!container) return;
  container.innerHTML = "";

  const options = shuffle(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkHeatAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkHeatAnswer(selected, btn) {
  const isCorrect = selected === currentHeatAns;
  document.querySelectorAll('#heat-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentHeatAns) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('heat-feedback');
  if (fb) {
    fb.classList.remove('hidden', 'success', 'error');
    fb.classList.add(isCorrect ? 'success' : 'error');
  }

  const titleEl = document.getElementById('heat-fb-title');
  const descEl = document.getElementById('heat-fb-desc');
  if (titleEl) titleEl.innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องยอดเยี่ยม!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  if (descEl) descEl.innerHTML = currentHeatExp;

  const nextBtn = document.getElementById('heat-next-btn');
  if (nextBtn) nextBtn.classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  heatQueue = buildHeatQueue();
};