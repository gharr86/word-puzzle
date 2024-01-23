import { FC } from 'react';
import { nanoid } from 'nanoid';

import { GuessLetter, GuessWordProps } from '../../types';
import { StyledContainer, GuessWordLetter } from './styles';

const GuessWord: FC<GuessWordProps> = ({ letters }) => (
  <StyledContainer>
    {
      letters.map((guessLetter: GuessLetter) => (
        <GuessWordLetter
          status={guessLetter.status}
          key={nanoid()}
        >
          {guessLetter.value}
        </GuessWordLetter>
      ))
    }
  </StyledContainer>
);

export default GuessWord;
