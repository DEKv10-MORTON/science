// ==========================================
// SCIMASTER ม.3 เทอม 1 - UNIT 1: GENETICS ENGINE
// ==========================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let sciGenQueue = [];

// คลังวัตถุดิบโจทย์พันธุศาสตร์ วิทยาศาสตร์ ม.3 เทอม 1
const sciGenIngredients = [
  {
    sentence: "มนุษย์ปกติมีจำนวนโครโมโซมในเซลล์ร่างกาย (Somatic cell) ทั้งหมดกี่แท่ง และแบ่งเป็นโครโมโซมเพศกี่คู่?",
    ans: "46 แท่ง และโครโมโซมเพศ 1 คู่",
    options: ["46 แท่ง และโครโมโซมเพศ 1 คู่", "23 แท่ง และโครโมโซมเพศ 2 คู่", "48 แท่ง และโครโมโซมเพศ 1 คู่", "46 แท่ง และโครโมโซมเพศ 23 คู่"],
    hint: "เซลล์ร่างกายมี 23 คู่ รวมเป็น 46 แท่ง โดยเป็นออโตโซม 22 คู่ และเพศ 1 คู่",
    exp: "ตอบ <b>46 แท่ง และโครโมโซมเพศ 1 คู่</b> (ผู้หญิง XX, ผู้ชาย XY) ส่วนเซลล์สืบพันธุ์จะมีครึ่งหนึ่งคือ 23 แท่ง"
  },
  {
    sentence: "กระบวนการแบ่งเซลล์ในข้อใด ที่ทำให้เกิดเซลล์สืบพันธุ์ที่มีจำนวนโครโมโซมลดลงเหลือครึ่งหนึ่ง (n)?",
    ans: "การแบ่งเซลล์แบบไมโอซิส (Meiosis)",
    options: ["การแบ่งเซลล์แบบไมโอซิส (Meiosis)", "การแบ่งเซลล์แบบไมโตซิส (Mitosis)", "การแบ่งเซลล์แบบคานารี", "การสังเคราะห์ด้วยแสง"],
    hint: "เป็นการแบ่งเซลล์เพื่อสร้างอสุจิและไข่ ลดจำนวนโครโมโซมลงครึ่งหนึ่ง",
    exp: "ตอบ <b>การแบ่งเซลล์แบบไมโอซิส (Meiosis)</b> ช่วยรักษาจำนวนโครโมโซมคงที่ในแต่ละรุ่นของการสืบพันธุ์แบบอาศัยเพศ"
  },
  {
    sentence: "ลักษณะทางพันธุกรรมที่ถูกควบคุมด้วยแอลลีลด้อย จะปรากฏลักษณะให้เห็นภายนอก (ฟีโนไทป์) ได้ภายใต้เงื่อนไขใด?",
    ans: "เมื่อมีจีโนไทป์เป็นฮอร์โมไซกัสส์ดื้อ (มียีนด้อยทั้งคู่ เช่น tt)",
    options: [
      "เมื่อมีจีโนไทป์เป็นฮอร์โมไซกัสส์ดื้อ (มียีนด้อยทั้งคู่ เช่น tt)",
      "เมื่อมีจีโนไทป์เป็นเฮเทอโรไซกัสส์ (Tt)",
      "เมื่อมีแอลลีลเด่นข่มอยู่เสมอ",
      "ปรากฏได้ในทุกกรณีที่มียีนด้อยผสมอยู่"
    ],
    hint: "ยีนด้อยจะแสดงออกก็ต่อเมื่อไม่มีแอลลีลเด่นมาข่ม (ต้องเป็นยีนด้อยแท้)",
    exp: "ตอบ <b>เมื่อมีจีโนไทป์เป็นฮอร์โมไซกัสส์ดื้อ (มียีนด้อยทั้งคู่ เช่น tt)</b> หากมีแอลลีลเด่น (T) อยู่ด้วย ยีนเด่นจะข่มทันที"
  },
  {
    sentence: "ความผิดปกติทางพันธุกรรมในข้อใด ที่เกิดจากจำนวนโครโมโซมคู่ที่ 21 เกินมา 1 แท่ง (Trisomy 21)?",
    ans: "กลุ่มอาการดาวน์ (Down syndrome)",
    options: ["กลุ่มอาการดาวน์ (Down syndrome)", "กลุ่มอาการไคลน์เฟลเตอร์", "โรคตาบอดสี", "โรคฮีโมฟีเลีย"],
    hint: "มีลักษณะหน้าตาเฉพาะตัว มีภาวะบกพร่องทางปัญญา เกิดจากความผิดพลาดตอนไมโอซิส",
    exp: "ตอบ <b>กลุ่มอาการดาวน์ (Down syndrome)</b> เกิดจากโครโมโซมคู่ที่ 21 เกินมา 1 แท่ง รวมเป็น 47 แท่ง"
  },
  {
    sentence: "ข้อใดคือความหมายที่ถูกต้องที่สุดของคำว่า 'ฟีโนไทป์ (Phenotype)'?",
    ans: "ลักษณะที่ปรากฏให้เห็นภายนอกของสิ่งมีชีวิต ซึ่งเกิดจากยีนและสิ่งแวดล้อม",
    options: [
      "ลักษณะที่ปรากฏให้เห็นภายนอกของสิ่งมีชีวิต ซึ่งเกิดจากยีนและสิ่งแวดล้อม",
      "รูปแบบของคู่ยีนที่อยู่ภายในเซลล์",
      "สารเคมีชนิดพิเศษที่อยู่บนสาย DNA",
      "อัตราส่วนของลูกหลานในรุ่น F2"
    ],
    hint: "มองเห็นได้ด้วยตาเปล่า เช่น สีตา ความสูง หมู่เลือด",
    exp: "ตอบ <b>ลักษณะที่ปรากฏให้เห็นภายนอกของสิ่งมีชีวิต ซึ่งเกิดจากยีนและสิ่งแวดล้อม</b> ต่างจากจีโนไทป์ที่เป็นรูปแบบยีนภายใน"
  }
];

let currentSciGenAns = "";
let currentSciGenExp = "";

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

function buildSciGenQueue() {
  return shuffle([...sciGenIngredients]);
}

function generateSciGenQuestion() {
  if (sciGenQueue.length === 0) {
    sciGenQueue = buildSciGenQueue();
  }

  const qData = sciGenQueue.pop();
  currentSciGenAns = qData.ans;
  currentSciGenExp = qData.exp;

  document.getElementById('sci-gen-q-text').innerText = qData.sentence;
  document.getElementById('sci-gen-q-hint').innerText = `คำใบ้: ${qData.hint}`;

  document.getElementById('sci-gen-feedback').classList.add('hidden');
  document.getElementById('sci-gen-next-btn').classList.add('hidden');

  const container = document.getElementById('sci-gen-options-container');
  container.innerHTML = "";

  const options = shuffle(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkSciGenAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkSciGenAnswer(selected, btn) {
  const isCorrect = selected === currentSciGenAns;
  document.querySelectorAll('#sci-gen-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentSciGenAns) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('sci-gen-feedback');
  fb.classList.remove('hidden', 'success', 'error');
  fb.classList.add(isCorrect ? 'success' : 'error');

  document.getElementById('sci-gen-fb-title').innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องยอดเยี่ยม!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  document.getElementById('sci-gen-fb-desc').innerHTML = currentSciGenExp;

  document.getElementById('sci-gen-next-btn').classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  generateSciGenQuestion();
};