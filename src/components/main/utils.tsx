import { Letter, GuessStatus, GuessLetter } from '../../types';

const getStatus = (
  letterIsInWord: boolean,
  letterIsInCorrectPosition: boolean
): GuessStatus => {
  if (letterIsInWord) {
    if (letterIsInCorrectPosition) return 'correct';

    return 'wrong-position';
  }

  return 'incorrect';
};

export const getInitialInputList = (word: string): Letter[] => word
  .split('')
  .map((): Letter => ({ value: '' }));

export const getValues = (inputList: Letter[]): string[] => inputList.map(({ value }): string => value);

export const getGuess = (
  guessValuesArray: string[],
  wordArray: string[],
) => guessValuesArray.map((letter: string, index: number): GuessLetter => {
  const letterIsInWord: boolean = wordArray.includes(letter);
  const letterIsInCorrectPosition: boolean = wordArray.indexOf(letter) === index;
  // ADD CASE FOR REPEATED LETTERS

  return {
    value: letter,
    status: getStatus(letterIsInWord, letterIsInCorrectPosition),
  };
});
