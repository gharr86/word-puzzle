import fs from 'fs'
import path from 'path'

const getData = (): string[] => {
  const rawWordsList: string = fs.readFileSync(path.resolve(__dirname, '../data/index.json'), 'utf8')

  return JSON.parse(rawWordsList)
}

class WordService {
  wordsList: string[]

  constructor() {
    this.wordsList = getData()
  }

  filterByLength(wordLength: number | null): string[] {
    const { wordsList } = this

    if (wordLength) {
      return wordsList.filter((word: string): boolean => word.length === wordLength)
    }

    return wordsList
  }

  getRandomWord(length: number | null): string {
    const filteredList: string[] = this.filterByLength(length)
    const randomIndex: number = Math.floor(Math.random() * filteredList.length)

    return filteredList[randomIndex].toUpperCase()
  }

  wordIsInList(word: string): boolean {
    return this.wordsList.includes(word.toLowerCase())
  }
}

export default WordService
