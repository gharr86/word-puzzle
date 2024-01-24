import { render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Spinner from '.';

const basicProps = {};

const renderSpinner = (newProps = {}): RenderResult => {
  const props = {
    ...basicProps,
    ...newProps,
  };

  return render(<Spinner {...props} />);
};

describe('<Spinner />', () => {
  test('basic render', () => {
    renderSpinner();
  });
});
