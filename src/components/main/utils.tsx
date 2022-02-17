import { Letter, GuessStatus, GuessLetter } from '../../types';

export const arrayValuesAreEqual = (arr1: string[], arr2: string[]): boolean => (
  arr1.every((letter: string, index: number): boolean => arr2[index] === letter)
);

export const getInitialInputList = (word: string): Letter[] => (
  word
    .split('')
    .map((): Letter => ({ value: '' }))
);

export const getValues = (inputList: Letter[]): string[] => inputList.map(({ value }): string => value);

const getOccurrenceIndexes = (
  word: string[],
  letter: string,
  currentIndex: number | null = null
): number[] => {
  const letterOccurrenceIndexes: number[] = [];
  let wordArray: string[] = [...word];

  if (typeof currentIndex === 'number') {
    wordArray = word.slice(0, currentIndex + 1);
  }

  wordArray.forEach((wordLetter: string, wordLetterIndex: number): void => {
    if (wordLetter === letter) letterOccurrenceIndexes.push(wordLetterIndex);
  });
  
  return letterOccurrenceIndexes;
};

const letterAlreadyAppeared = (
  word: string[],
  currentIndex: number,
  letterToCheck: string
): boolean => (
  word
    .slice(0, currentIndex)
    .some((letter: string) => letter === letterToCheck)
);

export const getGuess = (
  guessValuesArray: string[],
  wordArray: string[],
) => guessValuesArray.map((letter: string, index: number): GuessLetter => {
  const letterOccurrencesInWord: number[] = getOccurrenceIndexes(wordArray, letter);
  const letterIsInWord: boolean = Boolean(letterOccurrencesInWord.length);
  const letterIsInCorrectPosition = wordArray.indexOf(letter) === index;

  let status: GuessStatus = 'incorrect';

  if (letterIsInWord) {
    if (letterIsInCorrectPosition) {
      status = 'correct';
    } else  {
      const moreThanOneOccurrenceInWord: boolean = letterOccurrencesInWord.length > 1;
      const letterAlreadyAppearedInGuess: boolean = letterAlreadyAppeared(guessValuesArray, index, letter);
      
      if (moreThanOneOccurrenceInWord) {
        const letterOccurrencesInGuessUntilNow: number[] = getOccurrenceIndexes(guessValuesArray, letter, index);

        if (letterOccurrencesInGuessUntilNow.length <= letterOccurrencesInWord.length) {
          status = 'wrong-position';
        } else {
          status = 'incorrect';
        }
      } else if (letterAlreadyAppearedInGuess) {
        status = 'incorrect';
      } else {
        status = 'wrong-position';
      }
    }
  }

  return {
    value: letter,
    status,
  };
});
