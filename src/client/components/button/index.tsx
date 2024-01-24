import StyledButton from './styles'
import { ButtonProps } from './types'

const Button: React.FC<ButtonProps> = ({ onClick, text }) => (
  <StyledButton
    onClick={onClick}
  >
    {text}
  </StyledButton>
)

export default Button
