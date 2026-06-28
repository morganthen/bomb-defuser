export class BombGame {
  constructor(word, maxGuesses) {
    this.word = word;
    this.guessedLetters = [];
    this.maxGuesses = maxGuesses;
    this.numberOfLettersToGuess = [...new Set(this.word.split(""))].length;
    this.timeUp = false;
  }

  guess(letter) {
    //no guesses if won or lost
    if (this.isLost || this.isWon) return;
    //check for already guessed letters
    if (this.guessedLetters.includes(letter)) return;
    this.guessedLetters.push(letter);
  }

  loseByTime() {
    this.timeUp = true;
  }

  get displayWord() {
    return this.word
      .split("")
      .map((l) => (this.guessedLetters.includes(l) ? l : "_"));
  }

  get status() {
    if (this.isLost) {
      return "LOST";
    }
    if (this.isWon) {
      return "WIN";
    }
    if (this.guessedLetters.length > 0 && !this.isLost && !this.isWon) {
      return "LIVE";
    }

    return "DORMANT";
  }

  get wrongGuesses() {
    //deriving wrong guesses and returns an array
    return this.guessedLetters.filter((l) => !this.word.includes(l));
  }

  get correctGuesses() {
    return this.guessedLetters.filter((l) => this.word.includes(l));
  }

  get isLost() {
    return this.wrongGuesses.length >= this.maxGuesses || this.timeUp;
  }

  get isWon() {
    return this.correctGuesses.length === this.numberOfLettersToGuess;
  }

  get summary() {
    let details = {
      lettersRemaining: `${this.numberOfLettersToGuess - this.correctGuesses.length}`,
      guessesRemaining: `${this.maxGuesses - this.wrongGuesses.length}`,
      message: "",
    };

    switch (this.status) {
      case "LOST":
        details.message = this.timeUp ? "TIME'S UP" : "WASTED";
        break;
      case "WIN":
        details.message = "BOMB SUCCESSFULLY DEFUSED";
        break;
      case "LIVE":
        details.message = `BOMB IS LIVE`;
        break;
      case "DORMANT":
        details.message = `BOMB IS DORMANT`;
        break;
    }

    return details;
  }
}
