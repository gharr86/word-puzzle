import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:3001',
};

const request: AxiosInstance = axios.create(config);

class ApiService {
  static getWord(word_length: number): Promise<AxiosResponse> {
    return request.get('/words', { params: { word_length } });
  }

  static checkWord(word: string): Promise<AxiosResponse> {
    return request.post('/words', { word });
  }
}

export default ApiService;
