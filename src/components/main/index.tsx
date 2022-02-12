import React, { ReactElement, useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';

import LetterInput from '../letterInput';

import { Letter } from '../../types';

const word: string = 'GATA';
const emptyInput: Letter = { value: '', status: 'empty' };

const Main = (): JSX.Element => {
  const [inputList, setInputList] = useState<Letter[]>(new Array(word.length).fill(emptyInput));
  const inputRefs = useRef<HTMLInputElement[] | []>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);
  

  const handleOnChange = (newValue: string, index: number): void => {
    const currentInputList: Letter[] = [...inputList];

    if (currentInputList[index].value.length <= 1) {
      currentInputList[index].value = newValue;

      setInputList(currentInputList);
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
              onChange={newValue => handleOnChange(newValue, index)}
              ref={inputRefs.current[index]}
            />
          ))
        }
      </section>
    </main>
  );
}

export default Main;
