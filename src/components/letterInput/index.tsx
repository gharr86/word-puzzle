import React from 'react';

import { LetterInputProps } from '../../types';

const LetterInput = ({
  value,
  onChange,
  status,
}: LetterInputProps): JSX.Element => (
  <input
      className={`letter-input letter-input--${status}`}
      type="text"
      value={value}
      onChange={({ target: { value } }) => onChange(value)}
  />
);

export default LetterInput;
