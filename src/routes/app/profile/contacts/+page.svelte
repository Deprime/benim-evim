<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from '$lib/config/i18n';

  // Componetns
  import { Input, Button, Label, Alert } from '$lib/components/ui';
  import { PageHeader } from '$lib/components/shared';

  // Services
  import { dictionaryApi, userApi } from '$lib/api';

  // Data
  let messenger_list: any = [];
  let social_list: any = [];
  let contacts: any[] = [];

  const form = {
    loading: false,
    errors: <any>{},
  }

  // Methods
  /**
   * formatContacts
   */
  const formatContacts = () => {
    contacts = [];

    messenger_list.forEach((el: any) => {
      if (el.value?.length > 0) {
        contacts.push({
          id: el.id,
          content: el.value
        });
      }
    });

    social_list.forEach((el: any) => {
      if (el.value?.length > 0) {
        contacts.push({
          id: el.id,
          content: el.value
        });
      }
    });
  }

  /**
   * getContactList
   */
   const getContactList = async (): Promise<any> => {
    try {
      const request = await dictionaryApi.getContactList();
      messenger_list = request.data.filter((el: any) => el.content_type === "messenger");
      social_list = request.data.filter((el: any) => el.content_type === "social");
    }
    catch (error: any) {
      throw new Error(error)
    }
  }

  /**
   * Update contacts
   */
  const update = async () => {
    form.loading = true;
    try {
      formatContacts();
      const data = { contacts };
      await userApi.updateContacts(data);
      form.errors = {};
    }
    catch (error: any) {
      contacts = [];
      form.errors = error.response?.data || {};
      throw new Error(error)
    }
    finally {
      form.loading = false;
    }
  }

  onMount(async () => {
    form.loading = true;
    try {
      await getContactList();
      const response = await userApi.getContacts();
      contacts = response.data;

      contacts.forEach((contact: any) => {
        const { pivot } = contact
        if (contact.content_type === "messenger") {
          const index = messenger_list.findIndex((item: any) => item.id === pivot.contact_id);
          messenger_list[index].value = pivot.content;
        }

        if (contact.content_type === "social") {
          const index = social_list.findIndex((item: any) => item.id === pivot.contact_id);
          social_list[index].value = pivot.content;
        }
      })
    }
    finally {
      form.loading = false;
    }
  })
</script>

<svelte:head>
	<title>
    {$_('pages.contacts.title')}
  </title>
</svelte:head>

<div class="min-h-full flex flex-col justify-center">
  <PageHeader>
    {$_('pages.contacts.title')}
  </PageHeader>

  <div class="shadow sm:overflow-hidden sm:rounded-md bg-white">
    <form on:submit|preventDefault={update} class="text-sm px-4 py-5 sm:p-6">
      <section class="space-y-4">
        <div>
          {#if form.errors.contacts}
            <Alert variant="danger">
              <p>
                {$_('pages.contacts.data_need')}
              </p>
            </Alert>
          {:else}
            <p>
              {$_('pages.contacts.data_need')}
            </p>
          {/if}
        </div>

        {#if messenger_list.length > 0}
          <section>
            {#each messenger_list as messenger}
              <div class="contact-form-item">
                <Input
                  label={messenger.title}
                  disabled={form.loading}
                  placeholder={messenger.placeholder || `https://enter-correct-address.com`}
                  bind:value={messenger.value}
                />
                {#if messenger.example}
                  <p class="contact-example">
                    {$_('actions.example')}: {messenger.example}
                  </p>
                {/if}
              </div>
            {/each}
          </section>
        {/if}

        {#if social_list.length > 0}
          <section>
            {#each social_list as social}
              <div class="contact-form-item">
                <Input
                  label={social.title}
                  disabled={form.loading}
                  placeholder={social.placeholder || `https://enter-correct-address.com`}
                  bind:value={social.value}
                />
                {#if social.example}
                  <p class="contact-example">
                    {$_('actions.example')}: {social.example}
                  </p>
                {/if}
              </div>
            {/each}
          </section>
        {/if}
      </section>
    </form>
    <footer class="bg-gray-100 px-4 py-3 text-right flex justify-end sm:px-6">
      <Button
        on:click={update}
        loading={form.loading}
        disabled={form.loading}
      >
        {$_('actions.save')}
      </Button>
    </footer>
  </div>
</div>

<style lang="scss">
  .contact-form-item {
    @apply mb-6 w-full md:w-2/3 lg:w-2/4;

    .contact-example {
      @apply text-xs text-slate-500 pt-1;
    }
  }
</style>
