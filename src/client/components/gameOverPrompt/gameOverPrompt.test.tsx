import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import GameOverPrompt from '.';
import { GameOverPromptProps } from '../../types';

import { WIN_MESSAGE, LOOSE_MESSAGE } from '../../constants';

const basicProps: GameOverPromptProps = {
  onClickOutside: jest.fn(),
  word: 'VIAJE',
  didWin: false,
};

const renderGameOverPrompt = (newProps: {} = {}): RenderResult => {
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

    fireEvent.click(screen.getByRole('button'));

    expect(basicProps.onClickOutside).toHaveBeenCalled();
  });
});
