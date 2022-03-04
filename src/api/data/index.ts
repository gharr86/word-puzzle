import fs from 'fs';
import path from 'path';

export const getData = (): string[] => {
  const rawWordsList: string = fs.readFileSync(path.resolve(__dirname, './json/index.json'), 'utf8');
  const parsedWordsList: string[] = JSON.parse(rawWordsList);

  return parsedWordsList;
};
