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

export const arrayValuesAreEqual = (arr1: string[], arr2: string[]): boolean => (
  arr1.every((letter: string, index: number): boolean => arr2[index] === letter)
);

export const getInitialInputList = (word: string): Letter[] => (
  word
    .split('')
    .map((): Letter => ({ value: '' }))
);

export const getValues = (inputList: Letter[]): string[] => inputList.map(({ value }): string => value);

export const getGuess = (
  guessValuesArray: string[],
  wordArray: string[],
) => guessValuesArray.map((letter: string, index: number): GuessLetter => {
  const letterIsInWord: boolean = wordArray.includes(letter);

  const letterOccurrences: (number | boolean)[] = wordArray
    .map((wordLetter: string, wordLetterIndex: number): number | boolean => 
      wordLetter === letter &&  wordLetterIndex)
    .filter((value: number | boolean): boolean => typeof value === 'number');
  const letterIsInCorrectPosition: boolean = letterOccurrences.includes(index);

  return {
    value: letter,
    status: getStatus(letterIsInWord, letterIsInCorrectPosition),
  };
});
