# Bomb Defusal

A Hangman variant built for the nology bootcamp. Word-guessing game reimagined as a bomb-defusal scenario — 60-second timer, wrong guesses bring you closer to detonation, and the UI reacts at every step.

**Live:** https://bomb-defuser-ebon.vercel.app/
**Repo:** https://github.com/morganthen/bomb-defuser

## The brief

Build a web-based Hangman game covering arrays, iterators, DOM manipulation, event listeners, and string manipulation. Random word selection, underscore display, 26-letter on-screen keyboard, guess tracking, win/loss states, and a play-again flow.

## What I built

I took the brief and gave it a narrative. Instead of a stick figure on a gallows, you're defusing a bomb. A looping video runs in the background. A CRT scanline overlay sits on top. Audio feedback on every interaction — key clicks, error buzzes, a ticking timer, and an explosion video when you fail.

| Brief requirement     | Implementation                                                                                                 |
| --------------------- | -------------------------------------------------------------------------------------------------------------- |
| Random word selection | 201 words across 20+ categories in `example-words.json`, imported as static JSON                               |
| Underscore display    | `.word-display` with color-coded letter reveals (`#00e676` electric green)                                     |
| 26-letter keyboard    | QWERTY layout built from a 2D array in `keyboard.js`, NES.CSS-styled buttons, color-coded correct/wrong states |
| Guess tracking        | `BombGame.guessedLetters` array, duplicate-guess guard, disabled buttons                                       |
| Win/loss messaging    | `<dialog>` modal with pulse-animated message, answer reveal, and play-again button                             |
| Play again            | Full state reset — new word, timer cleared, videos swapped back, audio killed, DOM re-rendered                 |

**Beyond MVP:**

- Physical keyboard input alongside on-screen buttons
- 60-second countdown timer with progress bar (switches from warning to danger at 10s)
- Background video swap on loss (warehouse → explosion)
- Sound design: correct guess, wrong guess, timer tick, defusal success, explosion
- CRT scanline overlay for atmosphere
- NES.CSS framework + `Press Start 2P` pixel font for a retro-terminal aesthetic
- Favicon: hand-drawn pixel-art bomb SVG

## Architecture

```
script.js          — entry point, game loop, event listeners, timer, audio/video orchestration
js/
  class.js         — BombGame class (pure logic, zero DOM)
  render.js        — DOM updates from game state
  keyboard.js      — QWERTY layout + keyboard DOM builder
  class.test.js    — Jest unit tests for BombGame
example-words.json — 201-word dataset
style.scss         — SCSS entry point → compiled to style.css
scss/
  components/      — _background, _game-container, _game-over, _header, _keyboard, _timer, _word-display
  partials/        — _colors, _mixins, _noir
```

**Separation of concerns:** `BombGame` knows nothing about the DOM. `render.js` knows nothing about game logic — it reads getters and paints the screen. `script.js` wires them together and owns the side effects (audio, video, timer). This is why I could write 28 unit tests against the game logic without touching a browser.

## Testing

```bash
npm test
```

28 Jest tests covering `BombGame`: constructor, `displayWord`, `status` (DORMANT / LIVE / WIN / LOST-by-guesses / LOST-by-time), `guess` (correct, wrong, duplicate, post-game rejection), `lettersRemaining`, `guessesRemaining`. Zero config — Jest + Babel, no `jest.config` needed for the unit suite.

DOM tests next: `jest-environment-jsdom` for the render pipeline.

## Tech stack

| Layer    | Choice                                                     |
| -------- | ---------------------------------------------------------- |
| Language | Vanilla JavaScript (ES modules, no bundler)                |
| Styling  | SCSS → CSS, NES.CSS framework                              |
| Font     | Google Fonts — Press Start 2P                              |
| Testing  | Jest 30 + Babel                                            |
| Assets   | MP4 video backgrounds, MP3/WAV audio feedback, SVG favicon |
| Hosting  | Vercel                                                     |

## Local development

```bash
# Install dependencies (Jest + Babel for testing)
npm install

# Run tests
npm test

# Watch mode
npm run test:watch

# Serve locally (any static server works)
npx serve .
```

No build step — the browser loads ES modules directly.

## Design decisions worth mentioning

**OOP over procedural.** The brief didn't require a class, but modeling the game as a `BombGame` instance with getters (`displayWord`, `status`, `lettersRemaining`, `guessesRemaining`, `isWon`, `isLost`) made the render function a pure projection of state.

**Zero-config Jest.** By keeping `package.json` as CommonJS (no `"type": "module"`), Jest runs with no custom config, no `moduleNameMapper`, no `jest.config` file. Babel handles the ESM → CJS transform transparently. One less config file to explain.

**Static JSON import for the word list.** No fetch, no network dependency. `import words from "./example-words.json" with { type: "json" }` — the browser resolves it at parse time, Babel handles it in tests. 201 words across 20+ semantic categories.

**CSS architecture.** SCSS partials organized by component, not by property. `_colors.scss` and `_mixins.scss` as single-source-of-truth for the design tokens. NES.CSS provides the 8-bit UI primitives; custom styles layer the bomb-defusal theme on top.

## What I'd do next

- **Video poster placeholder** — extract first frame as a static JPEG, show it immediately via `::before` while the video buffers, crossfade on `loadeddata`. Plan written, ffmpeg extraction pending.
- **DOM tests via jsdom** — `render.test.js` covering word display updates, guess-remaining counters, keyboard button state toggles, game-over dialog show/hide.
- **Word tracking across sessions** — track used words, display win/loss history, remove used words from the pool (per the original bonus spec).
