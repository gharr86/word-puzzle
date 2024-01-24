import { getAllLetters } from '.';

import { GuessLetter } from '../../../types';

describe('getAllLetters', () => {
  const guessWordsList: GuessLetter[][] = [
    [
      {
        value: 'H',
        status: 'correct',
      },
      {
        value: 'O',
        status: 'incorrect',
      },
      {
        value: 'L',
        status: 'wrong-position',
      },
      {
        value: 'A',
        status: 'correct',
      },
    ],
  ];
  const result = getAllLetters(guessWordsList);

  test('incoming letter statuses are persisted in result', () => {
    const indexOfLetter = (letter: string) => result.findIndex(({ value }: GuessLetter) => letter === value);

    const indexOfH = indexOfLetter('H');
    const indexOfO = indexOfLetter('O');
    const indexOfL = indexOfLetter('L');
    const indexOfA = indexOfLetter('A');

    expect(result[indexOfH].status).toEqual(guessWordsList[0][0].status);
    expect(result[indexOfO].status).toEqual(guessWordsList[0][1].status);
    expect(result[indexOfL].status).toEqual(guessWordsList[0][2].status);
    expect(result[indexOfA].status).toEqual(guessWordsList[0][3].status);
  });

  test('status of unused letters is "none"', () => {
    const unusedLetterStatuses = result.filter(({ value }: GuessLetter) => (
      value !== guessWordsList[0][0].value
      && value !== guessWordsList[0][1].value
      && value !== guessWordsList[0][2].value
      && value !== guessWordsList[0][3].value
    ));
    const allStatusesAreNone = unusedLetterStatuses.every(({ status }: GuessLetter) => status === 'none');

    expect(allStatusesAreNone).toBe(true);
  });
});
