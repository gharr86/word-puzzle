import { FC, useState, useRef, useEffect, useCallback } from 'react'
import { nanoid } from 'nanoid'

import LetterInput from '../letterInput'
import GuessWord from '../guessWord'
import Alphabet from '../alphabet'
import GameOverPrompt from '../gameOverPrompt'
import Spinner from '../spinner'
import Button from '../button'

import { LetterElement, GuessLetter } from '../../types'
import { GameProps } from './types'
import { GameSection, InputsSection, Message, GuessSection, GuessList, GuessWordContainer, GuessNumber } from './styles'

import ApiService from '../../services/apiService'
import { MAX_GUESSES, WRONG_WORD_MESSAGE, RESTART_TEXT, SUBMIT_BTN_TEXT } from '../../constants'

import { getInitialInputList, getValues, getGuess, arrayValuesAreEqual } from './utils'

const Game: FC<GameProps> = ({ word }) => {
  const [inputList, setInputList] = useState<LetterElement[]>(getInitialInputList(word))
  const [guessList, setGuessList] = useState<GuessLetter[][]>([])
  const [didWin, setDidWin] = useState<boolean>(false)
  const [showGameOverPrompt, setShowGameOverPrompt] = useState<boolean>(false)
  const [showMessage, setShowMessage] = useState<boolean>(false)
  const [isFetching, setIsFetching] = useState<boolean>(false)

  const inputRefs = useRef<HTMLInputElement[]>([])

  const resetInputs = useCallback(() => {
    setInputList(getInitialInputList(word))
    inputRefs.current[0]?.focus()
  }, [word])

  const reloadWindow = () => window.location.reload()

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    const guessArray = getValues(inputList)
    const wordArray = word.split('')
    const guessIsCorrect = arrayValuesAreEqual(guessArray, wordArray)

    if (guessIsCorrect) {
      setDidWin(true)
      setShowGameOverPrompt(true)
    } else if (guessList.length > MAX_GUESSES) {
      setDidWin(false)
      setShowGameOverPrompt(true)
    } else {
      resetInputs()
    }
  }, [guessList, word, resetInputs]) // eslint-disable-line react-hooks/exhaustive-deps

  const checkWord = useCallback(async (guessWord: string): Promise<void> => {
    setIsFetching(true)

    try {
      const { data: wordExists } = await ApiService.checkWord(guessWord)

      if (wordExists) {
        const guessArray = getValues(inputList)
        const wordArray = word.split('')
        const guessObj: GuessLetter[] = getGuess(guessArray, wordArray)
    
        setGuessList((prevGuessList: GuessLetter[][]) => ([
          ...prevGuessList,
          guessObj,
        ]))
      } else {
        setShowMessage(true)
      }
    } catch (error) {
      console.log(error)
    }

    setIsFetching(false)
  }, [word, inputList])

  useEffect(() => {
    const guessArray = getValues(inputList)
    const nextEmptyIndex = guessArray.findIndex((value): boolean => value.length === 0)

    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex].focus()
    } else {
      const guessWord = guessArray.join('')

      checkWord(guessWord)
    }
  }, [inputList, checkWord])

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (showMessage) {
      timer = setTimeout(() => setShowMessage(false), 1000)
    }
  
    return () => {
      clearTimeout(timer)
      inputRefs.current[inputRefs.current.length - 1].focus() // eslint-disable-line react-hooks/exhaustive-deps
    }
  }, [showMessage])

  const updateValue = (newValue: string, index: number) => {
    const pattern = new RegExp(/^[ña-zÑA-Z]*$/g)

    if (pattern.test(newValue)) {
      const currentInputList = [...inputList]
      const newTargetInput: LetterElement = {
        ...currentInputList[index],
        value: newValue.toUpperCase(),
      }
  
      currentInputList[index] = newTargetInput
  
      setInputList(currentInputList)
    }
  }

  const handleOnKeyUp = (key: string, index: number) => {
    if (key === 'Backspace') {
      if (index === inputList.length - 1 && inputList[index].value) {
        updateValue('', index)
      } else if (index !== 0) {
        updateValue('', index - 1)
      }
    }
  }

  const renderInputList = inputList.map((letter: LetterElement, index: number) => (
    <LetterInput
      key={nanoid()}
      value={letter.value}
      onChange={({ target: { value: newValue } }) => updateValue(newValue, index)}
      onKeyUp={({ key }) => handleOnKeyUp(key, index)}
      ref={(input: HTMLInputElement) => {
        if (input) inputRefs.current[index] = input
      }}
    />
  ))

  const renderGuessList = guessList.map((guessWordArray: GuessLetter[], index: number) => {
    const guessNumber = `${index + 1}.`

    return (
      <GuessWordContainer key={nanoid()}>
        <GuessNumber>{guessNumber}</GuessNumber>
        <GuessWord key={nanoid()} letters={guessWordArray} />
      </GuessWordContainer>
    )
  })

  return (
    <>
      <GameSection data-testid="game">
        <InputsSection>
          <div>{renderInputList}</div>
          <Button
            text={SUBMIT_BTN_TEXT}
            onClick={() => checkWord}
          />
          {
            showMessage
            && <Message>{WRONG_WORD_MESSAGE}</Message>
          }
        </InputsSection>
        <GuessSection>
          <GuessList>
            {renderGuessList}
          </GuessList>
          <Alphabet guessWordsList={guessList} />
        </GuessSection>
        <Button
          text={RESTART_TEXT}
          onClick={reloadWindow}
        />
      </GameSection>
      {
        showGameOverPrompt
        && (
          <GameOverPrompt
            didWin={didWin}
            word={word}
            onClickOutside={() => setShowGameOverPrompt(false)}
            onClickBtn={reloadWindow}
          />
        )
      }
      {
        isFetching && <Spinner />
      }
    </>
  )
}

export default Game
