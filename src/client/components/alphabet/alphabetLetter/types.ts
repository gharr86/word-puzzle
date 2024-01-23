import { LayoutProps, FlexboxProps } from 'styled-system';
import { GuessStatus } from '../../../types';

export interface LetterProps extends LayoutProps, FlexboxProps {
  status: GuessStatus
  children: React.ReactNode
}
