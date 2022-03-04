import { Request, Response } from 'express';

import { getData } from '../../data';
import { ERROR_MESSAGE, BAD_REQUEST_MESSAGE } from '../../constants';

export const getWord = (req: Request, res: Response): Response<string> => {
  console.log(req)
  const data = getData();

  if (data && Boolean(data.length)) {
    const { query: { word_length } } = req;

    const wordLengthIsReceived: boolean = Boolean(word_length?.length);
    const wordLengthParamIsOk: boolean = wordLengthIsReceived && !Number.isNaN(Number(word_length));

    if (!word_length) return res.status(200).send(data);
    else if (wordLengthParamIsOk) {
      const wordsOfReceibedLength: string[] = data.filter((word: string): boolean => word.length === Number(word_length));
      const randomWord: string = wordsOfReceibedLength[Math.floor(Math.random() * wordsOfReceibedLength.length)];

      return res.status(200).send(randomWord);
    } else {
      return res.status(400).send(BAD_REQUEST_MESSAGE);
    }
  }

  return res.status(500).send(ERROR_MESSAGE);
};
