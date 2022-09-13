<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from '$lib/config/i18n';
  import { goto } from '$app/navigation';

  // Componetns
  import { Input, Textarea, Editor, Button, Alert } from '$lib/components/ui';

  // Services
  import { userService } from '$lib/services';
  import { dictionaryApi, companyApi } from '$lib/api';

  // Props
  export let show_description = true;
  export let show_info = true;
  export let mode: "create" | "update"  = "create";
  export let company = {
    title: "",
    description: "",
    address: "",
    contacts: <any> [],
  };

  // Data
  let messenger_list: any = [];
  let social_list: any = [];

  const form = {
    loading: false,
    errors: <any>{},
  }

  // Methods

  const formatContacts = () => {
    company.contacts = [];

    messenger_list.forEach((el: any) => {
      if (el.value?.length > 0) {
        company.contacts.push({
          id: el.id,
          content: el.value
        });
      }
    });
    social_list.forEach((el: any) => {
      if (el.value?.length > 0) {
        company.contacts.push({
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
   * Create company
   */
  const create = async () => {
    form.loading = true;
    try {
      formatContacts();
      await companyApi.create(company);
      await userService.getProfile();

      goto('/profile/company');
    }
    catch (error: any) {
      company.contacts = [];
      form.errors = error.response?.data || {};
      throw new Error(error)
    }
    finally {
      form.loading = false;
    }
  }

  /**
   * Update company
   */
  const update = async () => {
    form.loading = true;
    try {
      formatContacts();

      await companyApi.update(company);
      await userService.getProfile();
    }
    catch (error: any) {
      company.contacts = [];
      form.errors = error.response?.data || {};
      throw new Error(error)
    }
    finally {
      form.loading = false;
    }
  }

  /**
   * On submit
   */
  const submit = async () => {
    if (mode === "create") {
      await create();
    }
    if (mode === "update") {
      await update();
    }
  }

  onMount(async () => {
    form.loading = true;

    try {
      await getContactList();

      if (mode === "update") {
        company.contacts.forEach((contact: any) => {
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
        company.contacts = [];
      }
    }
    finally {
      form.loading = false;
    }
  })
</script>

<form
  class="text-sm flex flex-row"
  on:submit|preventDefault={submit}
>
  <div
    class:space-y-6={true}
    class:w-full={true}
    class={show_info ? "md:w-7/12" : "md:w-2/3"}
  >
    <div>
      <Input
        label="Название компании"
        placeholder="Укажите название компании"
        required
        bind:value={company.title}
        disabled={form.loading}
        errors={form.errors.title}
      />
    </div>

    <div>
      <Input
        label="Адрес"
        required
        bind:value={company.address}
        disabled={form.loading}
        errors={form.errors.address}
      />
    </div>

    {#if show_description}
      <div>
        <Editor
          bind:value={company.description}
        />
        <!-- <Textarea
          label="Описание компании"
          placeholder="Краткое описание вашей компании"
          bind:value={company.description}
          disabled={form.loading}
          errors={form.errors.description}
        /> -->
      </div>
    {/if}

    <section class="space-y-4">
      <h4 class="font-medium border-b border-b-slate-200">
        Контакты
      </h4>

      {#if form.errors.contacts}
        <div>
          <Alert variant="danger">
            <p>Необходимо заполнить хотя-бы один контакт</p>
          </Alert>
        </div>
      {/if}

      {#if messenger_list.length > 0}
        <section>
          {#each messenger_list as messenger}
            <div class="mb-4">
              <Input
                label={messenger.title}
                disabled={form.loading}
                placeholder={`https://enter-correct-address.com`}
                bind:value={messenger.value}
              />
            </div>
          {/each}
        </section>
      {/if}
      {#if social_list.length > 0}
        <section>
          {#each social_list as social}
            <div class="mb-4">
              <Input
                label={social.title}
                disabled={form.loading}
                placeholder={`https://enter-correct-address.com`}
                bind:value={social.value}
              />
            </div>
          {/each}
        </section>
      {/if}
    </section>
  </div>

  <div class={show_info ? "md:w-5/12" : "md:w-1/3"}>
    {#if show_info}
      <div class="pl-6">
        <Alert variant="info">
          <p class="mb-2">
            {$_('company_creator.desc1')}
          </p>
          <p class="mb-2">
            {$_('company_creator.desc2')}
          </p>
          <p class="mb-2">
            {$_('company_creator.desc3')}
          </p>
        </Alert>
      </div>
    {/if}
  </div>
</form>

<footer class="text-right flex justify-end">
  <Button
    type="submit"
    loading={form.loading}
    disabled={form.loading}
    on:click={() => { submit(); }}
  >
    {$_('actions.save')}
  </Button>
</footer>
