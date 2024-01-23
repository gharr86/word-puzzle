import styled from 'styled-components';

import Letter from '../letter';
import { LetterProps } from '../letter/types';

export const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 3px;
`;

export const GuessWordLetter = styled(Letter)<LetterProps>`
  width: 30px;
  height: 30px;
  border-radius: 3px;
  font-size: 1.1rem;
`;
