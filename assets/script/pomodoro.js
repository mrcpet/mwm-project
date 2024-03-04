// Set the end date for the timer. ...
// Make the timer function update every second. ...
// Calculate the remaining time in days, hours, minutes, and seconds. ...
// ​Display the output to users. ...
// Display a message when the timer is over. ...
// Implementation.

const pomodoro = 25 * 60;
const shortBreak = 5 * 60;
const longBreak = 15 * 60;

function timer(seconds) {
  let time = seconds;
  const countDown = setInterval(() => {
    console.log(time);
    time--;
    if (time < 0) {
      clearInterval(countDown);
    }
  }, 1000);
}
// timer(shortBreak);
