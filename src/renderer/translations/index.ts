import * as en from './tokens/en-US.json';

const LANGUAGE_CODES = Object.freeze({
  ENGLISH_US: 'en-US',
  ENGLISH: 'en',
});

const loadLocaleData = (locale: string) => {
  switch (locale) {
    case LANGUAGE_CODES.ENGLISH_US:
    case LANGUAGE_CODES.ENGLISH:
    default:
      return en;
  }
};

export { loadLocaleData, LANGUAGE_CODES };
