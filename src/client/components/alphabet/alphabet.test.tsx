import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Alphabet from '.';
import { AlphabetProps } from '../../types';

const basicProps: AlphabetProps = {
  guessWordsList: [
    [
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
  ],
};

const renderAlphabet = (newProps: Partial<AlphabetProps> = {}): RenderResult => {
  const props = {
    ...basicProps,
    ...newProps,
  };

  return render(<Alphabet {...props} />);
};

describe('<Alphabet />', () => {
  test('basic render', () => {
    renderAlphabet();
  });
});
