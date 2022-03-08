import React, { ReactElement, useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';

import LetterInput from '../letterInput';
import GuessWord from '../guessWord';
import Alphabet from '../alphabet';
import GameOverPrompt from '../gameOverPrompt';
import Spinner from '../spinner';

import { Letter, GuessLetter, GameProps } from '../../types';

import ApiService from '../../services/apiService';
import { MAX_GUESSES, WRONG_WORD_MESSAGE } from '../../constants';

import { getInitialInputList, getValues, getGuess, arrayValuesAreEqual } from './utils';

const Game = ({ word }: GameProps): JSX.Element => {
  const [inputList, setInputList] = useState<Letter[]>(getInitialInputList(word));
  const [guessList, setGuessList] = useState<GuessLetter[][]>([]);
  const [didWin, setDidWin] = useState<boolean>(false);
  const [showGameOverPrompt, setShowGameOverPrompt] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const resetInputs = (): void => {
    setInputList(getInitialInputList(word));
    inputRefs.current[0]?.focus();
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    const guessArray: string[] = getValues(inputList);
    const wordArray: string[] = word.split('');
    const guessIsCorrect: boolean = arrayValuesAreEqual(guessArray, wordArray);

    if (guessIsCorrect) {
      setDidWin(true);
      setShowGameOverPrompt(true);
    } else if (guessList.length > MAX_GUESSES) {
      setDidWin(false);
      setShowGameOverPrompt(true);
    } else {
      resetInputs();
    }
  }, [guessList]); // eslint-disable-line react-hooks/exhaustive-deps

  const checkWord = async (guessWord: string): Promise<void> => {
    setIsFetching(true);

    try {
      const { data: wordExists } = await ApiService.checkWord(guessWord);

      if (wordExists) {
        const guessArray: string[] = getValues(inputList);
        const wordArray: string[] = word.split('');
        const guessObj: GuessLetter[] = getGuess(guessArray, wordArray);
    
        setGuessList((prevGuessList: GuessLetter[][]) => ([
          ...prevGuessList,
          guessObj,
        ]));
      } else {
        setShowMessage(true);
      }
    } catch (error) {
      console.log(error);
    }

    setIsFetching(false);
  };

  useEffect(() => {
    const guessArray: string[] = getValues(inputList);
    const nextEmptyIndex: number = guessArray.findIndex((value): boolean => value.length === 0);

    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex].focus();
    } else {
      const guessWord: string = guessArray.join('');

      checkWord(guessWord);
    }
  }, [inputList]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showMessage) {
      timer = setTimeout(() => setShowMessage(false), 1000);
    }
  
    return () => {
      clearTimeout(timer);
      inputRefs.current[inputRefs.current.length - 1].focus(); // eslint-disable-line react-hooks/exhaustive-deps
    }
  }, [showMessage]);

  const updateValue = (newValue: string, index: number): void => {
    const pattern: RegExp = new RegExp(/^[ña-zÑA-Z]*$/g);

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
    if (key === 'Backspace') {
      if (index === inputList.length -1 && inputList[index].value) {
        updateValue('', index);
      } else if (index !== 0) {
        updateValue('', index - 1);
      }
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
      <section className="game" data-testid="game">
        <section className="game__input-list-container">
          {renderInputList}
          {
            showMessage
            && <div className="message">{WRONG_WORD_MESSAGE}</div>
          }
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
      {
        isFetching && <Spinner />
      }
    </>
  );
}

export default Game;
