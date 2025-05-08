let countdown;
let timeLeft = 0;
let isRunning = false;
let isPaused = false;

const timerDisplay = document.getElementById('timer-display');
const select = document.getElementById('pasta-select');
const alarm = document.getElementById('alarm-sound');
const animation = document.getElementById('pasta-ready-animation');
const pauseBtn = document.getElementById('pause-btn'); // <-- reference the pause button

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  if (isRunning || !select.value) return;
  timeLeft = parseInt(select.value);
  updateDisplay();
  isRunning = true;
  isPaused = false;
  animation.classList.add('hidden');
  pauseBtn.textContent = "Pause";

  countdown = setInterval(tick, 1000);
}

function tick() {
  if (timeLeft <= 0) {
    clearInterval(countdown);
    timerDisplay.textContent = "00:00";
    isRunning = false;
    isPaused = false;
    alarm.play();
    animation.classList.remove('hidden');
    pauseBtn.textContent = "Pause";
    return;
  }

  timeLeft--;
  updateDisplay();
}

function pauseTimer() {
  if (!isRunning && !isPaused) return;

  if (!isPaused) {
    clearInterval(countdown);
    isPaused = true;
    pauseBtn.textContent = "Continue";
  } else {
    isPaused = false;
    pauseBtn.textContent = "Pause";
    countdown = setInterval(tick, 1000);
  }
}

function resetTimer() {
  clearInterval(countdown);
  isRunning = false;
  isPaused = false;
  pauseBtn.textContent = "Pause";
  timeLeft = parseInt(select.value) || 0;
  updateDisplay();
  animation.classList.add('hidden');
}
