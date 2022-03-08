import { GuessStatus } from '../types';

import { CORRECT_COLOR, WRONG_POSITION_COLOR, INCORRECT_COLOR } from '../constants';

export const getBackgroundColor = (status: GuessStatus): string => {
  switch (status) {
    case 'correct':
      return CORRECT_COLOR;
    case 'wrong-position':
      return WRONG_POSITION_COLOR;
    case 'incorrect':
      return INCORRECT_COLOR;
    default:
      return '';
  }
};
