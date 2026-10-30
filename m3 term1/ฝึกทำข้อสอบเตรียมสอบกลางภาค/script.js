// ===================================================
// SCIMASTER ม.3 เทอม 1 - FULL EXAM BANK ENGINE (75 ข้อ)
// ===================================================

let globalScore = 0;
let globalStreak = 0;
let totalAttempts = 0;

let examQueue = [];

// คลังโจทย์ข้อสอบวิทยาศาสตร์ ม.3 เทอม 1 รวม 3 หมวดวิชา
const examIngredients = [
  // --- หมวดที่ 1: พันธุศาสตร์ ---
  {
    category: "🧬 พันธุศาสตร์",
    sentence: "มนุษย์ปกติมีจำนวนโครโมโซมในเซลล์ร่างกาย (Somatic cell) และเซลล์สืบพันธุ์ตรงกับข้อใด?",
    ans: "เซลล์ร่างกายมี 46 แท่ง, เซลล์สืบพันธุ์มี 23 แท่ง",
    options: ["เซลล์ร่างกายมี 46 แท่ง, เซลล์สืบพันธุ์มี 23 แท่ง", "เซลล์ร่างกายมี 23 แท่ง, เซลล์สืบพันธุ์มี 46 แท่ง", "เซลล์ร่างกายมี 46 คู่, เซลล์สืบพันธุ์มี 23 คู่", "เซลล์ร่างกายมี 23 คู่, เซลล์สืบพันธุ์มี 46 คู่"],
    hint: "เซลล์สืบพันธุ์สืบทอดโครโมโซมเพียงครึ่งเดียวจากพ่อหรือแม่",
    exp: "ตอบ <b>เซลล์ร่างกายมี 46 แท่ง (23 คู่), เซลล์สืบพันธุ์มี 23 แท่ง</b> เกิดจากการแบ่งเซลล์แบบไมโอซิส"
  },
  {
    category: "🧬 พันธุศาสตร์",
    sentence: "กระบวนการแบ่งเซลล์ในข้อใด ที่ทำให้เกิดเซลล์สืบพันธุ์ที่มีจำนวนโครโมโซมลดลงเหลือครึ่งหนึ่ง (n)?",
    ans: "การแบ่งเซลล์แบบไมโอซิส (Meiosis)",
    options: ["การแบ่งเซลล์แบบไมโอซิส (Meiosis)", "การแบ่งเซลล์แบบไมโตซิส (Mitosis)", "การปฏิสนธิ", "การโคลนนิ่ง"],
    hint: "เป็นการแบ่งเซลล์เพื่อสร้างอสุจิและไข่",
    exp: "ตอบ <b>การแบ่งเซลล์แบบไมโอซิส (Meiosis)</b> ช่วยรักษาจำนวนโครโมโซมคงที่ในแต่ละรุ่น"
  },
  {
    category: "🧬 พันธุศาสตร์",
    sentence: "ความผิดปกติทางพันธุกรรมในข้อใด ที่เกิดจากจำนวนโครโมโซมคู่ที่ 21 เกินมา 1 แท่ง (Trisomy 21)?",
    ans: "กลุ่มอาการดาวน์ (Down syndrome)",
    options: ["กลุ่มอาการดาวน์ (Down syndrome)", "โรคธาลัสซีเมีย", "โรคตาบอดสี", "โรคฮีโมฟีเลีย"],
    hint: "เกิดความช้าทางพัฒนาการสติปัญญาและมีลักษณะหน้าตาเฉพาะตัว",
    exp: "ตอบ <b>กลุ่มอาการดาวน์ (Down syndrome)</b> เกิดจากโครโมโซมคู่ที่ 21 มี 3 แท่ง รวมเป็น 47 แท่ง"
  },
  {
    category: "🧬 พันธุศาสตร์",
    sentence: "โรคตาบอดสีและโรคฮีโมฟีเลีย เป็นความผิดปกติทางพันธุกรรมที่ถูกควบคุมด้วยยีนด้อยบนโครโมโซมชนิดใด?",
    ans: "โครโมโซมเพศ X",
    options: ["โครโมโซมเพศ X", "โครโมโซมเพศ Y", "ออโตโซมคู่ที่ 1", "ออโตโซมคู่ที่ 21"],
    hint: "ผู้ชายมีโอกาสแสดงอาการของโรคมากกว่าผู้หญิงเพราะมีโครโมโซมชนิดนี้เพียงแท่งเดียว (XY)",
    exp: "ตอบ <b>โครโมโซมเพศ X</b> ทำให้เพศชายเป็นโรคได้ง่ายกว่าเพศหญิง"
  },
  {
    category: "🧬 พันธุศาสตร์",
    sentence: "หากผสมพันธุ์ถั่วลันเตาต้นสูงแท้ (TT) กับต้นเตี้ยแท้ (tt) รุ่นลูก F1 จะมีฟีโนไทป์อย่างไรทั้งหมด?",
    ans: "ต้นสูงทั้งหมด (Tt)",
    options: ["ต้นสูงทั้งหมด (Tt)", "ต้นเตี้ยทั้งหมด (tt)", "ต้นสูงครึ่งหนึ่ง ต้นเตี้ยครึ่งหนึ่ง", "ต้นสูงปานกลาง"],
    hint: "ยีนเด่น T สามารถข่มยีนด้อย t ได้อย่างสมบูรณ์",
    exp: "ตอบ <b>ต้นสูงทั้งหมด (Tt)</b> เพราะแอลลีลเด่น T ข่มแอลลีลด้อย t"
  },

  // --- หมวดที่ 2: คลื่นและแสง ---
  {
    category: "🌊 คลื่นและแสง",
    sentence: "คลื่นกลในข้อใด จัดเป็น 'คลื่นตามขวาง (Transverse Wave)'?",
    ans: "คลื่นในเส้นเชือก",
    options: ["คลื่นในเส้นเชือก", "คลื่นเสียงในอากาศ", "คลื่นในสปริงแบบอัด-ขยาย", "คลื่นความดันในลำโพง"],
    hint: "ทิศทางการสั่นของอนุภาคจะตั้งฉากกับทิศทางการเคลื่อนที่ของคลื่น",
    exp: "ตอบ <b>คลื่นในเส้นเชือก</b> เป็นคลื่นตามขวาง ส่วนคลื่นเสียงเป็นคลื่นตามยาว"
  },
  {
    category: "🌊 คลื่นและแสง",
    sentence: "คลื่นขบวนหนึ่งมีความถี่ 50 เฮิรตซ์ และมีความยาวคลื่น 4 เมตร อัตราเร็วของคลื่นนี้เท่ากับเท่าใด?",
    ans: "200 เมตรต่อวินาที",
    options: ["200 เมตรต่อวินาที", "12.5 เมตรต่อวินาที", "54 เมตรต่อวินาที", "400 เมตรต่อวินาที"],
    hint: "ใช้สูตรคำนวณอัตราเร็วคลื่น: v = f × λ",
    exp: "ตอบ <b>200 เมตรต่อวินาที</b> คำนวณจากสูตร <b>v = fλ</b> = 50 × 4 = 200 m/s"
  },
  {
    category: "🌊 คลื่นและแสง",
    sentence: "ปรากฏการณ์ที่แสงเดินทางผ่านรอยต่อของตัวกลางต่างชนิดกัน แล้วทำให้แนวทางเดินของแสงเบี่ยงเบนไป เรียกว่าอะไร?",
    ans: "การหักเหของแสง (Refraction)",
    options: ["การหักเหของแสง (Refraction)", "การสะท้อนของแสง (Reflection)", "การเลี้ยวเบนของแสง", "การแทรกสอดของแสง"],
    hint: "ทำให้มองเห็นเหรียญในก้นสระตื้นกว่าความเป็นจริง",
    exp: "ตอบ <b>การหักเหของแสง (Refraction)</b> เกิดจากอัตราเร็วแสงเปลี่ยนไปเมื่อผ่านตัวกลางต่างความหนาแน่น"
  },
  {
    category: "🌊 คลื่นและแสง",
    sentence: "เลนส์ชนิดใด ที่ใช้สำหรับทำแว่นตาเพื่อแก้ไขภาวะ 'สายตาสั้น'?",
    ans: "เลนส์เว้า (Concave Lens)",
    options: ["เลนส์เว้า (Concave Lens)", "เลนส์นูน (Convex Lens)", "กระจกเงาราบ", "กระจกเงาเว้า"],
    hint: "ทำหน้าที่กระจายแสงก่อนเข้าสู่เลนส์ตา",
    exp: "ตอบ <b>เลนส์เว้า (Concave Lens)</b> ช่วยกระจายแสงเพื่อให้ภาพตกพอดีบนเรตินาของคนสายตาสั้น"
  },
  {
    category: "🌊 คลื่นและแสง",
    sentence: "กฎการสะท้อนของแสงกล่าวว่าอย่างไร?",
    ans: "มุมตกกระทบเท่ากับมุมสะท้อนเสมอ (θ₁ = θ₂)",
    options: [
      "มุมตกกระทบเท่ากับมุมสะท้อนเสมอ (θ₁ = θ₂)",
      "มุมตกกระทบโตกว่ามุมสะท้อนสองเท่า",
      "มุมสะท้อนขึ้นอยู่กับชนิดของตัวกลางเท่านั้น",
      "มุมตกกระทบและมุมสะท้อนรวมกันได้ 90 องศาเสมอ"
    ],
    hint: "เป็นกฎพื้นฐานของการสะท้อนบนผิววัตถุราบเรียบ",
    exp: "ตอบ <b>มุมตกกระทบเท่ากับมุมสะท้อนเสมอ (θ₁ = θ₂)</b> โดยรังสีทั้งสองและเส้นแนวฉากอยู่ในระนาบเดียวกัน"
  },

  // --- หมวดที่ 3: ไฟฟ้าและอิเล็กทรอนิกส์ ---
  {
    category: "⚡ ไฟฟ้าและวงจร",
    sentence: "ตามกฎของโอห์ม ลวดตัวนำมีความต้านทาน 20 โอห์ม มีกระแสไหลผ่าน 0.5 แอมแปร์ จะมีความต่างศักย์เท่าใด?",
    ans: "10 โวลต์",
    options: ["10 โวลต์", "40 โวลต์", "100 โวลต์", "5 โวลต์"],
    hint: "คำนวณจากสูตร: V = I × R",
    exp: "ตอบ <b>10 โวลต์</b> คำนวณจากสูตร <b>V = IR</b> = 0.5 × 20 = 10 โวลต์"
  },
  {
    category: "⚡ ไฟฟ้าและวงจร",
    sentence: "การต่อตัวต้านทานแบบใด ที่ทำให้ความต่างศักย์ไฟฟ้าคร่อมตัวต้านทานทุกตัวมีค่าเท่ากัน?",
    ans: "การต่อแบบขนาน (Parallel circuit)",
    options: ["การต่อแบบขนาน (Parallel circuit)", "การต่อแบบอนุกรม (Series circuit)", "การต่อแบบอันดับ", "การต่อลงดิน"],
    hint: "เป็นการต่ออุปกรณ์ไฟฟ้าที่ใช้ตามบ้านเรือนทั่วไป",
    exp: "ตอบ <b>การต่อแบบขนาน (Parallel circuit)</b> ทำให้แรงดันไฟฟ้า (V) เท่ากันทุกสาขา และอุปกรณ์ทำงานอิสระกัน"
  },
  {
    category: "⚡ ไฟฟ้าและวงจร",
    sentence: "เครื่องใช้ไฟฟ้าขนาด 1,500 วัตต์ เปิดใช้งานนาน 2 ชั่วโมง จะใช้พลังงานไฟฟ้าไปกี่หน่วย (kWh)?",
    ans: "3 หน่วย",
    options: ["3 หน่วย", "1.5 หน่วย", "3,000 หน่วย", "750 หน่วย"],
    hint: "แปลงวัตต์เป็นกิโลวัตต์ (หาร 1000) แล้วคูณเวลากิจกรรมชั่วโมง: E = P × t",
    exp: "ตอบ <b>3 หน่วย</b> คำนวณจาก พลังงาน (kWh) = (1,500 / 1000) × 2 = 3 หน่วย"
  },
  {
    category: "⚡ ไฟฟ้าและวงจร",
    sentence: "อุปกรณ์ชนิดใดทำหน้าที่ป้องกันผู้ใช้งานไม่ให้ได้รับอันตรายจากไฟฟ้าดูดเมื่อเกิดกระแสไฟฟ้ารั่ว?",
    ans: "สายดิน (Ground wire)",
    options: ["สายดิน (Ground wire)", "ฟิวส์ (Fuse)", "สวิตช์สองทาง", "ตัวต้านทาน"],
    hint: "เป็นสายไฟสีเขียวสลับเหลืองที่ต่อจากเครื่องใช้ไฟฟ้าลงสู่พื้นดิน",
    exp: "ตอบ <b>สายดิน (Ground wire)</b> นำกระแสไฟรั่วลงสู่พื้นดินอย่างปลอดภัยเพื่อป้องกันไฟดูด"
  },
  {
    category: "⚡ ไฟฟ้าและวงจร",
    sentence: "อุปกรณ์อิเล็กทรอนิกส์ 'ไดโอด (Diode)' มีหน้าที่สำคัญอย่างไรในวงจรไฟฟ้า?",
    ans: "ยอมให้กระแสไฟฟ้าไหลผ่านได้ในทิศทางเดียว",
    options: [
      "ยอมให้กระแสไฟฟ้าไหลผ่านได้ในทิศทางเดียว",
      "ขยายสัญญาณเสียงและกระแสไฟฟ้า",
      "เก็บสะสมประจุไฟฟ้าไว้ใช้นานๆ",
      "ปรับเปลี่ยนความต้านทานตามแสง"
    ],
    hint: "ทำหน้าที่คล้ายวาล์วน้ำทางเดียว",
    exp: "ตอบ <b>ยอมให้กระแสไฟฟ้าไหลผ่านได้ในทิศทางเดียว</b> ใช้แปลงกระแสสลับเป็นกระแสตรง"
  }
];

let currentExamAns = "";
let currentExamExp = "";

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

  const progressPercent = Math.min(100, Math.round((totalAttempts / 15) * 100));
  if (progressEl) progressEl.innerText = `${progressPercent}%`;
}

function buildExamQueue() {
  return shuffle([...examIngredients]);
}

function generateExamQuestion() {
  if (examQueue.length === 0) {
    examQueue = buildExamQueue();
  }

  const qData = examQueue.pop();
  currentExamAns = qData.ans;
  currentExamExp = qData.exp;

  document.getElementById('exam-category-badge').innerHTML = `<i class="fa-solid fa-bookmark"></i> ${qData.category}`;
  document.getElementById('exam-q-text').innerText = qData.sentence;
  document.getElementById('exam-q-hint').innerText = `คำใบ้: ${qData.hint}`;

  document.getElementById('exam-feedback').classList.add('hidden');
  document.getElementById('exam-next-btn').classList.add('hidden');

  const container = document.getElementById('exam-options-container');
  container.innerHTML = "";

  const options = shuffle(qData.options);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span>${opt}</span> <i class="fa-regular fa-circle"></i>`;
    btn.onclick = () => checkExamAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkExamAnswer(selected, btn) {
  const isCorrect = selected === currentExamAns;
  document.querySelectorAll('#exam-options-container .option-btn').forEach(b => {
    b.disabled = true;
    if (b.innerText.trim() === currentExamAns) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  const fb = document.getElementById('exam-feedback');
  fb.classList.remove('hidden', 'success', 'error');
  fb.classList.add(isCorrect ? 'success' : 'error');

  document.getElementById('exam-fb-title').innerHTML = isCorrect ? `<i class="fa-solid fa-circle-check"></i> ถูกต้องยอดเยี่ยม!` : `<i class="fa-solid fa-circle-xmark"></i> ยังไม่ถูกต้อง`;
  document.getElementById('exam-fb-desc').innerHTML = currentExamExp;

  document.getElementById('exam-next-btn').classList.remove('hidden');
  updateScoreBoard(isCorrect);
}

window.onload = function () {
  generateExamQuestion();
};