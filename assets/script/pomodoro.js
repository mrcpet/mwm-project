const timerDisplayEl = document.querySelector("#timer-display");
const startPauseBtn = document.querySelector("#start-pause-button");
const restartBtn = document.querySelector("#restart-button");
const pomodoroBtn = document.querySelector("#pomodoro");
const shortBreakBtn = document.querySelector("#short-break");
const longBreakBtn = document.querySelector("#long-break");
const customTimeBtn = document.querySelector("#custom-time");
const customInput = document.querySelector("#custom-input");
const addCustomTimeBtn = document.querySelector("#add-custom-time");
const cancelBtn = document.querySelector("#cancel");
let selectedtime = 0; // Ska alltid vara i sekunder
let timeOption = 0; // Ska vara i minuter
let countDown; // Intervallen
let isTimerRunning = false; // true när timer tickar och annars false

// ----------- Kod Flöde---------------------

startState(25);

pomodoroBtn.addEventListener("click", () => {
  handleTimeSelection(pomodoroBtn.value);
});
shortBreakBtn.addEventListener("click", () => {
  handleTimeSelection(shortBreakBtn.value);
});
longBreakBtn.addEventListener("click", () => {
  handleTimeSelection(longBreakBtn.value);
});
customTimeBtn.addEventListener("click", () => {
  addHidden(pomodoroBtn, shortBreakBtn, longBreakBtn, customTimeBtn);
  removeHidden(customInput, addCustomTimeBtn, cancelBtn);
});
cancelBtn.addEventListener("click", () => {
  removeHidden(pomodoroBtn, shortBreakBtn, longBreakBtn, customTimeBtn);
  addHidden(customInput, addCustomTimeBtn, cancelBtn);
});
addCustomTimeBtn.addEventListener("click", () => {
  handleTimeSelection(getValueFromInput(customInput));
});
startPauseBtn.addEventListener("click", () => {
  isTimerRunning ? stopTimer(countDown) : startTimer(selectedtime);
  playOrPauseTimer();
  changeIconSet(isTimerRunning);
});
restartBtn.addEventListener("click", () => {
  stopTimer(countDown);
  playOrPauseTimer();
  changeIconSet(isTimerRunning);
  startState(timeOption);
});

//--------------Funktioner--------------

// funktion omvandlar sekunder till rätt format och uppdaterar DOMen.
function updateDisplay(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  timerDisplayEl.innerHTML = `${minutes}:${seconds}`;
}
function clearDisplay() {
  timerDisplayEl.innerHTML = "";
}
// Hämtar värdet från kanppen och deklarerar global variabel.
function handleTimeSelection(value) {
  timeOption = value;
  selectedtime = transformToSeconds(value);
  updateDisplay(selectedtime);
}

// Omvandlar minute till sekunder.
function transformToSeconds(minutes) {
  return minutes * 60;
}
// Spara tid alternativet som väljs i global variable
function transformToMinutes(seconds) {
  return seconds / 60;
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
      changeIconSet(false);
    }
  }, 10);
}
// Stoppar intervallen och
function stopTimer(interval) {
  clearInterval(interval);
}

// Ta bort hidden klassen som består av display:none
function removeHidden(...elements) {
  elements.forEach((elem) => elem.classList.remove("hidden"));
}
// Lägger till hidden klassen som består av display:none
function addHidden(...elements) {
  elements.forEach((elem) => elem.classList.add("hidden"));
}
function playOrPauseTimer() {
  isTimerRunning = !isTimerRunning;
}

// Ändrar iconer i DOMen beroende om timer är igång eller inte.
function changeIconSet(boolean) {
  boolean
    ? ((startPauseBtn.innerHTML =
        '<img src="/assets/icons/Icon/pomodoro/Icon/Outline/pause-circle.svg" />'),
      removeHidden(restartBtn))
    : ((startPauseBtn.innerHTML =
        '<img src="/assets/icons/Icon/pomodoro/Icon/Outline/play-circle.svg" />'),
      addHidden(restartBtn));
}

//  Startläge för hemsidan
function startState(time) {
  selectedtime = transformToSeconds(time);
  updateDisplay(selectedtime);
}

function getValueFromInput(elem) {
  return parseInt(elem.value);
}
