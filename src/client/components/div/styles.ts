import styled from 'styled-components';
import { flexbox, layout } from 'styled-system';
import { DivProps } from './types';

export default styled.div<DivProps>`
  ${flexbox}
  ${layout}
`;
