# WORD PUZZLE

Word puzzle game.

![Alt text](./screenshot.jpg?raw=true "Word Puzzle")

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run server`

Runs server in development mode.\
Base URL is [http://localhost:3001](http://localhost:3001)

- [GET] /words --> Returns random word. Optional `word_length: number` query param

- [POST] /words --> Checks if word exists in list. Body shape must be `{ word: string }`

### `npm run dev`

Runs both app and server in development mode.\

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
