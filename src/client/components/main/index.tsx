import React, { useEffect, useState } from 'react';

import Game from '../game';
import Spinner from '../spinner';

import ApiService from '../../services/apiService';
import { WORD_LENGTH, MAIN_TITLE } from '../../constants';

const Main = (): JSX.Element => {
  const [word, setWord] = useState<string>('');

  useEffect(() => {
    ApiService
      .getWord(WORD_LENGTH)
      .then(({ data }) => setWord(data))
      .catch(err => console.log(err));
  }, [])
  

  return (
    <main className="main">
      <h1 className="main__title">
        {MAIN_TITLE}
      </h1>
      {
        word.length
          ? <Game word={word} />
          : <Spinner />
      }
    </main>
  );
};

export default Main;
