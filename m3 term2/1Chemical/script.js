// ==========================================
// SCIMASTER ม.3 เทอม 2 - UNIT 4: CHEMISTRY ENGINE
// ==========================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let sciChemQueue = [];

const sciChemIngredients = [
  {
    sentence: "ปฏิกิริยาเคมีในข้อใดจัดเป็น 'ปฏิกิริยาคายความร้อน (Exothermic reaction)'?",
    ans: "การเผาไหม้เชื้อเพลิงและการระเบิด",
    options: [
      "การเผาไหม้เชื้อเพลิงและการระเบิด",
      "การละลายของแอมโมเนียมไนเตรตในน้ำ",
      "การสังเคราะห์ด้วยแสงของพืช",
      "การระเหยของน้ำ"
    ],
    hint: "สังเกตเหตุการณ์ที่ทำให้สิ่งแวดล้อมรอบข้างมีอุณหภูมิสูงขึ้นหรือปล่อยพลังงานออกมา",
    exp: "ตอบ <b>การเผาไหม้เชื้อเพลิงและการระเบิด</b> เป็นปฏิกิริยาที่คายความร้อนออกมาสู่สิ่งแวดล้อม"
  },
  {
    sentence: "ตามกฎทรงมวล (Law of Conservation of Mass) มวลรวมของสารตั้งต้นก่อนเกิดปฏิกิริยาเคมีจะมีค่าอย่างไรเทียบกับมวลของผลิตภัณฑ์?",
    ans: "เท่ากันเสมอในระบบปิด",
    options: [
      "เท่ากันเสมอในระบบปิด",
      "มีค่ามากกว่ามวลของผลิตภัณฑ์เสมอ",
      "มีค่าน้อยกว่ามวลของผลิตภัณฑ์เสมอ",
      "ไม่สามารถสรุปแน่ชัดได้"
    ],
    hint: "อะตอมไม่สูญหายและไม่ถูกสร้างขึ้นใหม่ แต่เกิดการจัดเรียงตัวใหม่",
    exp: "ตอบ <b>เท่ากันเสมอในระบบปิด</b> ตามกฎทรงมวลของอองตวน ลาวัวซิเยร์"
  },
  {
    sentence: "พลาสติกชนิดใดที่เมื่อได้รับความร้อนจะอ่อนตัวและสามารถนำกลับมาหลอมขึ้นรูปใหม่ได้หลายครั้ง (Thermoplastic)?",
    ans: "พลาสติกประเภท PE, PP และ PVC",
    options: [
      "พลาสติกประเภท PE, PP และ PVC",
      "พลาสติกเมลามีนและเบกาไลต์",
      "ยางยอยรีดข้ามขั้นตอน",
      "เรซินอบแห้งถาวร"
    ],
    hint: "โครงสร้างโมเลกุลเป็นแบบโซ่ตรงหรือโซ่กิ่ง ไม่เชื่อมโยงร่างแห",
    exp: "ตอบ <b>พลาสติกประเภท PE, PP และ PVC</b> เป็นเทอร์โมพลาสติกที่หลอมและขึ้นรูปซ้ำได้"
  },
  {
    sentence: "สารละลายที่มีค่า pH เท่ากับ 11 จัดเป็นสารประเภทใด และมีสมบัติต่อกระดาษลิตมัสอย่างไร?",
    ans: "เป็นเบส และเปลี่ยนสีกระดาษลิตมัสจากสีแดงเป็นสีน้ำเงิน",
    options: [
      "เป็นเบส และเปลี่ยนสีกระดาษลิตมัสจากสีแดงเป็นสีน้ำเงิน",
      "เป็นกรด และเปลี่ยนสีกระดาษลิตมัสจากสีน้ำเงินเป็นสีแดง",
      "เป็นกลาง และไม่เปลี่ยนสีกระดาษลิตมัส",
      "เป็นเกลือแกงบริสุทธิ์"
    ],
    hint: "ค่า pH มากกว่า 7 คือเบส (Alkaline)",
    exp: "ตอบ <b>เป็นเบส และเปลี่ยนสีกระดาษลิตมัสจากสีแดงเป็นสีน้ำเงิน</b> (pH > 7)"
  },
  {
    sentence: "ปัจจัยในข้อใดที่จะช่วย 'เพิ่มอัตราการเกิดปฏิกิริยาเคมี' ระหว่างกรดกับโลหะสังกะสีได้ดีที่สุด?",
    ans: "การใช้สังกะสีชนิดผงละเอียดแทนแผ่นสังกะสีชิ้นใหญ่ และเพิ่มความเข้มข้นของกรด",
    options: [
      "การใช้สังกะสีชนิดผงละเอียดแทนแผ่นสังกะสีชิ้นใหญ่ และเพิ่มความเข้มข้นของกรด",
      "การเก็บสารไว้ในที่มืดและอุณหภูมิต่ำ",
      "การลดพื้นที่ผิวของสารตั้งต้น",
      "การเจือจางกรดให้มีความเข้มข้นลดลงมากๆ"
    ],
    hint: "พื้นที่ผิวสัมผัสที่มากขึ้นและอุณหภูมิที่สูงขึ้นช่วยเร่งปฏิกิริยา",
    exp: "ตอบ <b>การใช้สังกะสีชนิดผงละเอียดแทนแผ่นสังกะสีชิ้นใหญ่ และเพิ่มความเข้มข้นของกรด</b> เพราะเพิ่มพื้นที่ผิวและโอกาสชนกันของอนุภาค"
  }
];

let currentSciChemAns = "";
let currentSciChemExp = "";

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

function buildSciChemQueue() {
  return shuffle([...sciChemIngredients]);
}

function generateSciChemQuestion() {
  if (sciChemQueue.length === 0) {
    sciChemQueue = buildSciChemQueue();
  }

  const qData = sciChemQueue.pop();
  currentSciChemAns = qData.ans;
  currentSciChemExp = qData.exp;

  document.getElementById('sci-chem-q-text').innerText = qData.sentence;
  document.getElementById('sci-chem-q-hint').innerText = `คำใบ้: ${qData.hint}`;

  document.getElementById('sci-chem-feedback').classList.add('hidden');
  document.getElementById('sci-chem-next-btn').classList.add('hidden');

  const container = document.getElementById('sci-chem-options-container');
  container.innerHTML = "";

  const options = shuffle(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkSciChemAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkSciChemAnswer(selected, btn) {
  const isCorrect = selected === currentSciChemAns;
  document.querySelectorAll('#sci-chem-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentSciChemAns) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('sci-chem-feedback');
  fb.classList.remove('hidden', 'success', 'error');
  fb.classList.add(isCorrect ? 'success' : 'error');

  document.getElementById('sci-chem-fb-title').innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องยอดเยี่ยม!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  document.getElementById('sci-chem-fb-desc').innerHTML = currentSciChemExp;

  document.getElementById('sci-chem-next-btn').classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  generateSciChemQuestion();
};