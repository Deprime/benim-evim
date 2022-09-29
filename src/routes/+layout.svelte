<script lang="ts">
	import '../app.scss';

  import { onMount } from 'svelte';
	import { page } from '$app/stores';
  import { browser } from '$app/environment';

  // Components
  import { Navigation, Footer } from '$lib/components/structure';
  import { Toaster } from 'svelte-french-toast'
  import Notifications from 'svelte-notifications';

  // Serivces
  import { setupI18n, isLocaleLoaded, dir, locale } from '$lib/config/i18n';

  // Store
  import { userService } from '$lib/services';
  import { userStore } from '$lib/stores';

  // Constants
  import { DEFAULT_LOCALE } from '$lib/constants/languages';

  // Methods
  onMount(async () => {
    let defaultLocale = DEFAULT_LOCALE;
    let savedLocale;

    // Checking saved locale
    if (typeof localStorage === 'object') {
      savedLocale = localStorage.getItem('locale');
    }

    if (!savedLocale && navigator.languages && navigator.languages[0]) {
      const clientLocale = navigator.languages[0].split('-');
      defaultLocale = clientLocale[0];
    }

    setupI18n({ withLocale: savedLocale || defaultLocale });

    if (userStore.isLoggedIn()) {
      await userService.getProfile();
    }

    if ($page.error) {
      console.log($page.error)
    }
  })
</script>

{#if !$page.error}
  {#if $isLocaleLoaded}
    <Notifications>
      <div>
        <Navigation />
        <main class="pb-12 lg:min-h-[70vh] max-w-[1348px] mx-auto">
          <slot />
        </main>
        <Footer />

        <Toaster />
      </div>
    </Notifications>
  {/if}
{:else}
  {#if $isLocaleLoaded}
    <main class="">
      <slot />
    </main>
  {/if}
{/if}
