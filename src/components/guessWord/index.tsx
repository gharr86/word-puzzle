import React, { ReactElement } from 'react';
import { nanoid } from 'nanoid';

import { GuessLetter, GuessWordProps } from '../../types';

import { getBackgroundColor } from '../../utils';

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