import * as en from './tokens/en-US.json';
import { createIntl, createIntlCache, IntlShape } from 'react-intl';

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

const imperativeIntl = (): IntlShape => {
  // @ts-ignore
  const locale = store?.getState()?.app?.local || LANGUAGE_CODES.ENGLISH;
  // @ts-ignore
  const messages = loadLocaleData(locale).default;
  const intlCache = createIntlCache();
  return createIntl(
    {
      locale,
      messages,
    },
    intlCache,
  );
};

export { loadLocaleData, LANGUAGE_CODES, imperativeIntl };
