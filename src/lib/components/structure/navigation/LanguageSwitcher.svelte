<script lang="ts">
  import { locale, setupI18n } from '$lib/config/i18n';

  import { LANGUAGE_LIST } from '$lib/constants/languages';

  // Data
  let visible = false;

  // Reactive
  $: currentLaguage = getCurrentLanguage($locale)
  $: otherLanguages = getOthertLanguages($locale)

  // Methods
  /**
   * Get current language
   */
  const getCurrentLanguage = ($$locale) => {
    const lang = LANGUAGE_LIST.find(el => el.locale === $$locale);
    return lang || LANGUAGE_LIST[0];
  }

  /**
   * Get other languages
   */
  const getOthertLanguages = ($$locale) => {
    return LANGUAGE_LIST.filter(el => el.locale !== $$locale);
  }

  /**
   * Set locale
   */
  const setLocale = (lang) => {
    visible = false;

    if (typeof localStorage === 'object') {
      localStorage.setItem('locale', lang);
    }
    setupI18n({ withLocale: lang.locale });
  }
</script>

<div class="lang-switcher">
  <div>
    <span
      class="lang-switcher-button"
      on:click={() => {visible = !visible}}
    >
      <img
        src={`https://flagcdn.com/${currentLaguage.locale}.svg`}
        title={currentLaguage.native_title}
        alt={currentLaguage.title}
        class="w-5 rounded-sm"
      />
    </span>
  </div>

  {#if visible}
    <div class="lang-list-wrapper" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <ul class="lang-list">
        {#each otherLanguages as lang}
          <li
            class="lang-list-item"
            on:click={() => {setLocale(lang)}}
          >
            <img
              class="w-5 h-4 mr-2"
              src={`https://flagcdn.com/${lang.locale}.svg`}
              title={lang.native_title}
              alt={lang.title}
            />

            <span class="text-sm text-slate-700">
              {lang.title}
            </span>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style lang="scss">
  .lang-switcher {
    @apply relative inline-block text-left;

    &-button {
      @apply flex flex-row items-center bg-slate-100 px-2 py-2 rounded-md space-x-2 cursor-pointer;
    }
  }

  .lang-list-wrapper {
    @apply absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md;
    @apply bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none;
  }

  .lang-list {
    @apply py-1;

    &-item {
      @apply text-gray-700 px-4 py-2 text-sm flex flex-row items-center cursor-pointer
    }
  }
</style>
