// ===================================================
// SCIMASTER - GRADE 7 TERM 2 FINAL EXAM REVIEW ENGINE
// ===================================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let term2Queue = [];

const term2MasterDatabase = [
  {
    category: "🌡️ พลังงานความร้อนและการเปลี่ยนสถานะ",
    sentence: "ขณะที่น้ำแข็งกำลังหลอมเหลวจนหมดเป็นของเหลว อุณหภูมิของน้ำแข็งในขณะนั้นจะเป็นอย่างไร?",
    ans: "อุณหภูมิจะคงที่ตลอดเวลาจนกว่าจะเปลี่ยนสถานะเสร็จสิ้น",
    options: [
      "อุณหภูมิจะคงที่ตลอดเวลาจนกว่าจะเปลี่ยนสถานะเสร็จสิ้น",
      "อุณหภูมิจะสูงขึ้นเรื่อยๆ ทันทีที่ได้รับความร้อน",
      "อุณหภูมิจะลดต่ำลงกว่าเดิมเพื่อดูดความร้อน",
      "อุณหภูมิจะพุ่งขึ้นถึง 100 องศาเซลเซียสทันที"
    ],
    hint: "สารบริสุทธิ์จะมีอุณหภูมิคงที่ขณะเกิดการเปลี่ยนสถานะ",
    exp: "ตอบ <b>อุณหภูมิจะคงที่ตลอดเวลา</b> เนื่องจากพลังงานความร้อนที่ให้ไปถูกใช้เป็นความร้อนแฝงในการเปลี่ยนสถานะ"
  },
  {
    category: "🔥 การถ่ายโอนความร้อน",
    sentence: "การต้มน้ำในหม้อต้มน้ำโดยที่น้ำด้านล่างที่ร้อนจะลอยตัวสูงขึ้นและน้ำด้านบนที่เย็นกว่าจะจมลงมาแทนที่ เป็นการถ่ายโอนความร้อนวิธีใด?",
    ans: "การพาความร้อน (Convection)",
    options: [
      "การพาความร้อน (Convection)",
      "การนำความร้อน (Conduction)",
      "การแผ่รังสีความร้อน (Radiation)",
      "การคายความร้อนอิสระ"
    ],
    hint: "อาศัยการเคลื่อนที่ของมวลสารที่เป็นของเหลวหรือแก๊ส",
    exp: "ตอบ <b>การพาความร้อน (Convection)</b> เป็นการถ่ายโอนความร้อนผ่านการเคลื่อนที่ของตัวกลางของเหลวหรือแก๊ส"
  },
  {
    category: "🌍 ชั้นบรรยากาศและลมฟ้าอากาศ",
    sentence: "ชั้นบรรยากาศของโลกชั้นใดที่ห่อหุ้มผิวโลกและเป็นชั้นที่สำคัญที่สุดต่อการเกิดปรากฏการณ์ลมฟ้าอากาศ เช่น เมฆ ฝน และพายุ?",
    ans: "โทรโปสเฟียร์ (Troposphere)",
    options: [
      "โทรโปสเฟียร์ (Troposphere)",
      "สตราโตสเฟียร์ (Stratosphere)",
      "มีโซสเฟียร์ (Mesosphere)",
      "เทอร์โมสเฟียร์ (Thermosphere)"
    ],
    hint: "เป็นชั้นบรรยากาศชั้นล่างสุดที่มนุษย์และสิ่งมีชีวิตอาศัยอยู่",
    exp: "ตอบ <b>โทรโปสเฟียร์ (Troposphere)</b> เป็นชั้นบรรยากาศที่มีไอน้ำและความปั่นป่วนทางอากาศหนาแน่นที่สุด"
  },
  {
    category: "🌀 พายุและมรสุมไทย",
    sentence: "มรสุมชนิดใดที่พัดเข้าสู่ประเทศไทยในช่วงฤดูฝน (กลางพฤษภาคม - ตุลาคม) และนำความชุ่มชื้นมาสู่ประเทศ?",
    ans: "มรสุมตะวันตกเฉียงใต้",
    options: [
      "มรสุมตะวันตกเฉียงใต้",
      "มรสุมตะวันออกเฉียงเหนือ",
      "มรสุมตะวันออกเฉียงใต้",
      "มรสุมตะวันตกเฉียงเหนือ"
    ],
    hint: "พัดมาจากทางมหาสมุทรอินเดียเข้าสู่ประเทศไทย",
    exp: "ตอบ <b>มรสุมตะวันตกเฉียงใต้</b> นำพาความชุ่มชื้นและฝนตกชุกมาสู่ประเทศไทยในฤดูฝน"
  },
  {
    category: "🌊 เอลนีโ뇨และลานีญา",
    sentence: "ข้อใดคือลักษณะเด่นที่เกิดขึ้นในประเทศไทย เมื่อเกิด 'ปรากฏการณ์ลานีญา (La Nina)'?",
    ans: "มีปริมาณฝนตกชุกหนาแน่นกว่าปกติและเสี่ยงต่อภาวะน้ำท่วม",
    options: [
      "มีปริมาณฝนตกชุกหนาแน่นกว่าปกติและเสี่ยงต่อภาวะน้ำท่วม",
      "เกิดความแห้งแล้งรุนแรงและฝนทิ้งช่วงเป็นเวลานาน",
      "อุณหภูมิของอากาศลดต่ำลงจนเกิดหิมะตก",
      "ไม่มีผลกระทบใดๆ ต่อปริมาณน้ำฝนในประเทศไทย"
    ],
    hint: "ตรงข้ามกับเอลนีโ뇨 น้ำทะเลฝั่งตะวันออกของแปซิฟิกเย็นลง ฝนจะเทมาฝั่งเอเชีย",
    exp: "ตอบ <b>มีปริมาณฝนตกชุกหนาแน่นกว่าปกติและเสี่ยงต่อภาวะน้ำท่วม</b> เนื่องจากกระแสลมสินค้ามีกำลังแรงขึ้น"
  }
];

let currentTerm2Ans = "";
let currentTerm2Exp = "";

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
    generateTerm2Question();
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

function buildTerm2Queue() {
  return shuffle([...term2MasterDatabase]);
}

function generateTerm2Question() {
  if (term2Queue.length === 0) {
    term2Queue = buildTerm2Queue();
  }

  const qData = term2Queue.pop();
  if (!qData) return;

  currentTerm2Ans = qData.ans;
  currentTerm2Exp = qData.exp;

  const badgeEl = document.getElementById('term2-category-badge');
  const qTextEl = document.getElementById('term2-q-text');
  const qHintEl = document.getElementById('term2-q-hint');

  if (badgeEl) badgeEl.innerHTML = `<i class="fa-solid fa-bookmark"></i> ${qData.category}`;
  if (qTextEl) qTextEl.innerText = qData.sentence;
  if (qHintEl) qHintEl.innerText = `คำใบ้: ${qData.hint}`;

  const fbEl = document.getElementById('term2-feedback');
  const nextBtnEl = document.getElementById('term2-next-btn');
  if (fbEl) fbEl.classList.add('hidden');
  if (nextBtnEl) nextBtnEl.classList.add('hidden');

  const container = document.getElementById('term2-options-container');
  if (!container) return;
  container.innerHTML = "";

  const options = shuffle(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkTerm2Answer(opt, btn);
    container.appendChild(btn);
  });
}

function checkTerm2Answer(selected, btn) {
  const isCorrect = selected === currentTerm2Ans;
  document.querySelectorAll('#term2-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentTerm2Ans) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('term2-feedback');
  if (fb) {
    fb.classList.remove('hidden', 'success', 'error');
    fb.classList.add(isCorrect ? 'success' : 'error');
  }

  const titleEl = document.getElementById('term2-fb-title');
  const descEl = document.getElementById('term2-fb-desc');
  if (titleEl) titleEl.innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องยอดเยี่ยม!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  if (descEl) descEl.innerHTML = currentTerm2Exp;

  const nextBtn = document.getElementById('term2-next-btn');
  if (nextBtn) nextBtn.classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  term2Queue = buildTerm2Queue();
};