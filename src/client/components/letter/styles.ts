import styled from 'styled-components';

import { getBackgroundColor } from '../../utils';
import { LetterProps } from './types';

export default styled.div<LetterProps>`
  display: flex;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 1rem;
  color: ${({ status }) => status === 'none' ? '#000' : '#FFF'};
  background: ${({ status }) => getBackgroundColor(status)};
`;
