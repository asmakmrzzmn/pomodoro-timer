// script.js
let timerDisplay = document.getElementById("timer");
let startBtn = document.getElementById("start");
let resetBtn = document.getElementById("reset");
let fullscreenBtn = document.getElementById("fullscreen");
let modeButtons = document.querySelectorAll(".mode");

let timer;
let timeLeft = 25 * 60; 
let isRunning = false;

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function startTimer() {
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      startBtn.textContent = "start";
    }
  }, 1000);
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(timer);
    startBtn.textContent = "start";
  } else {
    startTimer();
    startBtn.textContent = "pause";
  }
  isRunning = !isRunning;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  startBtn.textContent = "start";
  setMode(currentMode);
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

let currentMode = "pomodoro";

function setMode(mode) {
  currentMode = mode;
  if (mode === "pomodoro") timeLeft = 25 * 60;
  else if (mode === "short") timeLeft = 5 * 60;
  else if (mode === "long") timeLeft = 15 * 60;
  updateDisplay();
}

startBtn.addEventListener("click", toggleTimer);
resetBtn.addEventListener("click", resetTimer);
fullscreenBtn.addEventListener("click", toggleFullscreen);
modeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    clearInterval(timer);
    isRunning = false;
    startBtn.textContent = "start";
    setMode(btn.dataset.mode);
  });
});

updateDisplay();
