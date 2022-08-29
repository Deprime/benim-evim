<script lang="ts">
	import '../app.scss';

  import { Navigation, Footer } from '$lib/components/structure';
</script>


<Navigation />

  <main class="pb-12 lg:min-h-[70vh]">
    <slot />
  </main>

<Footer />
