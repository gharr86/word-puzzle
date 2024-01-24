import { FC } from 'react'
import { nanoid } from 'nanoid'

import Letter from '../letter'
import { getAllLetters } from './utils'

import { GuessLetter } from '../../types'
import { AlphabetProps } from './types'
import { StyledContainer } from './styles'

const Alphabet: FC<AlphabetProps> = ({ guessWordsList }) => {
  const letterList: GuessLetter[] = getAllLetters(guessWordsList)

  return (
    <StyledContainer>
      {
        letterList.map((letter: GuessLetter) => (
          <Letter
            status={letter.status}
            key={nanoid()}
          >
            {letter.value}
          </Letter>
        ))
      }
    </StyledContainer>
  )
}

export default Alphabet
