import StyledContainer from './styles'
import { CircularProgress } from '@mui/material'

const Spinner: React.FC<Record<string, never>> = () => (
  <StyledContainer data-testid="spinner">
    <CircularProgress />
  </StyledContainer>
)

export default Spinner
