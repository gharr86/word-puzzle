export interface LetterInputProps {
  inputValue: string
  onChange: (value: string) => void
  onKeyUp: (key: string) => void
  ref?: (input: HTMLInputElement) => void
}
