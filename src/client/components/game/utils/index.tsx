import { LetterElement, GuessStatus, GuessLetter } from '../../../types';

export const arrayValuesAreEqual = (arr1: string[], arr2: string[]) => (
  arr1.every((letter: string, index: number) => arr2[index] === letter)
);

export const getInitialInputList = (word: string): LetterElement[] => (
  word
    .split('')
    .map(() => ({ value: '' }))
);

export const getValues = (inputList: LetterElement[]) => inputList.map(({ value }) => value);

const getOccurrenceIndexes = (
  word: string[],
  letter: string,
  indexCut: number | null = null,
) => {
  const letterOccurrenceIndexes: number[] = [];
  let wordArray = [...word];

  if (typeof indexCut === 'number') {
    wordArray = word.slice(0, indexCut + 1);
  }

  wordArray.forEach((wordLetter: string, wordLetterIndex: number) => {
    if (wordLetter === letter) letterOccurrenceIndexes.push(wordLetterIndex);
  });
  
  return letterOccurrenceIndexes;
};

export const getGuess = (
  guessValuesArray: string[],
  wordArray: string[],
): GuessLetter[] => guessValuesArray.map((letter: string, index: number) => {
  const letterOccurrencesInWord: number[] = getOccurrenceIndexes(wordArray, letter);
  const letterIsInWord = Boolean(letterOccurrencesInWord.length);

  let status: GuessStatus = 'incorrect';

  if (letterIsInWord) {
    const moreThanOneOccurrenceInWord = letterOccurrencesInWord.length > 1;
    const letterOccurrencesInGuessUntilNow = getOccurrenceIndexes(guessValuesArray, letter, index);
    const noMoreOccurrencesLeft = letterOccurrencesInGuessUntilNow.length > letterOccurrencesInWord.length;
    const letterIsInCorrectPosition = letterOccurrencesInWord.includes(index);

    if (letterIsInCorrectPosition) {
      if (moreThanOneOccurrenceInWord) {
        status = noMoreOccurrencesLeft ? 'incorrect' : 'correct';
      } else {
        status = 'correct';
      }
    } else  {
      if (moreThanOneOccurrenceInWord) {
        status = noMoreOccurrencesLeft ? 'incorrect' : 'wrong-position';
      } else {
        const letterOccurrencesInGuess = getOccurrenceIndexes(guessValuesArray, letter);

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
