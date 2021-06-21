import jsonfile from 'jsonfile';
import expressHttpContext from 'express-http-context';
import { DEFAULT_LANGUAGE } from './constants';
import { LanguageFile } from './enums';

export const getTranslation = (file: LanguageFile): any => {
  const lang = expressHttpContext.get('lang');

  let translation: any;
  if (lang !== DEFAULT_LANGUAGE) {
    translation = jsonfile.readFileSync(`${__dirname}/../lang/${lang}/${file}`);
  }
  return translation;
};

export const translate = (str: string, file: LanguageFile, lang: string): any => {
  let translatedStr = str;
  if (lang !== DEFAULT_LANGUAGE) {
    const translation = jsonfile.readFileSync(`${__dirname}/../lang/${lang}/${file}`);
    if (translation[str]) {
      translatedStr = translation[str];
    }
  }
  return translatedStr;
};

export const replaceRecursive = (obj: any, replaceKey: string, translation: any): any => {
  const newObj = {};

  Object.keys(obj).forEach((k) => {
    const value = obj[k];

    if (Array.isArray(value)) {
      newObj[k] = value.map((item: any) => replaceRecursive(item, replaceKey, translation));
    } else {
      if (k === replaceKey && translation[value]) {
        newObj[k] = translation[value];
      } else {
        newObj[k] = value;
      }
    }
  });

  return newObj;
};
