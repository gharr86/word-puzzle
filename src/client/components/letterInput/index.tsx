import { FC, forwardRef } from 'react';

import StyledInput from './styles';
import { LetterInputProps } from './types';

const LetterInput: FC<LetterInputProps> = forwardRef<HTMLInputElement, LetterInputProps>((props, ref) => {
  const {
    inputValue,
    onChange,
    onKeyUp,
  } = props;

  return (
    <StyledInput
      ref={ref}
      type="text"
      value={inputValue}
      onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => onChange(value)}
      onKeyUp={({ key }: React.KeyboardEvent<HTMLInputElement>) => onKeyUp(key)}
    />
  );
});

export default LetterInput;
