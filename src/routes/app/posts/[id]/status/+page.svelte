<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from '$lib/config/i18n';
  import { page } from '$app/stores';

  // import { XIcon } from 'svelte-feather-icons'

  // Componetns
  import { Button } from '$lib/components/ui';
  import { PageHeader } from '$lib/components/shared';
  import NavTabs from '../../_components/NavTabs.svelte';

  // Services
  import { estateApi, dictionaryApi } from '$lib/api';
  import { getNotificationsContext } from 'svelte-notifications';
  import toast from 'svelte-french-toast'

  // Data
  let { params } = $page;
  const id = parseInt(params.id);
  const { addNotification } = getNotificationsContext();

  let errors = {};

  let loading = true;
  let status_list: any = [];
  let estate_status: any = {};
  let current_status: any = {};

  // Methods
  /**
   * Get Status List
   */
  const getStatusList = async () => {
    loading = true;
    try {
      const response = await dictionaryApi.getStatusList();
      status_list = response.data;
    }
    catch (error: any) {
      errors = error.response?.data || {};
      throw new Error(error)
    }
    finally {
      loading = false;
    }
  }

  /**
   * Get status
   */
  const getStatus = async () => {
    const response = await estateApi.getStatus(id);
    estate_status = response.data;
    current_status = {...estate_status};
  }

  /**
   * Set photo as a poster
   */
  const setStatus = async () => {
    try {
      const data = {
        status: estate_status.id
      }
      await estateApi.setStatus(id, data);
      await getStatus();
      toast.success($_('noty.status_changed'), {position: "top-right"});
      errors = {};
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
    if (Number.isInteger(id)) {
      await getStatusList();
      await getStatus();
    }
  })
</script>

<svelte:head>
	<title>
    {$_(`pages.post_editor.title_status`)}
  </title>
</svelte:head>

<div class="min-h-full flex flex-col justify-center">
  <PageHeader>
    {$_(`pages.post_editor.title`)}
  </PageHeader>

  <div class="shadow rounded-md text-sm">
    <nav class="py-4 px-6 bg-slate-50 border-b border-b-slate-200 rounded-t-md">
      <NavTabs id={$page.params.id} />
    </nav>

    <section class="editor-body">
      <h3 class="font-medium text-lg">
        {$_(`pages.post_editor.title_status`)}
      </h3>

      <h4>
        {$_(`pages.post_editor.current_status`)}: {$_(`estate_statuses.${current_status.mui_key}`, {default: current_status.mui_key})}
      </h4>

      <section>
        {#each status_list as status_item}
          <div class="selector-wrapper">
            <label for={`status-${status_item.id}`} class="selector-item">
              <input
                id={`status-${status_item.id}`}
                type=radio
                name="status_list"
                bind:group={estate_status.id}
                value={status_item.id}
                class="mr-2"
              />
              <span>
                {$_(`estate_statuses.${status_item.mui_key}`, {default: status_item.mui_key})}
              </span>
            </label>
          </div>
        {/each}
      </section>

    </section>

    <footer class="bg-gray-100 px-4 py-3 text-right flex justify-end sm:px-6">
      <Button
        on:click={setStatus}
        loading={loading}
        disabled={loading}
      >
        {$_('actions.save')}
      </Button>
    </footer>
  </div>

</div>

<style lang="scss">
  .editor-body {
    @apply space-y-6 bg-white px-4 py-5 sm:p-6;
  }

  .selector-wrapper {
    @apply flex mb-2  w-80;
  }
  .selector-item {
    @apply cursor-pointer;
    @apply bg-slate-50 px-3 py-2 rounded-md;
    @apply flex flex-row items-center w-full;
  }
</style>
