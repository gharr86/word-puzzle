import React, { ReactElement, useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';

import LetterInput from '../letterInput';
import GuessWord from '../guessWord';
import Alphabet from '../alphabet';
import GameOverPrompt from '../gameOverPrompt';

import { Letter, GuessLetter, GameProps } from '../../types';

import { getInitialInputList, getValues, getGuess, arrayValuesAreEqual } from './utils';

const Game = ({ word }: GameProps): JSX.Element => {
  const [inputList, setInputList] = useState<Letter[]>(getInitialInputList(word));
  const [guessList, setGuessList] = useState<GuessLetter[][]>([]);
  const [didWin, setDidWin] = useState<boolean>(false);
  const [showGameOverPrompt, setShowGameOverPrompt] = useState<boolean>(false);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const submitWord = (guessArray: string[]): void => {
    const wordArray: string[] = word.split('');
    const guessObj: GuessLetter[] = getGuess(guessArray, wordArray);
    const guessIsCorrect: boolean = arrayValuesAreEqual(guessArray, wordArray);

    setGuessList((prevGuessList: GuessLetter[][]) => ([
      ...prevGuessList,
      guessObj,
    ]));

    if (guessIsCorrect) {
      setDidWin(true);
      setShowGameOverPrompt(true);

      return;
    } else if (guessList.length > 5) {
      setDidWin(false);
      setShowGameOverPrompt(true);

      return;
    }

    setInputList(getInitialInputList(word));
  };

  useEffect(() => {
    const guessArray: string[] = getValues(inputList);
    const nextEmptyIndex: number = guessArray.findIndex((value): boolean => value.length === 0);

    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex].focus();
    } else {
      submitWord(guessArray);
    }
  }, [inputList]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateValue = (newValue: string, index: number): void => {
    const pattern: RegExp = new RegExp(/^[a-zA-Z]*$/g);

    if (pattern.test(newValue)) {
      const currentInputList: Letter[] = [...inputList];
      const newTargetInput: Letter = {
        ...currentInputList[index],
        value: newValue.toUpperCase(),
      };
  
      currentInputList[index] = newTargetInput;
  
      setInputList(currentInputList);
    }
  };

  const handleOnKeyUp = (key: string, index: number): void => {
    if (key === 'Backspace' && index !== 0) {
      updateValue('', index - 1);
    }
  };

  const renderInputList: JSX.Element[] = inputList.map((letter: Letter, index: number): ReactElement => (
    <LetterInput
      key={nanoid()}
      value={letter.value}
      onChange={newValue => updateValue(newValue, index)}
      onKeyUp={key => handleOnKeyUp(key, index)}
      ref={input => {
        if (input) inputRefs.current[index] = input;
      }}
    />
  ));

  const renderGuessList: JSX.Element[] = guessList.map((guessWordArray: GuessLetter[], index: number): ReactElement => {
    const guessNumber: string = `${index + 1}.`;

    return (
      <div className="guess-word-container" key={nanoid()}>
        <span className="guess-word-container__guess-number">{guessNumber}</span>
        <GuessWord key={nanoid()} letters={guessWordArray} />
      </div>
    );
  });

  return (
    <>
      <section className="game">
        <section className="game__input-list-container">
          {renderInputList}
        </section>
        <section className="game__guess-container">
          <div className="game__guess-container__guess-list">
            {renderGuessList}
          </div>
          <div className="game__guess-container__alphabet">
            <Alphabet guessWordsList={guessList} />
          </div>
        </section>
      </section>
      {
        showGameOverPrompt
        && (
          <GameOverPrompt
            didWin={didWin}
            word={word}
            onClickOutside={() => setShowGameOverPrompt(false)}
          />
        )
      }
    </>
  );
}

export default Game;
