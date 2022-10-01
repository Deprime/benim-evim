<script>
  import { _ } from '$lib/config/i18n';

  // Components
  // import LanguageCurrency from "./LanguageCurrency.svelte";
  // import SocialSection from "./SocialSection.svelte";
  // import SubscriptionSection from "./SubscriptionSection.svelte";

  const APP_ENV = import.meta.env.VITE_APP_ENV;
  const APP_VERSION = import.meta.env.VITE_APP_VERSION;

  const mainMenu = [
    {url: "/", key: "footer.mainMenu.item1", defaultTitle: "Поиск недвижимости"},
    {url: "/auth/signup", key: "footer.mainMenu.item2", defaultTitle: "Регистрация"},
    {url: "/auth/signin", key: "footer.mainMenu.item3", defaultTitle: "Авторизация"},
    {url: "/company-connection", key: "footer.mainMenu.item4", defaultTitle: "Агентствам недвижимости"},
  ];
</script>

<footer class="bg-gray-800" aria-labelledby="footer-heading">
  <h2 id="footer-heading" class="sr-only">Footer</h2>
  <div class="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
    <div class="pb-8 xl:grid xl:grid-cols-5 xl:gap-8">
      <div class="grid grid-cols-2 gap-8 xl:col-span-4">
        <div class="md:grid md:grid-cols-2 md:gap-8">
          <div>
            <h3 class="text-base font-medium text-white mb-2 pb-2 border-b border-solid border-b-gray-700/50">
              {$_("footer.mainMenu.title")}
            </h3>
            <ul class="mt-4 space-y-4">
              {#each mainMenu as item}
                <li>
                  <a href={item.url} class="text-base text-gray-300 hover:text-white">
                    {$_(`footer.mainMenu.${item.key}`, {default: item.defaultTitle})}
                  </a>
                </li>
              {/each}
            </ul>
            <div class="app-info">
              build: {APP_ENV}-v{APP_VERSION}
            </div>
          </div>
        </div>
      </div>
      <!-- <LanguageCurrency /> -->
    </div>


    <!-- <SubscriptionSection /> -->
    <!-- <SocialSection /> -->
  </div>
</footer>

<style lang="scss">
  .app-info {
    @apply text-slate-100 opacity-10 text-xs py-4 cursor-default select-none;
  }
</style>
