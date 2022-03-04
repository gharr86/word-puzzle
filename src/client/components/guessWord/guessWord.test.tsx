import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import GuessWord from '.';
import { GuessWordProps } from '../../types';

const basicProps: GuessWordProps = {
  letters: [
    {
      value: 'H',
      status: 'correct',
    },
    {
      value: 'O',
      status: 'incorrect',
    },
    {
      value: 'L',
      status: 'wrong-position',
    },
    {
      value: 'A',
      status: 'correct',
    },
  ],
};

const renderGuessWord = (newProps: {} = {}): RenderResult => {
  const props = {
    ...basicProps,
    ...newProps,
  };

  return render(<GuessWord {...props} />);
};

describe('<GuessWord />', () => {
  test('basic render', () => {
    renderGuessWord();
  });
});
