<script lang="ts">
	import '../app.scss';
	import { page } from '$app/stores';

  import { Navigation, Footer } from '$lib/components/structure';

  console.log($page.error)
</script>

{#if !$page.error}
  <Navigation  />

  <main class="pb-12 lg:min-h-[70vh] max-w-[1348px] mx-auto">
    <slot />
  </main>

  <Footer />
{:else}
  <main class="">
    <slot />
  </main>
{/if}
