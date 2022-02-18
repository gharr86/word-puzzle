import { GuessStatus } from '../types';

export const getBackgroundColor = (status: GuessStatus): string => {
  switch (status) {
    case 'correct':
      return '#0b8c34';
    case 'wrong-position':
      return '#946f00';
    case 'incorrect':
      return '#5e5e5e';
    default:
      return '';
  }
};
