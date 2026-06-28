import { BombGame } from "./js/class.js";
import render from "./js/render.js";
import words from "./example-words.json" with { type: "json" };
import { buildKeyboard } from "./js/keyboard.js";

let targetWord = words[Math.floor(Math.random() * words.length)];
const gameContainer = document.querySelector(".game-container");
const gameOver = document.querySelector(".game-over");
const gameOverAnswer = document.querySelector(".game-over__message--small");
const resetBtn = document.querySelector(".resetBtn");
const timerDisplay = document.querySelector(".timer__display");
const timer = document.querySelector(".timer");
const timerProgressBar = document.querySelector(".timer__progress");
const timerAudio = new Audio("assets/audio/timer_1min.mp3");
const boomAudio = new Audio("assets/audio/lose.mp3");
const winAudio = new Audio("assets/audio/defused.mp3");
const clickAudio = new Audio("assets/audio/click_1.mp3");
const errorAudio = new Audio("assets/audio/click_error.mp3");
const initAudio = new Audio("assets/audio/init.mp3");
const bgVideo = document.querySelector(".bg-video");
const keyboard = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const header = document.querySelector(".header");
const maxGuesses = 6;
const START_TIME = 60;
let timeRemaining = START_TIME;
let timerInterval = null;
let timerStarted = false;
let game = new BombGame(targetWord, maxGuesses);

function startTimer() {
  if (timerStarted) return;
  timerStarted = true;

  timerAudio.currentTime = 0;
  timerAudio.play();

  timerInterval = setInterval(() => {
    timeRemaining--;
    timerProgressBar.value = (timeRemaining / START_TIME) * 100;
    timerDisplay.textContent = timeRemaining;

    if (timeRemaining <= 10) {
      timerProgressBar.classList.remove("is-warning");
      timerProgressBar.classList.add("is-error");
    }

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      game.loseByTime();
      boomAudio.play();
      bgVideo.querySelector("source").src = "assets/video/explosion2.mp4";
      bgVideo.loop = false;
      bgVideo.load();
      bgVideo.play();
      render(game);
    }
  }, 1000);
}
function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerAudio.pause();
}

function resetTimer() {
  stopTimer();
  timeRemaining = START_TIME;
  timerStarted = false;
  timerDisplay.textContent = timeRemaining;
  timerProgressBar.value = 100;
  timerProgressBar.classList.remove("is-error");
  timerProgressBar.classList.add("is-warning");
  timerAudio.currentTime = 0;
}

function handleGuess(letter) {
  if (game.guessedLetters.includes(letter) || game.isLost || game.isWon) return;
  if (!timerStarted) startTimer();

  const isCorrect = game.word.includes(letter);

  game.guess(letter);

  if (isCorrect) {
    clickAudio.play();
  } else {
    errorAudio.play();
  }

  render(game);

  if (game.isLost || game.isWon) {
    stopTimer();
    if (game.isLost) {
      timerAudio.currentTime = 0;
      boomAudio.play();
      bgVideo.querySelector("source").src = "assets/video/explosion2.mp4";
      bgVideo.classList.add("noir--80");
      keyboard.classList.add("noir");
      timerProgressBar.classList.add("noir");
      timer.classList.add("noir");
      wordDisplay.classList.add("noir");
      header.classList.add("noir");
      bgVideo.loop = false;
      bgVideo.load();
      bgVideo.play();
    } else {
      timerAudio.currentTime = 0;
      winAudio.play();
      gameOverAnswer.textContent = "You Win";
    }
  }
}

//physical keyboard
document.addEventListener("keydown", (event) => {
  if (!/^[a-zA-Z]$/.test(event.key)) return;
  handleGuess(event.key.toLowerCase());
});

//on-screen keyboard
document.querySelector(".keyboard").addEventListener("click", (event) => {
  const btn = event.target.closest(".keyboard__key");
  if (!btn || btn.disabled) return;
  handleGuess(btn.dataset.letter);
});

resetBtn.addEventListener("click", () => {
  targetWord = words[Math.floor(Math.random() * words.length)];
  game = new BombGame(targetWord, maxGuesses);
  gameOverAnswer.textContent = targetWord;
  resetTimer();
  gameOver.classList.remove("game-over--show");
  bgVideo.querySelector("source").src = "assets/video/pre-explosion.mp4";
  bgVideo.classList.remove("noir--80");
  keyboard.classList.remove("noir");
  timerProgressBar.classList.remove("noir");
  timer.classList.remove("noir");
  wordDisplay.classList.remove("noir");
  header.classList.remove("noir");
  bgVideo.loop = true;
  bgVideo.load();
  bgVideo.play();
  render(game);
});

buildKeyboard();
gameOverAnswer.textContent = targetWord;
render(game);

//weird behaviour - ask alex
initAudio.play().catch(() => {
  document.addEventListener("click", () => initAudio.play(), { once: true });
});
