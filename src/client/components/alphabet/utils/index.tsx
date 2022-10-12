import { GuessLetter, GuessStatus } from '../../../types';

const allLetters: GuessLetter[] = [
  {
    value: 'A',
    status: 'none',
  },
  {
    value: 'B',
    status: 'none',
  },
  {
    value: 'C',
    status: 'none',
  },
  {
    value: 'D',
    status: 'none',
  },
  {
    value: 'E',
    status: 'none',
  },
  {
    value: 'F',
    status: 'none',
  },
  {
    value: 'G',
    status: 'none',
  },
  {
    value: 'H',
    status: 'none',
  },
  {
    value: 'I',
    status: 'none',
  },
  {
    value: 'J',
    status: 'none',
  },
  {
    value: 'K',
    status: 'none',
  },
  {
    value: 'L',
    status: 'none',
  },
  {
    value: 'M',
    status: 'none',
  },
  {
    value: 'N',
    status: 'none',
  },
  {
    value: 'Ñ',
    status: 'none',
  },
  {
    value: 'O',
    status: 'none',
  },
  {
    value: 'P',
    status: 'none',
  },
  {
    value: 'Q',
    status: 'none',
  },
  {
    value: 'R',
    status: 'none',
  },
  {
    value: 'S',
    status: 'none',
  },
  {
    value: 'T',
    status: 'none',
  },
  {
    value: 'U',
    status: 'none',
  },
  {
    value: 'V',
    status: 'none',
  },
  {
    value: 'W',
    status: 'none',
  },
  {
    value: 'X',
    status: 'none',
  },
  {
    value: 'Y',
    status: 'none',
  },
  {
    value: 'Z',
    status: 'none',
  },
];

export const getAllLetters = (guessWordsList: GuessLetter[][]): GuessLetter[] => {
  if (!guessWordsList.length) return allLetters;

  const usedLetters: GuessLetter[] = guessWordsList.reduce((
    prevWord: GuessLetter[],
    currWord: GuessLetter[],
  ) => ([...prevWord, ...currWord]));
  const usedLettersWithoutRepeat: GuessLetter[] = Array.from(new Set(usedLetters));

  return allLetters.map((letter: GuessLetter): GuessLetter => {
    const status: GuessStatus = usedLettersWithoutRepeat.find(({ value }: GuessLetter) => value === letter.value)?.status
      || letter.status;

    return {
      ...letter,
      status,
    };
  });
};
