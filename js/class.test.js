import { BombGame } from "./class";

describe("BombGame", () => {
  describe("constructor", () => {
    it("initiliazes with the given word and max guesses", () => {
      const game = new BombGame("hello", 5);
      expect(game.word).toBe("hello");
      expect(game.maxGuesses).toBe(5);
      expect(game.guessedLetters).toEqual([]);
    });
  });

  describe("displayWord", () => {
    it("shows all underscores before any guesses", () => {
      const game = new BombGame("dog", 3);
      expect(game.displayWord).toEqual(["_", "_", "_"]);
    });
    it("reveals correctly guessed words", () => {
      const game = new BombGame("papaya", 6);
      game.guess("p");
      expect(game.displayWord).toEqual(["p", "_", "p", "_", "_", "_"]);
    });
  });

  describe("status", () => {
    it("returns DORMANT upon game initialisation", () => {
      const game = new BombGame("cat", 3);
      expect(game.status).toBe("DORMANT");
    });

    it("returns LIVE after a first guess", () => {
      const game = new BombGame("elf", 3);
      game.guess("e");
      expect(game.status).toBe("LIVE");
    });

    it("returns WIN after all letters are guessed", () => {
      const game = new BombGame("bar", 3);
      game.guess("b");
      game.guess("a");
      game.guess("r");
      expect(game.status).toBe("WIN");
    });

    it("returns LOST when max guesses exceeded", () => {
      const game = new BombGame("bar", 3);
      game.guess("f");
      game.guess("o");
      game.guess("i");
      expect(game.status).toBe("LOST");
    });
    it("returns LOST when time is up", () => {
      const game = new BombGame("ab", 5);
      game.loseByTime();
      expect(game.status).toBe("LOST");
    });
  });

  describe("guess", () => {
    it("adds letter to guessedLetters", () => {
      const game = new BombGame("foo", 6);
      game.guess("f");
      expect(game.guessedLetters).toContain("f");
    });

    it("does not allow any more guesses after game is lost", () => {
      const game = new BombGame("abc", 3);
      game.guess("d");
      game.guess("e");
      game.guess("f");
      game.guess("g");
      expect(game.guessedLetters).not.toContain("g");
    });

    it("does not allow duplicate guesses", () => {
      const game = new BombGame("abc", 3);
      game.guess("d");
      game.guess("d");
      expect(
        game.guessedLetters.filter((letter) => letter === "d").length,
      ).toBe(1);
    });
  });

  describe("lettersRemaining", () => {
    it("returns the correct number of letters remaining after a correct guess", () => {
      const game = new BombGame("abc", 3);
      game.guess("a");
      expect(game.lettersRemaining).toBe(2);
    });
    it("returns the correct number of letters remaining after a wrong guess", () => {
      const game = new BombGame("abc", 3);
      game.guess("d");
      expect(game.lettersRemaining).toBe(3);
    });

    it("returns the correct number of letters remaining with duplicate letters in target word", () => {
      const game = new BombGame("foo", 3);
      game.guess("o");
      expect(game.lettersRemaining).toBe(1);
    });
  });

  describe("guessesRemaining", () => {
    it("returns the correct number of guesses during initialisation", () => {
      const game = new BombGame("abc", 5);
      expect(game.guessesRemaining).toBe(5);
    });
    it("returns the correct number of guesses remaining after correct guess", () => {
      const game = new BombGame("abc", 3);
      game.guess("a");
      expect(game.guessesRemaining).toBe(3);
    });
    it("returns the correct number of guesses remaining after wrong guess", () => {
      const game = new BombGame("abc", 3);
      game.guess("d");
      expect(game.guessesRemaining).toBe(2);
    });
  });
});
