import { AlphabetLetterProps } from './types';
import StyledDiv from './styles';

const AlphabetLetter: React.FC<AlphabetLetterProps> = ({ status, children, ...props }) => (
  <StyledDiv status={status} {...props}>{children}</StyledDiv>
);

export default AlphabetLetter;
