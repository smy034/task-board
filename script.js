const questions = [
  {
    question: "日本で最も高い山はどれですか？",
    choices: ["北岳", "富士山", "槍ヶ岳", "奥穂高岳"],
    correct: 1,
    explanation: "富士山は標高3,776mで、日本最高峰です。"
  },
  {
    question: "光の速さ（真空中）はおよそいくらですか？",
    choices: ["約3万km/秒", "約30万km/秒", "約300km/秒", "約3,000km/秒"],
    correct: 1,
    explanation: "光の速さは真空中でおよそ30万km/秒（約299,792km/秒）です。"
  },
  {
    question: "日本の国鳥に指定されているのはどれですか？",
    choices: ["タンチョウ", "ウグイス", "キジ", "トキ"],
    correct: 2,
    explanation: "キジは1947年に日本の国鳥に指定されました。"
  },
  {
    question: "世界で最も深い湖はどれですか？",
    choices: ["カスピ海", "バイカル湖", "スペリオル湖", "チチカカ湖"],
    correct: 1,
    explanation: "バイカル湖（ロシア）は最大水深1,642mで、世界で最も深い湖です。"
  },
  {
    question: "元素記号「Au」は何の元素ですか？",
    choices: ["銀", "銅", "金", "白金（プラチナ）"],
    correct: 2,
    explanation: "「Au」はラテン語の「Aurum（アウルム）」に由来し、金を表します。"
  }
];

const TOTAL = questions.length;

let currentIndex = 0;
let score = 0;

const quizScreen    = document.getElementById("quiz-screen");
const resultScreen  = document.getElementById("result-screen");
const progressText  = document.getElementById("progress-text");
const progressFill  = document.getElementById("progress-fill");
const questionText  = document.getElementById("question-text");
const choicesEl     = document.getElementById("choices");
const feedbackEl    = document.getElementById("feedback");
const nextBtn       = document.getElementById("next-btn");
const scoreDisplay  = document.getElementById("score-display");
const scoreFraction = document.getElementById("score-fraction");
const perfectMsg    = document.getElementById("perfect-message");
const scoreMessage  = document.getElementById("score-message");
const resultIcon    = document.getElementById("result-icon");
const retryBtn      = document.getElementById("retry-btn");
const confettiCanvas = document.getElementById("confetti-canvas");

let confettiFrame = null;

function showQuestion(index) {
  const q = questions[index];

  progressText.textContent = `問題 ${index + 1} / ${TOTAL}`;
  progressFill.style.width = `${(index / TOTAL) * 100}%`;

  questionText.textContent = q.question;

  choicesEl.innerHTML = "";
  q.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice;
    btn.addEventListener("click", () => handleAnswer(i));
    choicesEl.appendChild(btn);
  });

  feedbackEl.className = "feedback hidden";
  feedbackEl.textContent = "";
  nextBtn.classList.add("hidden");
}

function handleAnswer(selectedIndex) {
  const q = questions[currentIndex];
  const buttons = choicesEl.querySelectorAll(".choice-btn");

  buttons.forEach(btn => (btn.disabled = true));
  buttons[q.correct].classList.add("correct");

  if (selectedIndex === q.correct) {
    score++;
    feedbackEl.textContent = `正解！　${q.explanation}`;
    feedbackEl.className = "feedback correct";
  } else {
    buttons[selectedIndex].classList.add("incorrect");
    feedbackEl.textContent = `不正解。正解は「${q.choices[q.correct]}」です。　${q.explanation}`;
    feedbackEl.className = "feedback incorrect";
  }

  const isLast = currentIndex === TOTAL - 1;
  nextBtn.textContent = isLast ? "結果を見る" : "次の問題へ →";
  nextBtn.classList.remove("hidden");
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const points = score * (100 / TOTAL);
  scoreDisplay.textContent = `${points}点`;
  scoreFraction.textContent = `${TOTAL}問中 ${score}問正解`;

  const isPerfect = score === TOTAL;
  if (isPerfect) {
    perfectMsg.classList.remove("hidden");
    launchConfetti();
  } else {
    perfectMsg.classList.add("hidden");
  }

  const messages = [
    { min: 5, icon: "🏆", text: "全問正解！本当に素晴らしい！" },
    { min: 4, icon: "😊", text: "優秀です！あと少しで満点！" },
    { min: 3, icon: "🙂", text: "まずまずの結果です。もう一度挑戦してみましょう！" },
    { min: 0, icon: "😅", text: "まだ伸びしろがあります！再挑戦してみましょう！" }
  ];

  const result = messages.find(m => score >= m.min);
  resultIcon.textContent = result.icon;
  scoreMessage.textContent = result.text;
}

function launchConfetti() {
  const ctx = confettiCanvas.getContext("2d");
  confettiCanvas.width  = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  confettiCanvas.classList.remove("hidden");

  const colors = ["#f6e05e", "#fc8181", "#68d391", "#76e4f7", "#b794f4", "#fbb6ce", "#fbd38d", "#9ae6b4"];

  const bursts = [
    { x: 0,                        y: confettiCanvas.height * 0.45 },
    { x: confettiCanvas.width,     y: confettiCanvas.height * 0.45 },
    { x: confettiCanvas.width * 0.3, y: 0 },
    { x: confettiCanvas.width * 0.7, y: 0 }
  ];

  const particles = [];
  bursts.forEach(burst => {
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 4;
      particles.push({
        x: burst.x, y: burst.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        w: Math.random() * 10 + 5,
        h: Math.random() * 6 + 3,
        rot: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.3,
        alpha: 1,
        circle: Math.random() > 0.6
      });
    }
  });

  let tick = 0;

  function animate() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    let alive = false;

    particles.forEach(p => {
      if (p.alpha <= 0) return;
      alive = true;
      p.x   += p.vx;
      p.y   += p.vy;
      p.vy  += 0.18;
      p.vx  *= 0.99;
      p.rot += p.spin;
      if (tick > 100) p.alpha -= 0.012;

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.circle) {
        ctx.beginPath();
        ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }
      ctx.restore();
    });

    tick++;
    if (alive) {
      confettiFrame = requestAnimationFrame(animate);
    } else {
      confettiCanvas.classList.add("hidden");
    }
  }

  if (confettiFrame) cancelAnimationFrame(confettiFrame);
  animate();
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < TOTAL) {
    showQuestion(currentIndex);
  } else {
    showResult();
  }
});

retryBtn.addEventListener("click", () => {
  if (confettiFrame) {
    cancelAnimationFrame(confettiFrame);
    confettiFrame = null;
  }
  confettiCanvas.classList.add("hidden");
  currentIndex = 0;
  score = 0;
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion(0);
});

showQuestion(0);
