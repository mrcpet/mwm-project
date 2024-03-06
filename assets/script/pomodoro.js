const timerDisplayEl = document.querySelector("#timer-display");
const startPauseBtn = document.querySelector("#start-pause-button");
const restartBtn = document.querySelector("#restart-button");
const pomodoroBtn = document.querySelector("#pomodoro");
const shortBreakBtn = document.querySelector("#short-break");
const longBreakBtn = document.querySelector("#long-break");
const customTimeBtn = document.querySelector("#custom-time");
let selectedtime = 0; // ska alltid vara i sekunder
let countDown;
let isTimerRunning = false;

pomodoroBtn.addEventListener("click", () => {
  handleButtonClick(pomodoroBtn.value);
});
shortBreakBtn.addEventListener("click", () => {
  handleButtonClick(shortBreakBtn.value);
});
longBreakBtn.addEventListener("click", () => {
  handleButtonClick(longBreakBtn.value);
});
startPauseBtn.addEventListener("click", () => {
  isTimerRunning ? stopTimer(countDown) : startTimer(selectedtime);
  isTimerRunning = !isTimerRunning;
  changeIconSet(isTimerRunning);
});
restartBtn.addEventListener("click", () => {});

//--------------Funktioner--------------

// funktion omvandlar sekunder till rätt format och uppdaterar DOMen.
function updateDisplay(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  timerDisplayEl.innerHTML = `${minutes}:${seconds}`;
}
// Hämtar värdet från kanppen och deklarerar global variabel.
function handleButtonClick(value) {
  selectedtime = transformToSeconds(value);
  updateDisplay(selectedtime);
}

// Omvandlar minute till sekunder.
function transformToSeconds(minutes) {
  return minutes * 60;
}
// Startar timer med värde och avslutar vid 0.
function startTimer(time) {
  let seconds = time;
  countDown = setInterval(() => {
    updateDisplay(seconds);
    seconds--;
    selectedtime = seconds;

    if (seconds < 0) {
      clearInterval(countDown);
    }
  }, 100);
}
// Stoppar intervallen och
function stopTimer(interval) {
  clearInterval(interval);
}
function removeHidden(elem) {
  elem.classList.remove("hidden");
}
function addHidden(elem) {
  elem.classList.add("hidden");
}

function changeIconSet(boolean) {
  boolean
    ? ((startPauseBtn.innerHTML =
        '<img src="/assets/icons/Icon/pomodoro/Icon/Outline/pause-circle.svg" />'),
      removeHidden(restartBtn))
    : ((startPauseBtn.innerHTML =
        '<img src="/assets/icons/Icon/pomodoro/Icon/Outline/play-circle.svg" />'),
      addHidden(restartBtn));
}
