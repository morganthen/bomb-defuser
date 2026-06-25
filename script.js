import { BombGame } from "./class.js";
import render from "./render.js";
import words from "./example-words.json" with { type: "json" };

let targetWord = words[Math.floor(Math.random() * words.length)];
console.log(targetWord);
const maxGuesses = 6;

let game = new BombGame(targetWord, maxGuesses);

const resetBtn = document.querySelector(".resetBtn");
const gameOver = document.querySelector(".game-over");

// single entry point for both keyboard and clicks
function handleGuess(letter) {
  game.guess(letter);
  render(game);
}

// physical keyboard
document.addEventListener("keydown", (event) => {
  if (!/^[a-zA-Z]$/.test(event.key)) return;
  handleGuess(event.key.toLowerCase());
});

// on-screen keyboard
document.querySelector(".keyboard").addEventListener("click", (event) => {
  const btn = event.target.closest(".keyboard__key");
  if (!btn || btn.disabled) return;
  handleGuess(btn.dataset.letter);
});

//reset button functionality
resetBtn.addEventListener("click", () => {
  console.log("reset button clicked");
  targetWord = words[Math.floor(Math.random() * words.length)];
  console.log(targetWord);
  game = new BombGame(targetWord, maxGuesses);
  gameOver.classList.remove("game-over--show");
  render(game);
});

render(game);
