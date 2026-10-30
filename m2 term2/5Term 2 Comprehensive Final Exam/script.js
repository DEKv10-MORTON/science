// ==========================================
// SCIMASTER ม.2 เทอม 2 - COMPREHENSIVE FINAL EXAM ENGINE
// ==========================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let sciT2FinalQueue = [];

// คลังวัตถุดิบรวมข้อสอบปลายภาค วิทยาศาสตร์ ม.2 เทอม 2 ครบทุกหน่วย
const sciComprehensiveTerm2Pool = [
  // 1. งานและพลังงาน
  {
    topic: "งานและพลังงาน",
    q: "วัตถุมวล 2 กิโลกรัม อยู่สูงจากพื้นดิน 5 เมตร จะมีพลังงานศักย์โน้มถ่วงเท่าใด (กำหนดให้ g = 10 m/s²)",
    ans: "100 จูล",
    options: ["100 จูล", "50 จูล", "10 จูล", "200 จูล"],
    hint: "ใช้สูตรคำนวณพลังงานศักย์โน้มถ่วง: E_p = mgh",
    exp: "ตอบ <b>100 จูล</b> คำนวณจากสูตร <b>E<sub>p</sub> = mgh</b> = 2 × 10 × 5 = 100 จูล"
  },
  {
    topic: "งานและพลังงาน",
    q: "รถมวล 1,000 กิโลกรัม กำลังแล่นด้วยอัตราเร็ว 20 เมตรต่อวินาที จะมีพลังงานจลน์เท่าใด?",
    ans: "200,000 จูล",
    options: ["200,000 จูล", "100,000 จูล", "400,000 จูล", "20,000 จูล"],
    hint: "ใช้สูตรคำนวณพลังงานจลน์: E_k = (1/2)mv²",
    exp: "ตอบ <b>200,000 จูล</b> คำนวณจากสูตร <b>E<sub>k</sub> = (1/2)mv²</b> = (1/2) × 1000 × (20)² = 200,000 จูล"
  },
  // 2. การแยกสาร
  {
    topic: "การแยกสาร",
    q: "วิธีการแยกเกลือแกงออกจากน้ำทะเล เพื่อให้ได้เกลือและปล่อยให้น้ำระเหยออกไปทั้งหมด ควรใช้กรรมวิธีใด?",
    ans: "การระเหยแห้ง",
    options: ["การระเหยแห้ง", "การกลั่นอย่างง่าย", "การกรอง", "การตกผลึก"],
    hint: "ให้ความร้อนจนตัวทำละลายที่เป็นของเหลวระเหยแห้งไปจนหมด",
    exp: "ตอบ <b>การระเหยแห้ง</b> เป็นวิธีที่เหมาะสมที่สุดในการทำนาเกลือ โดยต้มน้ำทะเลให้ระเหยไปจนเหลือเกลือแกง"
  },
  {
    topic: "การแยกสาร",
    q: "หากนักเรียนต้องการแยกสารผสมของสีหมึกปากกาเคมีหลายๆ ชนิดออกจากกัน ควรใช้เทคนิควิธีใดเหมาะสมที่สุด?",
    ans: "โครมาทอกราฟี (Chromatography)",
    options: ["โครมาทอกราฟี (Chromatography)", "การกลั่น", "การสกัดด้วยตัวทำละลาย", "การตกผลึก"],
    hint: "อาศัยความสามารถในการละลายและการดูดซับบนกระดาษกรองหรือตัวกลาง",
    exp: "ตอบ <b>โครมาทอกราฟี</b> เป็นเทคนิคการแยกสารผสมที่มีปริมาณน้อยโดยอาศัยอัตราการเคลื่อนที่บนตัวดูดซับ"
  },
  // 3. โลกและการเปลี่ยนแปลง
  {
    topic: "โลกและการเปลี่ยนแปลง",
    q: "ชั้นโครงสร้างภายในโลกชั้นใดที่มีสถานะเป็นของเหลวและประกอบด้วยธาตุเหล็กกับนิกเกิลหลอมเหลว?",
    ans: "แก่นโลกชั้นนอก (Outer Core)",
    options: ["แก่นโลกชั้นนอก (Outer Core)", "แก่นโลกชั้นใน (Inner Core)", "เนื้อโลกชั้นบน", "เปลือกโลกมหาสมุทร"],
    hint: "อยู่ถัดจากเนื้อโลกเข้าไปและเป็นของเหลว ซึ่งทำให้เกิดสนามแม่เหล็กโลก",
    exp: "ตอบ <b>แก่นโลกชั้นนอก (Outer Core)</b> มีสถานะเป็นของเหลวไหลวนอยู่รอบแก่นโลกชั้นในที่เป็นของแข็ง"
  },
  {
    topic: "โลกและการเปลี่ยนแปลง",
    q: "ชั้นดินในข้อใดที่มีการสะสมของอินทรียวัตถุหรือซากพืชซากสัตว์เน่าเปื่อยสะสมอยู่หนาแน่นที่สุด (ชั้นหน้าดิน)?",
    ans: "ชั้นดิน A (Topsoil)",
    options: ["ชั้นดิน A (Topsoil)", "ชั้นดิน C", "ชั้นหินพื้น (R)", "ชั้นดิน B"],
    hint: "เป็นชั้นบนสุดที่มีสีคล้ำเพราะมีฮิวมัสและอินทรียวัตถุมาก เหมาะแก่การเพาะปลูก",
    exp: "ตอบ <b>ชั้นดิน A (Topsoil)</b> เป็นชั้นหน้าดินที่มีอินทรียวัตถุและฮิวมัสสะสมอยู่มากที่สุด มีสีคล้ำและอุดมสมบูรณ์"
  },
  // 4. ทรัพยากรพลังงานและภัยธรรมชาติ
  {
    topic: "ทรัพยากรพลังงานและภัยธรรมชาติ",
    q: "แหล่งพลังงานในข้อใดจัดเป็น 'พลังงานหมุนเวียน (Renewable Energy)' ที่สามารถนำกลับมาใช้ใหม่ได้ไม่หมดสิ้น?",
    ans: "พลังงานแสงอาทิตย์และพลังงานลม",
    options: ["พลังงานแสงอาทิตย์และพลังงานลม", "ถ่านหินและน้ำมันดิบ", "ก๊าซธรรมชาติ", "พลังงานนิวเคลียร์จากยูเรเนียม"],
    hint: "เป็นพลังงานธรรมชาติที่ได้จากแสงแดด กระแสลม หรือสายน้ำที่ไม่จำกัด",
    exp: "ตอบ <b>พลังงานแสงอาทิตย์และพลังงานลม</b> จัดเป็นพลังงานหมุนเวียนที่มีความสะอาดยั่งยืนและไม่หมดไป"
  },
  {
    topic: "ทรัพยากรพลังงานและภัยธรรมชาติ",
    q: "ปรากฏการณ์ 'สึนามิ' ที่ซัดเข้าสู่ชายฝั่งด้วยความเร็วสูง มักมีสาเหตุเริ่มต้นมาจากเหตุการณ์ใดในทะเล?",
    ans: "แผ่นดินไหวรุนแรงใต้พื้นท้องมหาสมุทร",
    options: ["แผ่นดินไหวรุนแรงใต้พื้นท้องมหาสมุทร", "พายุดีเปรสชันก่อตัวกลางทะเล", "น้ำขึ้นน้ำลงสูงสุดตามแรงดึงดูดของดวงจันทร์", "การระเบิดของคลื่นความร้อนในบรรยากาศ"],
    hint: "เกิดการยุบหรือยกตัวของแผ่นเปลือกโลกใต้ทะเลลึก",
    exp: "ตอบ <b>แผ่นดินไหวรุนแรงใต้พื้นท้องมหาสมุทร</b> ทำให้มวลน้ำปริมาณมหาศาลเคลื่อนตัวกลายเป็นคลื่นยักษ์สึนามิ"
  }
];

let currentSciT2FinalAns = "";
let currentSciT2FinalExp = "";

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

function buildSciT2FinalQueue() {
  return shuffle([...sciComprehensiveTerm2Pool]);
}

function generateSciT2FinalQuestion() {
  if (sciT2FinalQueue.length === 0) {
    sciT2FinalQueue = buildSciT2FinalQueue();
  }

  const qData = sciT2FinalQueue.pop();
  currentSciT2FinalAns = qData.ans;
  currentSciT2FinalExp = qData.exp;

  document.getElementById('exam-topic-badge').innerHTML = `<i class="fa-solid fa-cubes"></i> ${qData.topic}`;
  document.getElementById('final-q-text').innerText = qData.q;
  document.getElementById('final-q-hint').innerText = `คำใบ้: ${qData.hint}`;

  document.getElementById('final-feedback').classList.add('hidden');
  document.getElementById('final-next-btn').classList.add('hidden');

  const container = document.getElementById('final-options-container');
  container.innerHTML = "";

  const options = shuffle(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkSciT2FinalAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkSciT2FinalAnswer(selected, btn) {
  const isCorrect = selected === currentSciT2FinalAns;
  document.querySelectorAll('#final-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentSciT2FinalAns) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('final-feedback');
  fb.classList.remove('hidden', 'success', 'error');
  fb.classList.add(isCorrect ? 'success' : 'error');

  document.getElementById('final-fb-title').innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องแม่นยำ!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  document.getElementById('final-fb-desc').innerHTML = currentSciT2FinalExp;

  document.getElementById('final-next-btn').classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  generateSciT2FinalQuestion();
};