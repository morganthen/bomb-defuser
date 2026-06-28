import { BombGame } from "./js/class.js";

const START_TIME = 60;
let timeRemaining = START_TIME;
let timerInterval = null;
let timerStarted = false;

export function startTimer() {
  if (timerStarted) return;
  timerStarted = true;

  timerInterval = setInterval(() => {
    timeRemaining--;
    document.querySelector(".timer__display").textContent = timeRemaining;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  });
}
