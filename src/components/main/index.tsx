import React, { ReactElement, useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';

import LetterInput from '../letterInput';

import { Letter, GameOver, GuessLetter } from '../../types';

import { getInitialInputList, getValues, getGuess } from './utils';

const word: string = 'PATAS';

const Main = (): JSX.Element => {
  const [inputList, setInputList] = useState<Letter[]>(getInitialInputList(word));
  const [gameIsOver, setGameIsOver] = useState<GameOver | null>(null);
  const [guessList, setGuessList] = useState<GuessLetter[][]>([]);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    const guessArray: string[] = getValues(inputList);
    const nextEmptyValue: number = guessArray.findIndex((value): boolean => value.length === 0);

    if (nextEmptyValue !== -1) {
      inputRefs.current[nextEmptyValue].focus();
    } else {
      const wordArray: string[] = word.split('');
      const guess = getGuess(guessArray, wordArray);
      const guessIsCorrect: boolean = guessArray
        .every((letter: string, index: number): boolean => wordArray[index] === letter);
        
      const currentGuessList: GuessLetter[][] = [...guessList];
      currentGuessList.push(guess);
      setGuessList(currentGuessList);

      if (guessIsCorrect) return setGameIsOver({ win: true });

      setInputList(getInitialInputList(word));
    }
  }, [inputList]);

  const updateValue = (newValue: string, index: number): void => {
    const currentInputList: Letter[] = [...inputList];
    const newTargetInput: Letter = {
      ...currentInputList[index],
      value: newValue.toUpperCase(),
    };

    currentInputList[index] = newTargetInput;

    setInputList(currentInputList);
  };

  const handleOnKeyUp = (key: string, index: number): void => {
    if (key === 'Backspace' && index !== 0) {
      updateValue('', index - 1);
    }
  };

  return (
    <main className="main">
      <section className="main__input-list-container">
        {
          inputList.map((letter: Letter, index: number): ReactElement => (
            <LetterInput
              key={nanoid()}
              value={letter.value}
              onChange={newValue => updateValue(newValue, index)}
              onKeyUp={key => handleOnKeyUp(key, index)}
              ref={input => {
                if (input) inputRefs.current[index] = input;
              }}
              />
          ))
        }
      </section>
    </main>
  );
}

export default Main;
