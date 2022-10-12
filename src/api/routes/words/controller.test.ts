/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';

import { getWord, checkWord } from './controller';
let mockRes: Partial<Response>;

beforeEach(() => {
  mockRes = {
    // @ts-ignore: Unreachable code error
    status: jest.fn(() => mockRes),
    send: jest.fn(),
  };
});

describe('getWord', () => {
  test('when word_length param is received, 200 status is set and word is sent', () => {
    const mockReq: Partial<Request> = { query: { word_length: '5' } };

    getWord(mockReq as Request, mockRes as Response);
    // @ts-ignore: Unreachable code error
    const sentWord: string = mockRes.send.mock.calls[0][0];

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(typeof sentWord).toEqual('string');
    expect(sentWord.length).toEqual(5);
  });

  test('when word_length param is not received, 200 status is set and word is sent', () => {
    const mockReq: Partial<Request> = { query: {} };

    getWord(mockReq as Request, mockRes as Response);
    // @ts-ignore: Unreachable code error
    const sentWord: string = mockRes.send.mock.calls[0][0];

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(typeof sentWord).toEqual('string');
    expect(sentWord.length).toBeGreaterThan(0);
  });

  test('when word_length param is not a valid length, 200 status is set and word is sent', () => {
    const mockReq: Partial<Request> = { query: { word_length: '5A' } };

    getWord(mockReq as Request, mockRes as Response);
    // @ts-ignore: Unreachable code error
    const sentWord: string = mockRes.send.mock.calls[0][0];

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(typeof sentWord).toEqual('string');
    expect(sentWord.length).toBeGreaterThan(0);
  });
});

describe('checkWord', () => {
  test('when word is received, its checked against list', () => {
    const mockReq: Partial<Request> = { body: { word: 'casa' } };

    checkWord(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith(true);
  });

  test('when word is not received, it returns false', () => {
    const mockReq: Partial<Request> = { body: {} };

    checkWord(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith(false);
  });
});
