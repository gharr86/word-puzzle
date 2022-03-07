import { Request, Response } from 'express';

import WordService from '../../services/wordService';

export const getWord = (req: Request, res: Response): Response<string> => {
  const { query: { word_length } } = req;

  const wordLengthIsReceived: boolean = Boolean(word_length?.length);
  const wordLengthValue: number | null = (wordLengthIsReceived && !Number.isNaN(Number(word_length)))
    ? Number(word_length)
    : null;

  const randomWord: string = new WordService(wordLengthValue).getRandomWord();

  return res.status(200).send(randomWord);
};

export const checkWord = (req: Request, res: Response): Response<string> => {
  const { body: { word } } = req;

  const wordIsInList: boolean = new WordService().wordIsInList(word);

  return res.status(200).send(wordIsInList);
};
