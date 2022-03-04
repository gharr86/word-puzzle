import { Request, Response } from 'express';

import { getWord } from './controller';

import { getData } from '../../data';
import { ERROR_MESSAGE, BAD_REQUEST_MESSAGE } from '../../constants';

jest.mock('../../data', () => {
  const originalModule = jest.requireActual('../../data');

  return {
    ...originalModule,
    getData: jest.fn(),
  };
});

const mockGetData = getData as jest.MockedFunction<typeof getData>;

const mockWordList: string[] = ['viaje', 'sin'];
let mockRes: Partial<Response>;

beforeEach(() => {
  mockRes = {
    // @ts-ignore: Unreachable code error
    status: jest.fn(() => mockRes),
    send: jest.fn(),
  };
});

describe('getToDoList', () => {
  describe('when data is fetched', () => {
    test('when word_length param is not received, 200 status is set and data is sent', () => {
      mockGetData.mockReturnValueOnce(mockWordList);
  
      const mockReq: Partial<Request> = {};
  
      getWord(mockReq as Request, mockRes as Response);
  
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockWordList);
    });

    test('when word_length param is received, 200 status is set and random word is sent', () => {
      mockGetData.mockReturnValueOnce(mockWordList);
  
      const mockReq: Partial<Request> = { query: { word_length: '5' } };
  
      getWord(mockReq as Request, mockRes as Response);
  
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockWordList[0]);
    });

    test('when word_length param is not ok, 400 status is set and error message is sent', () => {
      mockGetData.mockReturnValueOnce(undefined);
  
      const mockReq: Partial<Request> = { query: { word_length: 'abc' } };
  
      getWord(mockReq as Request, mockRes as Response);
  
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith(BAD_REQUEST_MESSAGE);
    });
  });

  test('when data is not fetched, 500 status is set and error message is sent', () => {
    mockGetData.mockReturnValueOnce(undefined);

    const mockReq: Partial<Request> = {};

    getWord(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith(ERROR_MESSAGE);
  });
});
