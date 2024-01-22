import StyledButton from './styles';
import { ButtonProps } from '../../types';

const Button = ({ onClick, text }: ButtonProps) => (
  <StyledButton
    onClick={onClick}
  >
    {text}
  </StyledButton>
);

export default Button;
