import React, { ReactElement, useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';

import LetterInput from '../letterInput';
import GuessWord from '../guessWord';
import Alphabet from '../alphabet';

import { Letter, GameOver, GuessLetter } from '../../types';

import { getInitialInputList, getValues, getGuess, arrayValuesAreEqual } from './utils';

const word: string = 'VIAJE';

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
    const nextEmptyIndex: number = guessArray.findIndex((value): boolean => value.length === 0);

    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex].focus();
    } else {
      const wordArray: string[] = word.split('');
      const guessObj: GuessLetter[] = getGuess(guessArray, wordArray);
      const guessIsCorrect: boolean = arrayValuesAreEqual(guessArray, wordArray);

      setGuessList((prevGuessList: GuessLetter[][]) => ([
        ...prevGuessList,
        guessObj,
      ]));

      if (guessIsCorrect) return setGameIsOver({ win: true });

      setInputList(getInitialInputList(word));
    }
  }, [inputList]);

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
    <main className="main">
      <section className="main__input-list-container">
        {renderInputList}
      </section>
      <section className="main__guess-container">
        <div className="main__guess-container__guess-list">
          {renderGuessList}
        </div>
        <div className="main__guess-container__alphabet">
          <Alphabet guessWordsList={guessList} />
        </div>
      </section>
    </main>
  );
}

export default Main;
