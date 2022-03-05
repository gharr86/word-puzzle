import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Main from '.';

const basicProps = {};

const renderMain = (newProps: {} = {}): RenderResult => {
  const props = {
    ...basicProps,
    ...newProps,
  };

  return render(<Main {...props} />);
};

describe('<Main />', () => {
  test('basic render', () => {
    renderMain();
  });
});
