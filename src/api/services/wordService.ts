import fs from 'fs';
import path from 'path';

const getData = (): string[] => {
  const rawWordsList: string = fs.readFileSync(path.resolve(__dirname, '../data/index.json'), 'utf8');

  return JSON.parse(rawWordsList);
};

 class WordService {
  wordLength: number;
  wordsList: string[];

  constructor(_length = null) {
    this.wordLength = _length;
    this.wordsList = getData();
  }

  filterByLength(): string[] {
    const { wordLength, wordsList } = this;

    if (wordLength) {
      return wordsList.filter((word: string): boolean => word.length === wordLength);
    }

    return wordsList;
  }

  getRandomWord(): string {
    const filteredList: string[] = this.filterByLength();
    const randomIndex: number = Math.floor(Math.random() * filteredList.length);

    return filteredList[randomIndex].toUpperCase();
  }

  wordIsInList(word: string): boolean {
    return this.wordsList.includes(word.toLowerCase());
  }
}

export default WordService;
