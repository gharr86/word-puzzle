export type GuessStatus = 'correct' | 'wrong-position' | 'incorrect' | 'none'

export interface Letter {
  value: string
}

export interface GuessLetter {
  value: string
  status: GuessStatus
}

export interface LetterInputProps {
  value: string
  onChange: (value: string) => void
  onKeyUp: (key: string) => void
}

export interface GuessWordProps {
  letters: GuessLetter[]
}

export interface AlphabetProps {
  guessWordsList: GuessLetter[][]
}

export interface GameOverPromptProps {
  onClickOutside: () => void
  word: string
  didWin: boolean
}
