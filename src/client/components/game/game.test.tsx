import React from 'react';
import { render, RenderResult, screen, fireEvent, Screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Game from '.';

import { GameProps } from '../../types';

import { correctColor, wrongPositionColor, incorrectColor } from '../../constants';

const basicProps: GameProps = { word: 'VIAJE' };

const renderGame = (newProps: {} = {}): RenderResult => {
  const props = {
    ...basicProps,
    ...newProps,
  };

  return render(<Game {...props} />);
};

const maxGuessQty: number = 6;
const getFakeChangeEvent = (value: string) => ({ target: { value } });
const enterBadGuess = (screen: Screen): void => {
  fireEvent.change(screen.getAllByRole('textbox')[0], getFakeChangeEvent('l'));
  fireEvent.change(screen.getAllByRole('textbox')[1], getFakeChangeEvent('i'));
  fireEvent.change(screen.getAllByRole('textbox')[2], getFakeChangeEvent('j'));
  fireEvent.change(screen.getAllByRole('textbox')[3], getFakeChangeEvent('a'));
  fireEvent.change(screen.getAllByRole('textbox')[4], getFakeChangeEvent('r'));
};
const enterGoodGuess = (screen: Screen): void => {
  fireEvent.change(screen.getAllByRole('textbox')[0], getFakeChangeEvent('v'));
  fireEvent.change(screen.getAllByRole('textbox')[1], getFakeChangeEvent('i'));
  fireEvent.change(screen.getAllByRole('textbox')[2], getFakeChangeEvent('a'));
  fireEvent.change(screen.getAllByRole('textbox')[3], getFakeChangeEvent('j'));
  fireEvent.change(screen.getAllByRole('textbox')[4], getFakeChangeEvent('e'));
};

describe('<Game />', () => {
  test('basic render', () => {
    renderGame();
  });

  test('when page is loaded, first input is focused', () => {
    renderGame();

    expect(screen.getAllByRole('textbox')[0]).toHaveFocus();
  });

  test('when a non-letter value is entered, input is not changed', () => {
    renderGame();
    const firstInput: HTMLElement = screen.getAllByRole('textbox')[0];

    fireEvent.change(firstInput, getFakeChangeEvent('5'));

    expect(firstInput).toHaveValue('');
  });

  test('when an input value changes, next input is focused', () => {
    renderGame();

    fireEvent.change(screen.getAllByRole('textbox')[0], getFakeChangeEvent('a'));

    expect(screen.getAllByRole('textbox')[1]).toHaveFocus();
  });

  test('when backspace is pressed, previous input value is deleted', () => {
    renderGame();

    fireEvent.change(screen.getAllByRole('textbox')[0], getFakeChangeEvent('a'));
    fireEvent.keyUp(screen.getAllByRole('textbox')[1], { key: 'Backspace' });

    expect(screen.getAllByRole('textbox')[0]).toHaveValue('');
    expect(screen.getAllByRole('textbox')[0]).toHaveFocus();
  });

  test('when a word is submitted, it appears in submitted words list', () => {
      renderGame();
  
      enterBadGuess(screen);

      expect(screen.getAllByText('L')[0]).toBeInTheDocument();
      expect(screen.getAllByText('I')[0]).toBeInTheDocument();
      expect(screen.getAllByText('J')[0]).toBeInTheDocument();
      expect(screen.getAllByText('A')[0]).toBeInTheDocument();
      expect(screen.getAllByText('R')[0]).toBeInTheDocument();
  });

  test('when a word is submitted, alphabet is updated with submitted letters status', () => {
    renderGame();

    enterBadGuess(screen);

    expect(screen.getAllByText('L')[1]).toHaveStyle(`background: ${incorrectColor}`);
    expect(screen.getAllByText('I')[1]).toHaveStyle(`background: ${correctColor}`);
    expect(screen.getAllByText('J')[1]).toHaveStyle(`background: ${wrongPositionColor}`);
    expect(screen.getAllByText('A')[1]).toHaveStyle(`background: ${wrongPositionColor}`);
    expect(screen.getAllByText('R')[1]).toHaveStyle(`background: ${incorrectColor}`);
  });

  test('when guess is correct, game over modal is rendered', () => {
    renderGame();

    enterGoodGuess(screen);

    expect(screen.getByText(/ganaste/i)).toBeInTheDocument();
  });

  test('when max guess quantity is reached, game over modal is rendered', () => {
    renderGame();

    for (let i = 0; i < maxGuessQty; i++) {
      enterBadGuess(screen);
    }
    
    expect(screen.getByText(/perdiste/i)).toBeInTheDocument();
  });
});
