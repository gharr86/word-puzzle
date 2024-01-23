import StyledContainer from './styles';
import { CircularProgress } from '@mui/material';

const Spinner: React.FC<Record<string, never>> = () => (
  <StyledContainer display="flex" justifyContent="center" data-testid="spinner">
    <CircularProgress />
  </StyledContainer>
);

export default Spinner;
