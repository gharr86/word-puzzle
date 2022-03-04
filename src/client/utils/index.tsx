import { GuessStatus } from '../types';

import { correctColor, wrongPositionColor, incorrectColor } from '../constants';

export const getBackgroundColor = (status: GuessStatus): string => {
  switch (status) {
    case 'correct':
      return correctColor;
    case 'wrong-position':
      return wrongPositionColor;
    case 'incorrect':
      return incorrectColor;
    default:
      return '';
  }
};
