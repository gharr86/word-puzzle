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
    ]
  ];
  const result: GuessLetter[] = getAllLetters(guessWordsList);

  test('incoming letter statuses are persisted in result', () => {
    const indexOfLetter = (letter: string): number => result.findIndex(({ value }: GuessLetter) => letter === value);

    const indexOfH: number = indexOfLetter('H');
    const indexOfO: number = indexOfLetter('O');
    const indexOfL: number = indexOfLetter('L');
    const indexOfA: number = indexOfLetter('A');

    expect(result[indexOfH].status).toEqual(guessWordsList[0][0].status);
    expect(result[indexOfO].status).toEqual(guessWordsList[0][1].status);
    expect(result[indexOfL].status).toEqual(guessWordsList[0][2].status);
    expect(result[indexOfA].status).toEqual(guessWordsList[0][3].status);
  });

  test('status of unused letters is "none"', () => {
    const unusedLetterStatuses: GuessLetter[] = result.filter(({ value }: GuessLetter) => (
      value !== guessWordsList[0][0].value
      && value !== guessWordsList[0][1].value
      && value !== guessWordsList[0][2].value
      && value !== guessWordsList[0][3].value
    ));
    const allStatusesAreNone: boolean = unusedLetterStatuses.every(({ status }: GuessLetter) => status === 'none');

    expect(allStatusesAreNone).toBe(true);
  });
});
