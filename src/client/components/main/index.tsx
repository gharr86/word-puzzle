import React, { useEffect, useState } from 'react';

import { CircularProgress } from '@mui/material';

import Game from '../game';

import ApiService from '../../services/apiService';

const Main = (): JSX.Element => {
  const [word, setWord] = useState<string>('');

  useEffect(() => {
    ApiService
      .getWord(5)
      .then(({ data }) => {
        setWord(data);
      });
  }, [])
  

  return (
    <main className="main">
      {
        word.length
          ? <Game word={word} />
          : <CircularProgress />
      }
    </main>
  );
};

export default Main;
