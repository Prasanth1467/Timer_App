
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const stopBtn = document.getElementById("stop");
const pomodoroBtn = document.getElementById("Pomodoro");
const shortBreakBtn = document.getElementById("Short-break");
const longBreakBtn = document.getElementById("Long-break");
const alarmSound = document.getElementById("alarm");


let timer;
let timeLeft = 25 * 60; 
let isRunning = false;


function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}


function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      timeLeft--;
      updateDisplay();

      if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        alarmSound.play();
      }
    }, 1000);
  }
}


function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}


function resetTimer() {
  pauseTimer();
  if (pomodoroBtn.classList.contains("active-mode")) {
    timeLeft = 25 * 60;
  } else if (shortBreakBtn.classList.contains("active-mode")) {
    timeLeft = 5* 60;
  } else {
    timeLeft = 15 * 60;
  }
  updateDisplay();
}
function stopTimer() {
  pauseTimer();
  timeLeft = 0;
  updateDisplay();
}
function switchMode(mode, minutes) {
  pomodoroBtn.classList.remove("active-mode");
  shortBreakBtn.classList.remove("active-mode");
  longBreakBtn.classList.remove("active-mode");
  if (mode === "pomodoro") {
    pomodoroBtn.classList.add("active-mode");
    timeLeft = 25 * 60;
  } else if (mode === "short") {
    shortBreakBtn.classList.add("active-mode");
    timeLeft = 5* 60;
  } else {
    longBreakBtn.classList.add("active-mode");
    timeLeft = 15 * 60;
  }

  pauseTimer();
  updateDisplay();
}


startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
stopBtn.addEventListener("click", stopTimer);

pomodoroBtn.addEventListener("click", () => switchMode("pomodoro"));
shortBreakBtn.addEventListener("click", () => switchMode("short"));
longBreakBtn.addEventListener("click", () => switchMode("long"));
pomodoroBtn.classList.add("active-mode");
updateDisplay();
