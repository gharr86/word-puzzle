import React from 'react';
import { render, RenderResult, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Main from '.';

import { correctColor, wrongPositionColor, incorrectColor } from '../../constants';

const basicProps = {};

const renderMain = (newProps: {} = {}): RenderResult => {
  const props = {
    ...basicProps,
    ...newProps,
  };

  return render(<Main {...props} />);
};

const fakeChangeEvent = (value: string) => ({ target: { value } });

describe('<Main />', () => {
  test('basic render', () => {
    renderMain();
  });

  test('when page is loaded, first input is focused', () => {
    renderMain();

    expect(screen.getAllByRole('textbox')[0]).toHaveFocus();
  });

  test('when a non-letter value is entered, input is not changed', () => {
    renderMain();
    const firstInput = screen.getAllByRole('textbox')[0];

    fireEvent.change(firstInput, fakeChangeEvent('5'));

    expect(firstInput).toHaveValue('');
  });

  test('when an input value changes, next input is focused', () => {
    renderMain();

    fireEvent.change(screen.getAllByRole('textbox')[0], fakeChangeEvent('a'));

    expect(screen.getAllByRole('textbox')[1]).toHaveFocus();
  });

  test('when backspace is pressed, previous input value is deleted', () => {
    renderMain();

    fireEvent.change(screen.getAllByRole('textbox')[0], fakeChangeEvent('a'));
    fireEvent.keyUp(screen.getAllByRole('textbox')[1], { key: 'Backspace' });

    expect(screen.getAllByRole('textbox')[0]).toHaveValue('');
    expect(screen.getAllByRole('textbox')[0]).toHaveFocus();
  });

  test('when a word is submitted, it appears in submitted words list', () => {
      renderMain();
  
      fireEvent.change(screen.getAllByRole('textbox')[0], fakeChangeEvent('l'));
      fireEvent.change(screen.getAllByRole('textbox')[1], fakeChangeEvent('i'));
      fireEvent.change(screen.getAllByRole('textbox')[2], fakeChangeEvent('j'));
      fireEvent.change(screen.getAllByRole('textbox')[3], fakeChangeEvent('a'));
      fireEvent.change(screen.getAllByRole('textbox')[4], fakeChangeEvent('r'));

      expect(screen.getAllByText('L')[0]).toBeInTheDocument();
      expect(screen.getAllByText('I')[0]).toBeInTheDocument();
      expect(screen.getAllByText('J')[0]).toBeInTheDocument();
      expect(screen.getAllByText('A')[0]).toBeInTheDocument();
      expect(screen.getAllByText('R')[0]).toBeInTheDocument();
  });

  test('when a word is submitted, alphabet is updated with submitted letters status', () => {
    renderMain();

    fireEvent.change(screen.getAllByRole('textbox')[0], fakeChangeEvent('l'));
    fireEvent.change(screen.getAllByRole('textbox')[1], fakeChangeEvent('i'));
    fireEvent.change(screen.getAllByRole('textbox')[2], fakeChangeEvent('j'));
    fireEvent.change(screen.getAllByRole('textbox')[3], fakeChangeEvent('a'));
    fireEvent.change(screen.getAllByRole('textbox')[4], fakeChangeEvent('r'));

    expect(screen.getAllByText('L')[1]).toHaveStyle(`background: ${incorrectColor}`);
    expect(screen.getAllByText('I')[1]).toHaveStyle(`background: ${correctColor}`);
    expect(screen.getAllByText('J')[1]).toHaveStyle(`background: ${wrongPositionColor}`);
    expect(screen.getAllByText('A')[1]).toHaveStyle(`background: ${wrongPositionColor}`);
    expect(screen.getAllByText('R')[1]).toHaveStyle(`background: ${incorrectColor}`);
  });
});
