import React from 'react';

import { ButtonProps } from '../../types';

const Button = ({ onClick, text }: ButtonProps) => (
  <button
    className="button"
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button;
