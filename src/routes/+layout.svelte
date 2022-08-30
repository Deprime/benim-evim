<script lang="ts">
	import '../app.scss';

  import { Navigation, Footer } from '$lib/components/structure';
</script>


<Navigation />

  <main class="pb-12 lg:min-h-[70vh] max-w-[1348px] mx-auto">
    <slot />
  </main>

<Footer />
