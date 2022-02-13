import React, { ReactElement, useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';

import LetterInput from '../letterInput';

import { Letter } from '../../types';

const word: string = 'GATA';
const emptyInput: Letter = { value: '', status: 'empty' };

const getInitialInputList: Letter[] = word
  .split('')
  .map((): Letter => emptyInput);

const Main = (): JSX.Element => {
  const [inputList, setInputList] = useState<Letter[]>(getInitialInputList);
  // const [lastPressedKeyIsBackspace, setlastPressedKeyIsBackspace] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    const currentValues: string[] = inputList.map(({ value }): string => value);
    const nextEmptyValue: number = currentValues.findIndex((value): boolean => value.length === 0);

    if (nextEmptyValue !== -1) {
      inputRefs.current[nextEmptyValue].focus();
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
    const lastPressedKeyIsBackspace: boolean = key === 'Backspace';

    if (lastPressedKeyIsBackspace && index !== 0) {
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
              status={letter.status}
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
