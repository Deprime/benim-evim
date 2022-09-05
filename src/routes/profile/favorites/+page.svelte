<script lang="ts">
  // import { onMount } from 'svelte';
  import { _ } from '$lib/config/i18n';

  // Componetns
  // import { Checkbox, Input, Button } from '$lib/components/ui';
  import { PageHeader } from '$lib/components/shared';

  import { userStore } from '$lib/stores';

  // Data
  let estateList: any = [];
  const user = {
    email: "",
    password: "",
  }

  // onMount(() => {})
</script>

<svelte:head>
	<title>
    {$_("pages.favorites.title")}
  </title>
	<!-- <meta name="description" content="Svelte demo app" /> -->
</svelte:head>

<div class="min-h-full flex flex-col justify-center">
  <PageHeader>
    {$_("pages.favorites.title")}
  </PageHeader>

  <section>
    {#if estateList.length > 0}
      {#each estateList as estate}
        {estate}
      {/each}
    {:else}
      <div class="p-8 text-center text-slate-600">
        <p>Список сохраненных обьявлений пуст </p>
      </div>
    {/if}
  </section>
</div>
