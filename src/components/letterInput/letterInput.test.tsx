import React from 'react';
import { render, screen, RenderResult, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import LetterInput from '.';
import { LetterInputProps } from '../../types';

const basicProps: LetterInputProps = {
  value: '',
  onChange: jest.fn(),
  status: 'empty',
};

const renderLetterInput = (newProps: {} = {}): RenderResult => {
  const props = {
    ...basicProps,
    ...newProps,
  };

  return render(<LetterInput {...props} />);
};

describe('<LetterInput />', () => {
  test('basic render', () => {
    renderLetterInput();
  });

  test('when input value changes, onChange prop is called', () => {
    const newValue: string = 'abc';
    renderLetterInput();

    fireEvent.change(screen.getByRole('input'), { target: { value: newValue } });

    expect(basicProps.onChange).toHaveBeenCalledWith(newValue);
  });
});
