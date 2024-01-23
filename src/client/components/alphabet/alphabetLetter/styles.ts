import styled from 'styled-components';

import Div from '../../div';
import { LetterProps } from './types';

import { getBackgroundColor } from '../../../utils';

export default styled(Div)<LetterProps>`
  width: 20px;
  height: 20px;
  border-radius: 2px;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 1rem;
  color: ${({ status }) => status === 'none' ? '#000' : '#FFF'};
  background: ${({ status }) => getBackgroundColor(status)};
`;
