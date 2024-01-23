import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Button from '.';
import { ButtonProps } from './types';

const basicProps: ButtonProps = {
  onClick: jest.fn(),
  text: 'Button',
};

const renderButton = (newProps: Partial<ButtonProps> = {}): RenderResult => {
  const props = {
    ...basicProps,
    ...newProps,
  };

  return render(<Button {...props} />);
};

describe('<Button />', () => {
  test('basic render', () => {
    renderButton();
  });

  test('when button is clicked, onClick prop is called', () => {
    renderButton();

    fireEvent.click(screen.getByRole('button'));

    expect(basicProps.onClick).toHaveBeenCalled();
  });
});
