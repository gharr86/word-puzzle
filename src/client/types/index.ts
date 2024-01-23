export type GuessStatus = 'correct' | 'wrong-position' | 'incorrect' | 'none';

export interface Letter {
  value: string
}

export interface GuessLetter {
  value: string
  status: GuessStatus
}

export interface GuessWordProps {
  letters: GuessLetter[]
}

export interface GameOverPromptProps {
  onClickOutside: () => void
  word: string
  didWin: boolean
  onClickBtn: () => void
}

export interface GameProps {
  word: string
}
