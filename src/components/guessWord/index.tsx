import React, { ReactElement } from 'react';
import { nanoid } from 'nanoid';

import { GuessStatus, GuessLetter, GuessWordProps } from '../../types';

const getBackgroundColor = (status: GuessStatus): string => {
  switch (status) {
    case 'correct':
      return '#0b8c34';
    case 'wrong-position':
      return '#946f00';
    case 'incorrect':
      return '#5e5e5e';
    default:
      return '';
  }
};

const GuessWord = ({ letters }: GuessWordProps): JSX.Element => {
  return (
    <div className="guess-word">
      {
        letters.map((guessLetter: GuessLetter): ReactElement => (
          <div
            className="guess-word__letter"
            style={{ background: getBackgroundColor(guessLetter.status) }}
            key={nanoid()}
          >
            {guessLetter.value}
          </div>
        ))
      }
    </div>
  )
}

export default GuessWord