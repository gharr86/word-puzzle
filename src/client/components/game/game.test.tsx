import { render, RenderResult, screen, fireEvent, Screen, waitForElementToBeRemoved } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { AxiosResponse } from 'axios'

import Game from '.'
import ApiService from '../../services/apiService'

import { GameProps } from './types'

import {
  CORRECT_COLOR,
  WRONG_POSITION_COLOR,
  INCORRECT_COLOR,
  WRONG_WORD_MESSAGE,
  WIN_MESSAGE,
  MAX_GUESSES,
  LOOSE_MESSAGE,
} from '../../constants'

jest.mock('../../services/apiService')

const mockApiService = ApiService as jest.Mocked<typeof ApiService>

const basicProps: GameProps = { word: 'VIAJE' }

const renderGame = (newProps: Partial<GameProps> = {}): RenderResult => {
  const props = {
    ...basicProps,
    ...newProps,
  }

  return render(<Game {...props} />)
}

const getMockResp = (data: boolean): Partial<AxiosResponse> => ({ data })
const getFakeChangeEvent = (value: string) => ({ target: { value } })
const enterBadGuess = (_screen: Screen) => {
  fireEvent.change(_screen.getAllByRole('textbox')[0], getFakeChangeEvent('l'))
  fireEvent.change(_screen.getAllByRole('textbox')[1], getFakeChangeEvent('i'))
  fireEvent.change(_screen.getAllByRole('textbox')[2], getFakeChangeEvent('j'))
  fireEvent.change(_screen.getAllByRole('textbox')[3], getFakeChangeEvent('a'))
  fireEvent.change(_screen.getAllByRole('textbox')[4], getFakeChangeEvent('r'))
  fireEvent.keyDown(_screen.getAllByRole('textbox')[4], { key: 'Enter' })
}
const enterGoodGuess = (_screen: Screen) => {
  fireEvent.change(_screen.getAllByRole('textbox')[0], getFakeChangeEvent('v'))
  fireEvent.change(_screen.getAllByRole('textbox')[1], getFakeChangeEvent('i'))
  fireEvent.change(_screen.getAllByRole('textbox')[2], getFakeChangeEvent('a'))
  fireEvent.change(_screen.getAllByRole('textbox')[3], getFakeChangeEvent('j'))
  fireEvent.change(_screen.getAllByRole('textbox')[4], getFakeChangeEvent('e'))
  fireEvent.click(_screen.getAllByRole('button')[0])
}

describe('<Game />', () => {
  test('basic render', () => {
    renderGame()
  })

  test('when page is loaded, first input is focused', () => {
    renderGame()

    expect(screen.getAllByRole('textbox')[0]).toHaveFocus()
  })

  test('when a non-letter value is entered, input is not changed', () => {
    renderGame()
    const firstInput = screen.getAllByRole('textbox')[0]

    fireEvent.change(firstInput, getFakeChangeEvent('5'))

    expect(firstInput).toHaveValue('')
  })

  test('when an input value changes, next input is focused', () => {
    renderGame()

    fireEvent.change(screen.getAllByRole('textbox')[0], getFakeChangeEvent('a'))

    expect(screen.getAllByRole('textbox')[1]).toHaveFocus()
  })

  test('when backspace is pressed, previous input value is deleted', () => {
    renderGame()

    fireEvent.change(screen.getAllByRole('textbox')[0], getFakeChangeEvent('a'))
    fireEvent.keyDown(screen.getAllByRole('textbox')[1], { key: 'Backspace' })

    expect(screen.getAllByRole('textbox')[0]).toHaveValue('')
    expect(screen.getAllByRole('textbox')[0]).toHaveFocus()
  })

  test('when an invalid word is submitted, error message is shown', async () => {
    mockApiService.checkWord.mockResolvedValueOnce(getMockResp(false) as AxiosResponse)
    renderGame()

    enterBadGuess(screen)
    await waitForElementToBeRemoved(screen.queryByTestId('spinner'))

    expect(screen.getByText(WRONG_WORD_MESSAGE)).toBeInTheDocument()
  })

  test('when a valid word is submitted, it appears in submitted words list', async () => {
    mockApiService.checkWord.mockResolvedValueOnce(getMockResp(true) as AxiosResponse)
    renderGame()
  
    enterBadGuess(screen)
    await waitForElementToBeRemoved(screen.queryByTestId('spinner'))

    expect(screen.getAllByText('L')[0]).toBeInTheDocument()
    expect(screen.getAllByText('I')[0]).toBeInTheDocument()
    expect(screen.getAllByText('J')[0]).toBeInTheDocument()
    expect(screen.getAllByText('A')[0]).toBeInTheDocument()
    expect(screen.getAllByText('R')[0]).toBeInTheDocument()
  })

  test('when a valid word is submitted, alphabet is updated with submitted letters status', async () => {
    mockApiService.checkWord.mockResolvedValueOnce(getMockResp(true) as AxiosResponse)
    renderGame()

    enterBadGuess(screen)
    await waitForElementToBeRemoved(screen.queryByTestId('spinner'))

    expect(screen.getAllByText('L')[1]).toHaveStyle(`background: ${INCORRECT_COLOR}`)
    expect(screen.getAllByText('I')[1]).toHaveStyle(`background: ${CORRECT_COLOR}`)
    expect(screen.getAllByText('J')[1]).toHaveStyle(`background: ${WRONG_POSITION_COLOR}`)
    expect(screen.getAllByText('A')[1]).toHaveStyle(`background: ${WRONG_POSITION_COLOR}`)
    expect(screen.getAllByText('R')[1]).toHaveStyle(`background: ${INCORRECT_COLOR}`)
  })

  test('when guess is correct, game over modal is rendered', async () => {
    mockApiService.checkWord.mockResolvedValueOnce(getMockResp(true) as AxiosResponse)
    renderGame()

    enterGoodGuess(screen)
    await waitForElementToBeRemoved(screen.queryByTestId('spinner'))

    expect(screen.getByText(WIN_MESSAGE)).toBeInTheDocument()
  })

  test('when max guess quantity is reached, game over modal is rendered', async () => {
    mockApiService.checkWord.mockResolvedValue(getMockResp(true) as AxiosResponse)
    renderGame()

    for (let i = 0; i < MAX_GUESSES + 1; i++) {
      enterBadGuess(screen)
      await waitForElementToBeRemoved(screen.queryByTestId('spinner'))
    }
    
    expect(screen.getByText(LOOSE_MESSAGE)).toBeInTheDocument()
  })
})
