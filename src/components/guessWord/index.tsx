import React, { ReactElement } from 'react';
import { nanoid } from 'nanoid';

import { GuessLetter, GuessWordProps } from '../../types';

const backgrounds = {
  correct: '#0b8c34',
  'wrong-position': '#946f00',
  incorrect: '#5e5e5e',
};

const GuessWord = ({ letters }: GuessWordProps): JSX.Element => {
  return (
    <div className="guess-word">
      {
        letters.map((guessLetter: GuessLetter): ReactElement => (
          <div
            className="guess-word__letter"
            style={{ background: backgrounds[guessLetter.status] }}
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