export interface LetterInputProps {
  value: string
  onChange: (value: string) => void
  status: 'correct' | 'wrong-position' | 'incorrect' | 'empty'
}
