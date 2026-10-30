// ===================================================
// SCIMASTER - WEATHER AROUND US (ลมฟ้าอากาศรอบตัว) ENGINE
// ===================================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let weatherQueue = [];

const weatherMasterDatabase = [
  {
    category: "🌍 ชั้นบรรยากาศของโลก",
    sentence: "ชั้นบรรยากาศของโลกในข้อใด ที่มีความสำคัญต่อสิ่งมีชีวิตมากที่สุด เนื่องจากเป็นชั้นที่เกิดปรากฏการณ์ลมฟ้าอากาศ เมฆ ฝน และพายุ?",
    ans: "โทรโปสเฟียร์ (Troposphere)",
    options: [
      "โทรโปสเฟียร์ (Troposphere)",
      "สตราโตสเฟียร์ (Stratosphere)",
      "มีโซสเฟียร์ (Mesosphere)",
      "เทอร์โมสเฟียร์ (Thermosphere)"
    ],
    hint: "เป็นชั้นบรรยากาศที่อยู่ใกล้ผิวโลกมากที่สุด (ระดับความสูงประมาณ 0-12 กม.)",
    exp: "ตอบ <b>โทรโปสเฟียร์ (Troposphere)</b> เป็นชั้นบรรยากาศที่มีไอน้ำและสภาพอากาศเกิดขึ้นหนาแน่นที่สุด"
  },
  {
    category: "🌤️ ชั้นบรรยากาศและโอโซน",
    sentence: "เพราะเหตุใดเครื่องบินพาณิชย์ส่วนใหญ่จึงนิยมบินอยู่ในระดับชั้นบรรยากาศ 'สตราโตสเฟียร์ (Stratosphere)'?",
    ans: "เพราะสภาพอากาศนิ่งสงบ ไม่มีเมฆฝนหรือพายุรุนแรง และมีแก๊สโอโซนกรองรังสี UV",
    options: [
      "เพราะสภาพอากาศนิ่งสงบ ไม่มีเมฆฝนหรือพายุรุนแรง และมีแก๊สโอโซนกรองรังสี UV",
      "เพราะเป็นชั้นที่มีออกซิเจนหนาแน่นที่สุดทำให้เครื่องบินเผาผลาญเชื้อเพลิงได้ดีที่สุด",
      "เพราะแรงโน้มถ่วงในชั้นนี้มีค่าน้อยที่สุดทำให้บินได้เร็วขึ้น",
      "เพราะไม่มีแรงเสียดทานจากอากาศเลย"
    ],
    hint: "สังเกตความสงบของสภาพอากาศเหนือชั้นเมฆฝนขึ้นไป",
    exp: "ตอบ <b>เพราะสภาพอากาศนิ่งสงบ ไม่มีเมฆฝน</b> และกระแสลมสม่ำเสมอ เหมาะแก่การเดินทาง"
  },
  {
    category: "💨 ลมและการเกิดลม",
    sentence: "กระแสลมตามธรรมชาติเกิดขึ้นจากสาเหตุหลักในข้อใด?",
    ans: "ความแตกต่างของความกดอากาศระหว่างสองบริเวณ โดยอากาศเคลื่อนที่จากความกดอากาศสูงไปต่ำ",
    options: [
      "ความแตกต่างของความกดอากาศระหว่างสองบริเวณ โดยอากาศเคลื่อนที่จากความกดอากาศสูงไปต่ำ",
      "การหมุนรอบตัวเองของดวงจันทร์ทำให้เกิดแรงเหวี่ยงอากาศ",
      "การระเหยของน้ำทะเลในมหาสมุทรแปซิฟิกเท่านั้น",
      "ความหนาแน่นของเมฆฝนที่กดทับกันลงมา"
    ],
    hint: "อากาศจะพยายามไหลจากบริเวณที่แน่นหนา (สูง) ไปยังบริเวณที่เบาบาง (ต่ำ)",
    exp: "ตอบ <b>อากาศเคลื่อนที่จากบริเวณความกดอากาศสูงไปสู่บริเวณความกดอากาศต่ำ</b>[cite: 13]"
  },
  {
    category: "🌧️ เมฆและการเกิดฝน",
    sentence: "ละอองน้ำขนาดเล็กในก้อนเมฆจะรวมตัวกันจนมีขนาดใหญ่ขึ้นเรื่อยๆ จนกระทั่งอากาศไม่สามารถพยุงไว้ได้ แล้วตกลงมาเป็นฝน ปรากฏการณ์นี้เรียกว่าอะไร?",
    ans: "หยาดน้ำฟ้า (Precipitation)",
    options: [
      "หยาดน้ำฟ้า (Precipitation)",
      "การคายน้ำ (Transpiration)",
      "การระเหิดกลับ (Deposition)",
      "การควบแน่นอิ่มตัว"
    ],
    hint: "รวมเรียกชื่อน้ำทุกรูปแบบที่ตกลงมาจากฟ้าสู่พื้นดิน เช่น ฝน หิมะ ลูกเห็บ",
    exp: "ตอบ <b>หยาดน้ำฟ้า (Precipitation)</b> หมายถึงน้ำทุกสถานะที่ตกลงมาจากบรรยากาศสู่พื้นโลก"
  },
  {
    category: "🌡️ ความชื้นและความกดอากาศ",
    sentence: "เครื่องมือวัดที่ใช้สำหรับตรวจวัดค่า 'ความชื้นสัมพัทธ์' ภายในอากาศมีชื่อเรียกว่าอะไร?",
    ans: "ไฮโกรมิเตอร์ (Hygrometer)",
    options: [
      "ไฮโกรมิเตอร์ (Hygrometer)",
      "บารอมิเตอร์ (Barometer)",
      "เทอร์โมมิเตอร์ (Thermometer)",
      "แอนณิโมมิเตอร์ (Anemometer)"
    ],
    hint: "บารอมิเตอร์ใช้วัดความกดอากาศ ส่วนเทอร์โมมิเตอร์ใช้วัดอุณหภูมิ",
    exp: "ตอบ <b>ไฮโกรมิเตอร์ (Hygrometer)</b> เป็นเครื่องมือสำหรับวัดความชื้นของอากาศ"
  }
];

let currentWeatherAns = "";
let currentWeatherExp = "";

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
    generateWeatherQuestion();
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

function buildWeatherQueue() {
  return shuffle([...weatherMasterDatabase]);
}

function generateWeatherQuestion() {
  if (weatherQueue.length === 0) {
    weatherQueue = buildWeatherQueue();
  }

  const qData = weatherQueue.pop();
  if (!qData) return;

  currentWeatherAns = qData.ans;
  currentWeatherExp = qData.exp;

  const badgeEl = document.getElementById('weather-category-badge');
  const qTextEl = document.getElementById('weather-q-text');
  const qHintEl = document.getElementById('weather-q-hint');

  if (badgeEl) badgeEl.innerHTML = `<i class="fa-solid fa-bookmark"></i> ${qData.category}`;
  if (qTextEl) qTextEl.innerText = qData.sentence;
  if (qHintEl) qHintEl.innerText = `คำใบ้: ${qData.hint}`;

  const fbEl = document.getElementById('weather-feedback');
  const nextBtnEl = document.getElementById('weather-next-btn');
  if (fbEl) fbEl.classList.add('hidden');
  if (nextBtnEl) nextBtnEl.classList.add('hidden');

  const container = document.getElementById('weather-options-container');
  if (!container) return;
  container.innerHTML = "";

  const options = shuffle(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkWeatherAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkWeatherAnswer(selected, btn) {
  const isCorrect = selected === currentWeatherAns;
  document.querySelectorAll('#weather-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentWeatherAns) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('weather-feedback');
  if (fb) {
    fb.classList.remove('hidden', 'success', 'error');
    fb.classList.add(isCorrect ? 'success' : 'error');
  }

  const titleEl = document.getElementById('weather-fb-title');
  const descEl = document.getElementById('weather-fb-desc');
  if (titleEl) titleEl.innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องยอดเยี่ยม!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  if (descEl) descEl.innerHTML = currentWeatherExp;

  const nextBtn = document.getElementById('weather-next-btn');
  if (nextBtn) nextBtn.classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  weatherQueue = buildWeatherQueue();
};