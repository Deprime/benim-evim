<script lang="ts">
	import { goto } from '$app/navigation';
  import { userStore } from '$lib/stores';

  userStore.clear();
  goto('/')
</script>

<svelte:head>
	<title>Sign out</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
