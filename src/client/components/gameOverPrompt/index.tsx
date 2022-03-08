import React from 'react';

import Button from '../button';

import { GameOverPromptProps } from '../../types';

import { WIN_MESSAGE, LOOSE_MESSAGE, PLAY_AGAIN_TEXT } from '../../constants';

const GameOverPrompt = ({
  onClickOutside,
  word,
  didWin,
  onClickBtn,
}: GameOverPromptProps): JSX.Element => {
  const winText: string = didWin
    ? WIN_MESSAGE
    : LOOSE_MESSAGE;

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
        <Button
          text={PLAY_AGAIN_TEXT}
          onClick={onClickBtn}
        />
      </div>
    </>
  );
};

export default GameOverPrompt;
