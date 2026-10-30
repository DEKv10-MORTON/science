// ===================================================
// SCIMASTER - CLIMATE & HUMANS (มนุษย์กับลมฟ้าอากาศ) ENGINE
// ===================================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let climateQueue = [];

const climateMasterDatabase = [
  {
    category: "🌀 พายุหมุนเขตร้อน",
    sentence: "พายุหมุนเขตร้อนที่มีความเร็วลมใกล้ศูนย์กลางสูงสุดตั้งแต่ 118 กิโลเมตรต่อชั่วโมงขึ้นไป จะถูกจัดอยู่ในระดับความรุนแรงใดตามมาตรฐานสากล?",
    ans: "พายุไต้ฝุ่น (Typhoon) หรือเฮอร์ริเคน",
    options: [
      "พายุไต้ฝุ่น (Typhoon) หรือเฮอร์ริเคน",
      "พายุโซนร้อน (Tropical Storm)",
      "พายุดีเปรสชัน (Depression)",
      "พายุทอร์นาโด (Tornado)"
    ],
    hint: "เป็นระดับความรุนแรงสูงสุดของพายุหมุนเขตร้อนที่มีพลังทำลายล้างสูง",
    exp: "ตอบ <b>พายุไต้ฝุ่น หรือเฮอร์ริเคน</b> มีความเร็วลมสูงสุดตั้งแต่ 118 กม./ชม. ขึ้นไป"
  },
  {
    category: "🌊 มรสุมที่ ัส่งผลต่อประเทศไทย",
    sentence: "มรสุมชนิดใดที่พัดปกคลุมประเทศไทยในช่วงกลางปี (ประมาณกลางเดือนพฤษภาคมถึงกลางเดือนตุลาคม) ทำให้ประเทศไทยเข้าสู่ฤดูฝนและมีฝนตกชุก?",
    ans: "มรสุมตะวันตกเฉียงใต้",
    options: [
      "มรสุมตะวันตกเฉียงใต้",
      "มรสุมตะวันออกเฉียงเหนือ",
      "มรสุมตะวันออกเฉียงใต้",
      "มรสุมตะวันตกเฉียงเหนือ"
    ],
    hint: "พัดพาความชื้นจากมหาสมุทรอินเดียเข้าสู่ประเทศไทย",
    exp: "ตอบ <b>มรสุมตะวันตกเฉียงใต้</b>[cite: 13] นำความชื้นและฝนตกชุกมาสู่ประเทศไทยในช่วงฤดูฝน"
  },
  {
    category: "🌡️ เอลนีโ뇨และลานีญา",
    sentence: "ในช่วงที่เกิด 'ปรากฏการณ์เอลนีโ뇨 (El Nino)' จะส่งผลกระทบต่อสภาพภูมิอากาศของประเทศไทยอย่างไรมากที่สุด?",
    ans: "เกิดภาวะแห้งแล้ง ฝนทิ้งช่วง และปริมาณน้ำฝนต่ำกว่าปกติ",
    options: [
      "เกิดภาวะแห้งแล้ง ฝนทิ้งช่วง และปริมาณน้ำฝนต่ำกว่าปกติ",
      "เกิดฝนตกหนักมากและมีน้ำท่วมขังทุกภูมิภาค",
      "อุณหภูมิลดต่ำลงจนเกิดหิมะตกในภาคเหนือ",
      "ไม่มีผลกระทบใดๆ ต่อประเทศไทยเลย"
    ],
    hint: "กระแสน้ำอุ่นไหลไปทางฝั่งอเมริกาใต้ ทำให้อย่างเอเชียและไทยแล้งจัด",
    exp: "ตอบ <b>เกิดภาวะแห้งแล้งและฝนทิ้งช่วง</b>[cite: 13] เนื่องจากกระแสลมสินค้าตะวันออกมีกำลังอ่อนลง"
  },
  {
    category: "🌍 ปรากฏการณ์เรือนกระจก",
    sentence: "แก๊สในข้อใดที่มีปริมาณมากที่สุดในบรรยากาศของโลก และจัดเป็นแก๊สเรือนกระจกหลักที่มนุษย์ปล่อยจากการเผาไหม้เชื้อเพลิง?",
    ans: "แก๊สคาร์บอนไดออกไซด์ (CO₂)",
    options: [
      "แก๊สคาร์บอนไดออกไซด์ (CO₂)",
      "แก๊สออกซิเจน (O₂)",
      "แก๊สไนโตรเจน (N₂)",
      "แก๊สฮีเลียม (He)"
    ],
    hint: "เกิดจากการเผาไหม้ถ่านหิน น้ำมัน และก๊าซธรรมชาติ",
    exp: "ตอบ <b>แก๊สคาร์บอนไดออกไซด์ (CO₂)</b> เป็นตัวการสำคัญของภาวะเรือนกระจกที่ทำให้โลกร้อนขึ้น[cite: 13]"
  },
  {
    category: "🌀 พายุหมุนเขตร้อน",
    sentence: "ประเทศไทยมักได้รับผลกระทบจากพายุหมุนเขตร้อนที่ก่อตัวเคลื่อนตัวมาจากบริเวณใดมากที่สุด?",
    ans: "ทะเลจีนใต้และมหาสมุทรแปซิฟิกตะวันตก",
    options: [
      "ทะเลจีนใต้และมหาสมุทรแปซิฟิกตะวันตก",
      "มหาสมุทรแอตแลนติกเหนือ",
      "มหาสมุทรอินเดียตอนใต้",
      "ขั้วโลกเหนือ"
    ],
    hint: "พายุไต้ฝุ่นในโซนเอเชียตะวันออกมักเคลื่อนผ่านประเทศเวียดนามและเข้ามาสู่ไทย",
    exp: "ตอบ <b>ทะเลจีนใต้และมหาสมุทรแปซิฟิกตะวันตก</b>[cite: 13]"
  }
];

let currentClimateAns = "";
let currentClimateExp = "";

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
    generateClimateQuestion();
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

function buildClimateQueue() {
  return shuffle([...climateMasterDatabase]);
}

function generateClimateQuestion() {
  if (climateQueue.length === 0) {
    climateQueue = buildClimateQueue();
  }

  const qData = climateQueue.pop();
  if (!qData) return;

  currentClimateAns = qData.ans;
  currentClimateExp = qData.exp;

  const badgeEl = document.getElementById('climate-category-badge');
  const qTextEl = document.getElementById('climate-q-text');
  const qHintEl = document.getElementById('climate-q-hint');

  if (badgeEl) badgeEl.innerHTML = `<i class="fa-solid fa-bookmark"></i> ${qData.category}`;
  if (qTextEl) qTextEl.innerText = qData.sentence;
  if (qHintEl) qHintEl.innerText = `คำใบ้: ${qData.hint}`;

  const fbEl = document.getElementById('climate-feedback');
  const nextBtnEl = document.getElementById('climate-next-btn');
  if (fbEl) fbEl.classList.add('hidden');
  if (nextBtnEl) nextBtnEl.classList.add('hidden');

  const container = document.getElementById('climate-options-container');
  if (!container) return;
  container.innerHTML = "";

  const options = shuffle(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkClimateAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkClimateAnswer(selected, btn) {
  const isCorrect = selected === currentClimateAns;
  document.querySelectorAll('#climate-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentClimateAns) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('climate-feedback');
  if (fb) {
    fb.classList.remove('hidden', 'success', 'error');
    fb.classList.add(isCorrect ? 'success' : 'error');
  }

  const titleEl = document.getElementById('climate-fb-title');
  const descEl = document.getElementById('climate-fb-desc');
  if (titleEl) titleEl.innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องยอดเยี่ยม!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  if (descEl) descEl.innerHTML = currentClimateExp;

  const nextBtn = document.getElementById('climate-next-btn');
  if (nextBtn) nextBtn.classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  climateQueue = buildClimateQueue();
};