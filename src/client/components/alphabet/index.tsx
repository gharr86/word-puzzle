import React, { CSSProperties, ReactElement } from 'react';
import { nanoid } from 'nanoid';

import { AlphabetProps, GuessLetter, GuessStatus } from '../../types';

import { getAllLetters } from './utils';
import { getBackgroundColor } from '../../utils';

const Alphabet = ({ guessWordsList }: AlphabetProps): JSX.Element => {
  const letterList: GuessLetter[] = getAllLetters(guessWordsList);
  const getLetterStyle = (status: GuessStatus): CSSProperties => {
    return {
      background: getBackgroundColor(status),
      color: status === 'none' ? '#000' : '#FFF',
    };
  };

  return (
    <div className="alphabet">
      {
        letterList.map((letter: GuessLetter): ReactElement => (
          <div
            className="alphabet__letter"
            style={getLetterStyle(letter.status)}
            key={nanoid()}
          >
            {letter.value}
          </div>
        ))
      }
    </div>
  );
};

export default Alphabet;
