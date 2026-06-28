export const KEYBOARD_LAYOUT = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

export function buildKeyboard() {
  const keyboardEl = document.querySelector(".keyboard");
  KEYBOARD_LAYOUT.forEach((row) => {
    const rowEl = document.createElement("div");
    rowEl.classList.add("keyboard__row");

    row.forEach((letter) => {
      const key = document.createElement("button");
      key.classList.add("keyboard__key", "nes-btn");
      key.dataset.letter = letter;

      const span = document.createElement("span");
      span.textContent = letter.toUpperCase();

      key.appendChild(span);
      rowEl.appendChild(key);
    });
    keyboardEl.appendChild(rowEl);
  });
}
