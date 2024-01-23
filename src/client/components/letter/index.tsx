import { LetterProps } from './types';
import StyledDiv from './styles';

const Letter: React.FC<LetterProps> = ({ status, children }) => (
  <StyledDiv status={status}>{children}</StyledDiv>
);

export default Letter;
