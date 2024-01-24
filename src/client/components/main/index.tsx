import { useCallback, useEffect, useState } from 'react'

import Game from '../game'
import Spinner from '../spinner'

import ApiService from '../../services/apiService'
import { WORD_LENGTH, MAIN_TITLE } from '../../constants'

import { MainSection, Title } from './styles'

const Main = (): JSX.Element => {
  const [word, setWord] = useState<string | null>(null)

  const getWord = useCallback(async () => {
    try {
      const { data } = await ApiService.getWord(WORD_LENGTH)

      setWord(data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    getWord()
  }, [getWord])
  

  return (
    <MainSection>
      <Title>
        {MAIN_TITLE}
      </Title>
      {
        word?.length
          ? <Game word={word} />
          : <Spinner />
      }
    </MainSection>
  )
}

export default Main
