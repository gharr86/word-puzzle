import { forwardRef, InputHTMLAttributes } from 'react'

import StyledInput from './styles'

const LetterInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
    <StyledInput ref={ref} {...props} />
  ))

export default LetterInput
