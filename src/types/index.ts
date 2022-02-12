type InputStatus = 'correct' | 'wrong-position' | 'incorrect' | 'empty'

export interface Letter {
  value: string
  status: InputStatus
}

export interface LetterInputProps {
  value: string
  onChange: (value: string) => void
  status: InputStatus
}
