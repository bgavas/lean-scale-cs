import jsonfile from 'jsonfile';
import { DEFAULT_LANGUAGE } from './constants';
import { LanguageFile } from './enums';

export const getTranslation = (file: LanguageFile, lang: string): any => {
  let translation: any;
  if (lang !== DEFAULT_LANGUAGE) {
    translation = jsonfile.readFileSync(`${__dirname}/../lang/${lang}/${file}`);
  }
  return translation;
};
