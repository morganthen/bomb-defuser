export default function render(game) {
  const gameOver = document.querySelector(".game-over");
  const gameOverMsg = document.querySelector(".game-over__message");
  const wordDisplay = document.querySelector(".word-display");
  const guessesRemaining = document.querySelector(".guesses-remaining");
  const headerMessage = document.querySelector(".header__message");

  guessesRemaining.textContent = game.summary.guessesRemaining;
  headerMessage.textContent = game.summary.message;

  wordDisplay.innerHTML = `${game.displayWord
    .map((el) => {
      return `<span class="word-display__letter">${el}</span>`;
    })
    .join("")}`;

  // update keyboard button states
  document.querySelectorAll(".keyboard__key").forEach((btn) => {
    const letter = btn.dataset.letter;
    btn.classList.remove("keyboard__key--correct", "keyboard__key--wrong");
    btn.disabled = false;

    if (game.correctGuesses.includes(letter)) {
      btn.classList.add("keyboard__key--correct");
      btn.disabled = true;
    } else if (game.wrongGuesses.includes(letter)) {
      btn.classList.add("keyboard__key--wrong");
      btn.disabled = true;
    }
  });

  if (game.status === "LOST" || game.status === "WIN") {
    gameOver.classList.add("game-over--show");
    gameOverMsg.textContent =
      game.status === "LOST" ? "WASTED" : "BOMB DEFUSED";
  } else {
    gameOver.classList.remove("game-over--show");
  }
}
