import { get } from 'svelte/store';
import { appStore } from '$lib/stores';
import { LANGUAGE_LIST, DEFAULT_LOCALE } from '$lib/constants/languages';
import { setupI18n, dir } from '$lib/config/i18n';

const i18nService = {
  /**
   * Setup locale
   */
  setupLocale: async (selectedLocale: string): Promise<any> => {
    const locales  = LANGUAGE_LIST.map(item => item.locale);
    const $$locale = (locales.includes(selectedLocale)) ?  selectedLocale : DEFAULT_LOCALE;

    setupI18n({ withLocale: $$locale });
    document.dir = get(dir);
    appStore.setLocale($$locale);
  }
}

export default i18nService;
