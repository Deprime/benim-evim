<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from '$lib/config/i18n';
  import { goto } from '$app/navigation';

  // Componetns
  import { Button } from '$lib/components/ui';
  import { PageHeader, EstateListItem } from '$lib/components/shared';

  import { estateApi } from '$lib/api';

  // Data
  const CREATE_URL = '/profile/posts/create';
  let errors = {};
  let estateList = <any>[];
  let loading = true;

  const loadEstateList = async () => {
    loading = true;
    try {
      const response = await estateApi.list();
      estateList = response.data.estate_list
    }
    catch (error: any) {
      errors = error.response?.data || {};
      throw new Error(error)
    }
    finally {
      loading = false;
    }
  }

  onMount(async () => {
    await loadEstateList();
  })
</script>

<svelte:head>
	<title>
    {$_(`pages.posts.subtitle`)}
  </title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="min-h-full flex flex-col justify-center">
  <PageHeader>
    {$_(`pages.posts.subtitle`)}
    <div slot="actions">
      <Button on:click={() => {goto(CREATE_URL)}}>
        Создать обьявление
      </Button>
    </div>
  </PageHeader>

  {#if loading}
    <div class="space-y-6 bg-white px-4 py-5 sm:p-6  rounded-lg">
      <div class="flex flex-col justify-center items-center py-10 space-y-6 bg-white">
        Загрузка...
      </div>
    </div>
  {:else}
    {#if estateList.length > 0}
      <section>
        {#each estateList as estate}
          <EstateListItem {estate} editorMode />
        {/each}
      </section>
    {:else}
      <div class="space-y-6 bg-white px-4 py-5 sm:p-6  rounded-lg">
        <div class="flex flex-col justify-center items-center py-10 space-y-6 bg-white">
          <p class="text-sm">
            Список актвных обьявлений пуст.
          </p>

          <Button on:click={() => {goto(CREATE_URL)}}>
            Создать обьявление
          </Button>
        </div>
      </div>
    {/if}
  {/if}

</div>
