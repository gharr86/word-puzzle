import React from 'react';

import { LetterInputProps } from '../../types';

const LetterInput = React.forwardRef<HTMLInputElement, LetterInputProps>((props, ref): JSX.Element => {
  const {
    value,
    onChange,
    status,
  } = props;

  return (
    <input
      ref={ref}
      className={`letter-input letter-input--${status}`}
      type="text"
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
    />
  );
});

export default LetterInput;
