import React from 'react';
import { render, RenderResult, screen, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AxiosResponse } from 'axios';

import Main from '.';
import ApiService from '../../services/apiService';

jest.mock('../../services/apiService');

const mockApiService = ApiService as jest.Mocked<typeof ApiService>;

const basicProps = {};

const renderMain = (newProps = {}): RenderResult => {
  const props = {
    ...basicProps,
    ...newProps,
  };

  return render(<Main {...props} />);
};

const mockResp: Partial<AxiosResponse> = { data: 'VIAJE' };

describe('<Main />', () => {
  test('basic render', () => {
    mockApiService.getWord.mockResolvedValueOnce(mockResp as AxiosResponse);
    renderMain();
  });

  test('when word is being fetched, spinner is rendered', () => {
    mockApiService.getWord.mockResolvedValueOnce(mockResp as AxiosResponse);
    renderMain();

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('when word is fetched, game is rendered', async () => {
    mockApiService.getWord.mockResolvedValueOnce(mockResp as AxiosResponse);
    renderMain();

    await waitForElementToBeRemoved(screen.queryByTestId('spinner'));

    expect(screen.getByTestId('game')).toBeInTheDocument();
  });
});
