import Button from '../button';

import { GameOverPromptProps } from './types';
import { Background, Prompt, Message, Word } from './styles';

import { WIN_MESSAGE, LOOSE_MESSAGE, PLAY_AGAIN_TEXT } from '../../constants';

const GameOverPrompt: React.FC<GameOverPromptProps> = ({
  onClickOutside,
  word,
  didWin,
  onClickBtn,
}) => {
  const winText = didWin
    ? WIN_MESSAGE
    : LOOSE_MESSAGE;

  return (
    <>
      <Background
        role="button"
        onClick={onClickOutside}
      />
      <Prompt>
        <Message>
          {winText}
        </Message>
        {
          !didWin
          && (
            <Word>
              {word}
            </Word>
          )
        }
        <Button
          text={PLAY_AGAIN_TEXT}
          onClick={onClickBtn}
        />
      </Prompt>
    </>
  );
};

export default GameOverPrompt;
