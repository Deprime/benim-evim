<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from '$lib/config/i18n';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  import { XIcon } from 'svelte-feather-icons'

  // Componetns
  import { Button, Input, Label, Alert } from '$lib/components/ui';
  import { PageHeader } from '$lib/components/shared';
  import NavTabs from '../../_components/NavTabs.svelte';
  // import PhotoUploader from './_components/PhotoUploader.svelte';

  import { estateApi, photoApi } from '$lib/api';
  import { getNotificationsContext } from 'svelte-notifications';

  const CDN_URL = import.meta.env.VITE_CDN_URL;

  // Props
  export let estate = {
    price: 0,
    settlement_id: null,
    rent_type_id: 1,
    estate_type_id: 1,
    currency_id: 1,
    coords: [],
    updateTinker: 0,
  };

  // Data
  let { params } = $page;
  const id = parseInt(params.id);
  const { addNotification } = getNotificationsContext();

  let errors = {};

  let loading = true;
  let form = {
    loading: false,
    errors: {}
  };
  let photos;
  let photoList = []

  // Methods
  /**
   * Load editor data
   */
  const loatPhotos = async (estate_id: number) => {
    loading = true;
    try {
      const response = await photoApi.list(estate_id);
      photoList = response.data;
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
   * Load editor data
   */
  const setPoster = async (photo, index: number) => {
    photoList = photoList.map(el => {
      el.is_poster = 0;
      return el;
    });
    photoList[index].is_poster = 1;

    // loading = true;
    // try {
    //   const response = await photoApi.list(estate_id);
    //   photoList = response.data;
    // }
    // catch (error: any) {
    //   errors = error.response?.data || {};
    //   throw new Error(error)
    // }
    // finally {
    //   loading = false;
    // }
  }

  /**
   * Load editor data
   */
  const remove = async (estate_id: number) => {
    loading = true;
    try {
      const response = await photoApi.list(estate_id);
      photoList = response.data;
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
   * On file change
   */
  const onFileChange = async (e: Event): void => {
    try {
      const file_list = getFileListFromEvent(e);
      const files_arr = getNativeArrayFromFileList(file_list);

      const payload = new FormData();
      files_arr.forEach((file, i) => {
        payload.append(`photos[]`, file);
      });
      await photoApi.create(id, payload);
      loatPhotos(id);
    }
    catch (error: any) {
      errors = error.response?.data || {};
      throw new Error(error)
    }
    finally {
      loading = false;
    }
  };

  /**
   * Get file list from event
   */
  const getFileListFromEvent = (e) => e.target.files || e.dataTransfer.files;

  /**
   * Get native array from file list
   */
  const getNativeArrayFromFileList = (file_list) => Object.values(file_list);

  onMount(async () => {
    if (Number.isInteger(id)) {
      await loatPhotos(id);
    }
  })
</script>

<svelte:head>
	<title>
    {$_(`pages.post_editor.title`)}
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

    {#if !loading}
      <section class="editor-body">
        <div>
          <input
            type="file"
            multiple
            accept="image/png, image/jpeg"
            bind:files={photos}
            on:change={e => onFileChange(e)}
          />
          <!-- <PhotoUploader /> -->
        </div>

        <div class="flex flex-row space-x-4">
          <div class="grid grid-cols-4 gap-4">
            {#each photoList as photo, index}
              <div class="image-item">
                <img
                  src={`${CDN_URL}/${photo.url}`}
                  alt={photo.id}
                />

                <span
                  class="image-item-action image-item-poster"
                  class:inline-block={photo.is_poster}
                  on:click={() => setPoster(photo, index)}
                >
                  {photo.is_poster ? "Постер" : "Сделать постером"}
                </span>
                <span
                  class="image-item-action image-item-remove"
                  on:click={() => remove(photo, index)}
                >
                  <XIcon size="12" />
                </span>
              </div>
            {/each}
          </div>
        </div>
      </section>
    {:else}
      <div class="py-16 flex content-center justify-center">
        Загрузка
      </div>
    {/if}

    <footer class="bg-gray-100 px-4 py-3 text-right flex justify-end sm:px-6 hidden">
      <Button
        type="submit"
        loading={form.loading}
        disabled={form.loading}
      >
        {$_('actions.save')}
      </Button>
    </footer>
  </div>

</div>


<style lang="scss">
  .editor-body {
    @apply space-y-6 bg-white px-4 py-5 sm:p-6
  }

  .image-item {
    @apply overflow-hidden h-36 rounded-md relative;

    &-action {
      @apply absolute;
      @apply flex justify-center items-center;
      @apply cursor-pointer;
    }


    &-poster {
      @apply w-fit h-5 px-2 rounded-sm;
      @apply bottom-1.5 left-1.5;
      @apply bg-slate-900 bg-opacity-80;
      @apply text-white text-xs;
      @apply hidden;
    }

    &:hover {
      .image-item-poster {
        @apply inline-block opacity-100;
      }
    }


    &-remove {
      @apply w-5 h-5 rounded-full ;
      @apply top-1.5 right-1.5;
      @apply bg-slate-900 bg-opacity-80;
      @apply text-white;
      @apply opacity-70;

      &:hover {
        @apply opacity-100;
      }
    }
  }
</style>
