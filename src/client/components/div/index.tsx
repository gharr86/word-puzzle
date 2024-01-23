import StyledDiv from './styles';
import { DivProps } from './types';

const Div: React.FC<DivProps> = ({ children }) => (
  <StyledDiv>
    {children}
  </StyledDiv>
);

export default Div;