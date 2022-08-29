import { derived } from 'svelte/store';
import { dictionary, locale, _ } from 'svelte-i18n';
import { DEFAULT_LOCALE } from '$lib/constants/languages';

const LOCALE_FILE_URL = `/locales/{locale}.json`;
let cachedLocale;

// TODO: Need to implement cache for dictionary keys with key lifetime;
/**
 * Setup i18n
 */
const setupI18n = ({ withLocale: _locale } = { withLocale: DEFAULT_LOCALE}): Promise<any> => {

  const url = LOCALE_FILE_URL.replace('{locale}', _locale);
  localStorage.setItem('default_locale', _locale);

  // const url = (!!LANGS[_locale]) ? LANGS[_locale] : LANGS.en;
  return fetch(url)
    .then(response => response.json())
    .then((messages) => {
      dictionary.set({ [_locale]: messages });
      cachedLocale = _locale;
      locale.set(_locale);
    });
}

const isLocaleLoaded = derived(locale, $locale => typeof $locale === 'string');
const dir = derived(locale, $locale => $locale === 'ar' ? 'rtl' : 'ltr');

export { _, locale, dir, setupI18n, isLocaleLoaded };
