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

export interface GameOver {
  win: boolean
}

export interface GuessWordProps {
  letters: GuessLetter[]
}

export interface AlphabetProps {
  guessWordsList: GuessLetter[][]
}
