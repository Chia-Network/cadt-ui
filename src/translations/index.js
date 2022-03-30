import * as es from './tokens/es.json';
import * as en from './tokens/en-US.json';
import * as ja from './tokens/ja.json';

const LANGUAGE_CODES = Object.freeze({
  ENGLISH: 'en-US',
  SPANISH: 'es',
  JAPANESE: 'ja',
});

const loadLocaleData = locale => {
  switch (locale) {
    case LANGUAGE_CODES.SPANISH:
      return es;
    case LANGUAGE_CODES.JAPANESE:
      return ja;
    case LANGUAGE_CODES.ENGLISH_US:
    case LANGUAGE_CODES.ENGLISH:
    default:
      return en;
  }
};

export { loadLocaleData, LANGUAGE_CODES };
