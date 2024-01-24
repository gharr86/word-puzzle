/* eslint-disable @typescript-eslint/naming-convention */
import { Request, Response } from 'express'

import WordService from '../../services/wordService'

export const getWord = (req: Request, res: Response): Response<string> => {
  const { query: { word_length } } = req

  const wordLengthIsReceived = Boolean(word_length?.length)
  const wordLengthValue: number | null = (wordLengthIsReceived && !Number.isNaN(Number(word_length)))
    ? Number(word_length)
    : null

  const randomWord: string = new WordService().getRandomWord(wordLengthValue)

  return res.status(200).send(randomWord)
}

export const checkWord = (req: Request, res: Response): Response<string> => {
  const { body: { word } } = req

  const wordIsInList: boolean = word?.length
    ? new WordService().wordIsInList(word)
    : false

  return res.status(200).send(wordIsInList)
}
