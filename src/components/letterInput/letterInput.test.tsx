import React from 'react';
import { render, screen, RenderResult, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import LetterInput from '.';
import { LetterInputProps } from '../../types';

const basicProps: LetterInputProps = {
  value: '',
  onChange: jest.fn(),
  onKeyUp: jest.fn(),
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

    fireEvent.change(screen.getByRole('textbox'), { target: { value: newValue } });

    expect(basicProps.onChange).toHaveBeenCalledWith(newValue);
  });

  test('when a key is released, onKeyUp prop is called', () => {
    const releasedKey: string = 'Backspace';
    renderLetterInput();

    fireEvent.keyUp(screen.getByRole('textbox'), { key: releasedKey });

    expect(basicProps.onKeyUp).toHaveBeenCalledWith(releasedKey);
  });
});
