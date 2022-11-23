import * as en from './tokens/en-US.json';

const LANGUAGE_CODES = Object.freeze({
  English: 'en-US',
});

const loadLocaleData = locale => {
  switch (locale) {
    case LANGUAGE_CODES.ENGLISH_US:
    case LANGUAGE_CODES.English:
    default:
      return en;
  }
};

export { loadLocaleData, LANGUAGE_CODES };
