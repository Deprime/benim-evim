<script>
  // Components
  // import LanguageCurrency from "./LanguageCurrency.svelte";
  // import SocialSection from "./SocialSection.svelte";
  // import SubscriptionSection from "./SubscriptionSection.svelte";

  const APP_ENV = import.meta.env.VITE_APP_ENV;
  const APP_VERSION = import.meta.env.VITE_APP_VERSION;
</script>

<footer class="bg-gray-800" aria-labelledby="footer-heading">
  <h2 id="footer-heading" class="sr-only">Footer</h2>
  <div class="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
    <div class="pb-8 xl:grid xl:grid-cols-5 xl:gap-8">
      <div class="grid grid-cols-2 gap-8 xl:col-span-4">
        <div class="md:grid md:grid-cols-2 md:gap-8">
          <div>
            <h3 class="text-base font-medium text-white">
              Разделы
            </h3>
            <ul role="list" class="mt-4 space-y-4">
              <li>
                <a href="/" class="text-base text-gray-300 hover:text-white">
                  Поиск недвижимости
                </a>
              </li>

              <li>
                <a href="/auth/signup" class="text-base text-gray-300 hover:text-white">
                  Регистрация
                </a>
              </li>

              <li>
                <a href="/auth/signin" class="text-base text-gray-300 hover:text-white">
                  Авторизация
                </a>
              </li>

              <li>
                <a href="/company-connection" class="text-base text-gray-300 hover:text-white">
                  Агентствам недвижимости
                </a>
              </li>
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
