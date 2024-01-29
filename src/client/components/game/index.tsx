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

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const resetInputs = useCallback(() => {
    setInputList(getInitialInputList(word))
    inputRefs.current[0]?.focus()
  }, [word])

  const reloadWindow = () => window.location.reload()

  useEffect(() => {
    const wordArray = word.split('')
    const guessArray = getValues(inputList)
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
        const wordArray = word.split('')
        const guessArray = getValues(inputList)
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
    const allInputsAreFilled = inputRefs.current.every(({ value }) => value)
    const guessArray = getValues(inputList)
    const nextEmptyInputIndex = guessArray.findIndex((value) => !value)

    if (!allInputsAreFilled) {
      inputRefs.current[nextEmptyInputIndex].focus()
    } else {
      inputRefs.current[inputList.length - 1].focus()
    }
  }, [inputList])

  useEffect(() => {
    let timer: NodeJS.Timeout
    const inputRefsList = inputRefs.current

    if (showMessage) {
      timer = setTimeout(() => setShowMessage(false), 1000)
    }
  
    return () => {
      clearTimeout(timer)
      const guessArray = getValues(inputList)
      const nextEmptyInputIndex = guessArray.findIndex((value) => !value)
      inputRefsList[nextEmptyInputIndex]?.focus()
    }
  }, [showMessage, inputList])

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

  const checkInputsAndSubmit = () => {
    const allInputsAreFilled = inputRefs.current.every(({ value }) => value)

    if (allInputsAreFilled) {
      const guessWord = getValues(inputList).join('')

      checkWord(guessWord)
    } else {
      setShowMessage(true)
    }
  }

  const handleOnKeyDown = (key: string, index: number) => {
    if (key === 'Backspace') {
      const guessArray = getValues(inputList)
      const nextEmptyInputIndex = guessArray.findIndex((value) => !value)

      if (nextEmptyInputIndex === -1) {
        updateValue('', index)
      } else if (index !== 0) {
        updateValue('', index - 1)
      }
    }

    if (key === 'Enter') {
      checkInputsAndSubmit()
    }
  }

  const renderInputList = inputList.map((letter: LetterElement, index: number) => (
    <LetterInput
      key={nanoid()}
      value={letter.value}
      onChange={({ target: { value: newValue } }) => updateValue(newValue, index)}
      onKeyDown={({ key }) => handleOnKeyDown(key, index)}
      maxLength={1}
      ref={(input) => {
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
            onClick={() => checkInputsAndSubmit()}
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
