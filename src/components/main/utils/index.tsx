import { Letter, GuessStatus, GuessLetter } from '../../../types';

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
  indexCut: number | null = null
): number[] => {
  const letterOccurrenceIndexes: number[] = [];
  let wordArray: string[] = [...word];

  if (typeof indexCut === 'number') {
    wordArray = word.slice(0, indexCut + 1);
  }

  wordArray.forEach((wordLetter: string, wordLetterIndex: number): void => {
    if (wordLetter === letter) letterOccurrenceIndexes.push(wordLetterIndex);
  });
  
  return letterOccurrenceIndexes;
};

export const getGuess = (
  guessValuesArray: string[],
  wordArray: string[],
) => guessValuesArray.map((letter: string, index: number): GuessLetter => {
  const letterOccurrencesInWord: number[] = getOccurrenceIndexes(wordArray, letter);
  const letterIsInWord: boolean = Boolean(letterOccurrencesInWord.length);

  let status: GuessStatus = 'incorrect';

  if (letterIsInWord) {
    const letterIsInCorrectPosition: boolean = letterOccurrencesInWord.includes(index);

    if (letterIsInCorrectPosition) {
      status = 'correct';
    } else  {
      const moreThanOneOccurrenceInWord: boolean = letterOccurrencesInWord.length > 1;
      
      if (moreThanOneOccurrenceInWord) {
        const letterOccurrencesInGuessUntilNow: number[] = getOccurrenceIndexes(guessValuesArray, letter, index);
        
        status = letterOccurrencesInGuessUntilNow.length <= letterOccurrencesInWord.length
          ? 'wrong-position'
          : 'incorrect';
      } else {
        const letterOccurrencesInGuess: number[] = getOccurrenceIndexes(guessValuesArray, letter);

        status = letterOccurrencesInGuess.length > 1
          ? 'incorrect'
          : 'wrong-position';
      }
    }
  }

  return {
    value: letter,
    status,
  };
});
