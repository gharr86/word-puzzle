import React from 'react';

import { LetterInputProps } from '../../types';

const LetterInput = React.forwardRef<HTMLInputElement, LetterInputProps>((props, ref): JSX.Element => {
  const {
    value,
    onChange,
    onKeyUp,
  } = props;

  return (
    <input
      ref={ref}
      className="letter-input"
      type="text"
      value={value}
      onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => onChange(value)}
      onKeyUp={({ key }: React.KeyboardEvent<HTMLInputElement>) => onKeyUp(key)}
    />
  );
});

export default LetterInput;
