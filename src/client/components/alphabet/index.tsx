import { FC } from 'react';
import { nanoid } from 'nanoid';

import AlphabetLetter from './alphabetLetter';
import { getAllLetters } from './utils';

import { AlphabetProps, GuessLetter } from '../../types';
import { StyledContainer } from './styles';

const Alphabet: FC<AlphabetProps> = ({ guessWordsList }) => {
  const letterList: GuessLetter[] = getAllLetters(guessWordsList);

  return (
    <StyledContainer>
      {
        letterList.map((letter: GuessLetter) => (
          <AlphabetLetter
            display="flex"
            justifyContent="center"
            status={letter.status}
            key={nanoid()}
          >
            {letter.value}
          </AlphabetLetter>
        ))
      }
    </StyledContainer>
  );
};

export default Alphabet;
