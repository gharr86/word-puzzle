export type GuessStatus = 'correct' | 'wrong-position' | 'incorrect' | 'none';

export interface LetterElement {
  value: string
}

export interface GuessLetter {
  value: string
  status: GuessStatus
}
