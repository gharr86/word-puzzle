import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import GameOverPrompt from '.';
import { GameOverPromptProps } from './types';

import { WIN_MESSAGE, LOOSE_MESSAGE } from '../../constants';

const basicProps: GameOverPromptProps = {
  onClickOutside: jest.fn(),
  word: 'VIAJE',
  didWin: false,
  onClickBtn: jest.fn(),
};

const renderGameOverPrompt = (newProps: Partial<GameOverPromptProps> = {}): RenderResult => {
  const props = {
    ...basicProps,
    ...newProps,
  };

  return render(<GameOverPrompt {...props} />);
};

describe('<GameOverPrompt />', () => {
  test('basic render', () => {
    renderGameOverPrompt();
  });

  test('when didWin is false, loose message is rendered and word is shown', () => {
    renderGameOverPrompt();

    expect(screen.getByText(LOOSE_MESSAGE)).toBeInTheDocument();
    expect(screen.getByText(basicProps.word)).toBeInTheDocument();
  });

  test('when didWin is true, win message is rendered and word is not shown', () => {
    renderGameOverPrompt({ didWin: true });

    expect(screen.getByText(WIN_MESSAGE)).toBeInTheDocument();
    expect(screen.queryByText(basicProps.word)).not.toBeInTheDocument();
  });

  test('when background is clicked, onClickOutside prop is called', () => {
    renderGameOverPrompt();

    fireEvent.click(screen.getAllByRole('button')[0]);

    expect(basicProps.onClickOutside).toHaveBeenCalled();
  });

  test('when restart button is clicked, onClickOutside prop is called', () => {
    renderGameOverPrompt();

    fireEvent.click(screen.getAllByRole('button')[1]);

    expect(basicProps.onClickBtn).toHaveBeenCalled();
  });
});
