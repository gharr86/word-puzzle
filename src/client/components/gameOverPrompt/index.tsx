import React from 'react';

import { GameOverPromptProps } from '../../types';

const GameOverPrompt = ({
  onClickOutside,
  word,
  didWin,
}: GameOverPromptProps): JSX.Element => {
  const winText: string = didWin
    ? 'GANASTE :)'
    : 'PERDISTE :(';

  return (
    <>
      <div
        className="game-over-prompt__background"
        role="button"
        onClick={onClickOutside}
      />
      <div className="game-over-prompt__prompt">
        <p className="game-over-prompt__prompt__message">
          {winText}
        </p>
        {
          !didWin
          && (
            <p className="game-over-prompt__prompt__word">
              {word}
            </p>
          )
        }
      </div>
    </>
  );
};

export default GameOverPrompt;
