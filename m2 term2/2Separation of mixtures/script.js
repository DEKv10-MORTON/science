// ==========================================
// SCIMASTER ม.2 เทอม 2 - UNIT 2: SEPARATION ENGINE
// ==========================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let sciSepQueue = [];

// คลังวัตถุดิบโจทย์การแยกสาร วิทยาศาสตร์ ม.2 เทอม 2 (Combinatorial Ingredients)
const sciSepIngredients = [
  {
    sentence: "วิธีการแยกเกลือแกงออกจากน้ำทะเล เพื่อให้ได้เกลือและปล่อยให้น้ำระเหยออกไปทั้งหมด ควรใช้กรรมวิธีใด?",
    ans: "การระเหยแห้ง",
    options: ["การระเหยแห้ง", "การกลั่นอย่างง่าย", "การกรอง", "การตกผลึก"],
    hint: "ให้ความร้อนจนตัวทำละลายที่เป็นของเหลวระเหยแห้งไปจนหมด",
    exp: "ตอบ <b>การระเหยแห้ง</b> เป็นวิธีที่เหมาะสมที่สุดในการทำนาเกลือ โดยต้มน้ำทะเลให้ระเหยไปจนเหลือเกลือแกง"
  },
  {
    sentence: "หากนักเรียนต้องการแยกสารผสมของสีหมึกปากกาเคมีหลายๆ ชนิดออกจากกัน ควรใช้เทคนิควิธีใดเหมาะสมที่สุด?",
    ans: "โครมาทอกราฟี (Chromatography)",
    options: ["โครมาทอกราฟี (Chromatography)", "การกลั่น", "การสกัดด้วยตัวทำละลาย", "การตกผลึก"],
    hint: "อาศัยความสามารถในการละลายและการดูดซับบนกระดาษกรองหรือตัวกลาง",
    exp: "ตอบ <b>โครมาทอกราฟี</b> เป็นเทคนิคการแยกสารผสมที่มีปริมาณน้อยโดยอาศัยอัตราการเคลื่อนที่บนตัวดูดซับ"
  },
  {
    sentence: "การแยกน้ำบริสุทธิ์ออกจากสารละลายคอปเปอร์(II)ซัลเฟต (จุนสี) โดยใช้ความร้อนควบแน่นไอน้ำกลับมา ควรใช้กระบวนการใด?",
    ans: "การกลั่นอย่างง่าย",
    options: ["การกลั่นอย่างง่าย", "การระเหยแห้ง", "การกรอง", "การสกัด"],
    hint: "ต้องการเก็บทั้งตัวทำละลายและตัวละลายไว้ทั้งคู่โดยอาศัยจุดเดือด",
    exp: "ตอบ <b>การกลั่นอย่างง่าย</b> เพราะสามารถเก็บทั้งไอน้ำที่ควบแน่นเป็นน้ำบริสุทธิ์และสารละลายที่เหลือไว้ได้"
  },
  {
    sentence: "การสกัดสารสำคัญหรือน้ำมันหอมระเหยจากพืชสมุนไพรหรือใบเตย นิยมใช้ตัวทำละลายประเภทใดช่วยในการสกัด?",
    ans: "ตัวทำละลายที่เหมาะสมกับสารนั้น เช่น น้ำหรือแอลกอฮอล์",
    options: ["ตัวทำละลายที่เหมาะสมกับสารนั้น เช่น น้ำหรือแอลกอฮอล์", "กรดเข้มข้นเท่านั้น", "น้ำเกลืออิ่มตัว", "ตัวทำละลายอินทรีย์ที่ระเหยยาก"],
    hint: "พิจารณาการละลายของน้ำมันหอมระเหยในตัวทำละลาย",
    exp: "ตอบ <b>ตัวทำละลายที่เหมาะสมกับสารนั้น เช่น น้ำหรือแอลกอฮอล์</b> ใช้หลักการละลายของสารที่ต้องการสกัดออกมา"
  },
  {
    sentence: "กระบวนการทำให้น้ำตาลทรายบริสุทธิ์จากน้ำเชื่อมเข้มข้นโดยการลดอุณหภูมิลงช้าๆ เรียกว่าอะไร?",
    ans: "การตกผลึก",
    options: ["การตกผลึก", "การระเหยแห้ง", "การกรอง", "การสกัดด้วยตัวทำละลาย"],
    hint: "ทำให้สารละลายอิ่มตัวเย็นลงเพื่อให้เกิดเป็นรูปทรงเรขาคณิตของแข็ง",
    exp: "ตอบ <b>การตกผลึก</b> เป็นวิธีแยกของแข็งที่ละลายในของเหลวโดยทำให้สารละลายอิ่มตัวที่อุณหภูมิสูงแล้วปล่อยให้เย็นลง"
  }
];

let currentSciSepAns = "";
let currentSciSepExp = "";

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

// สร้างคิวสุ่มโจทย์การแยกสาร วิทยาศาสตร์ ม.2
function buildSciSepQueue() {
  return shuffle([...sciSepIngredients]);
}

function generateSciSepQuestion() {
  if (sciSepQueue.length === 0) {
    sciSepQueue = buildSciSepQueue();
  }

  const qData = sciSepQueue.pop();
  currentSciSepAns = qData.ans;
  currentSciSepExp = qData.exp;

  document.getElementById('sci-sep-q-text').innerText = qData.sentence;
  document.getElementById('sci-sep-q-hint').innerText = `คำใบ้: ${qData.hint}`;

  document.getElementById('sci-sep-feedback').classList.add('hidden');
  document.getElementById('sci-sep-next-btn').classList.add('hidden');

  const container = document.getElementById('sci-sep-options-container');
  container.innerHTML = "";

  const options = shuffle(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkSciSepAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkSciSepAnswer(selected, btn) {
  const isCorrect = selected === currentSciSepAns;
  document.querySelectorAll('#sci-sep-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentSciSepAns) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('sci-sep-feedback');
  fb.classList.remove('hidden', 'success', 'error');
  fb.classList.add(isCorrect ? 'success' : 'error');

  document.getElementById('sci-sep-fb-title').innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องยอดเยี่ยม!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  document.getElementById('sci-sep-fb-desc').innerHTML = currentSciSepExp;

  document.getElementById('sci-sep-next-btn').classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

// เริ่มต้นระบบเมื่อเปิดหน้าเว็บ
window.onload = function () {
  generateSciSepQuestion();
};