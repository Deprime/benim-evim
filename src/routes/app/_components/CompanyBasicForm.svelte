<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { _ } from '$lib/config/i18n';

  // Componetns
  import { Input, Editor, Button, Label, ErrorNotification } from '$lib/components/ui';
  import { SearchIcon } from 'svelte-feather-icons'

  // Services
  import { userManagmentApi, companyManagmentApi, companyApi } from '$lib/api';

  // Types
  import type { IUser } from '$lib/interfaces';

  // Props
  export let show_description = true;
  export let show_info = true;
  export let managment_mode = false;
  export let company = {
    id: undefined,
    title: "",
    head_id: undefined,
    head: undefined,
    description: "",
    address: "",
    inn: "",
  };
  export let mode: "create" | "update"  = company.id ? "update" : "create";

  // Data
  const dispatch = createEventDispatcher();
  let head_phone = "";
  let user_list: IUser[] = [];
  const form = {
    loading: false,
    search: false,
    errors: <any>{},
  }

  // Methods
  /**
   * Get User List
   */
  const getUserList = async (): Promise<any> => {
    form.search = true;
    try {
      const request = await userManagmentApi.list({phone: head_phone});
      user_list = request.data.user_list;
    }
    catch (error: any) {
      throw new Error(error)
    }
    finally {
      form.search = false;
    }
  }

  /**
   * On search typing
   */
  const onSearchTyping = (event: any) => {
    if (event.key === "Enter" && head_phone.length >= 1) {
      getUserList();
    }
  }

  /**
   * Set company head
   */
  const setCompanyHead = (user: IUser) => {
    company.head = user;
    company.head_id = user.id;
  }

  /**
   * Create company
   */
  const create = async () => {
    form.loading = true;
    try {
      await companyManagmentApi.create(company);
      dispatch("created")
    }
    catch (error: any) {
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
      if (managment_mode) {
        await companyManagmentApi.update(company.id, company);
      }
      else {
        await companyApi.update(company)
      }
      dispatch("updated")
    }
    catch (error: any) {
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

  // onMount(async () => {})
</script>

<section class="text-sm flex flex-row">
  <div
    class:space-y-6={true}
    class:w-full={true}
    class={show_info ? "md:w-7/12" : "md:w-2/3"}
  >
    <div>
      <Input
        label="Название агентства"
        placeholder="Укажите название агентства"
        required
        bind:value={company.title}
        disabled={form.loading}
        errors={form.errors.title}
      />
    </div>

    <div>
      <Input
        label="Адрес"
        placeholder="Страна, город"
        required
        bind:value={company.address}
        disabled={form.loading}
        errors={form.errors.address}
      />
    </div>

    <div>
      <Input
        label="ИНН"
        placeholder="10 или 12 цифр"
        required
        bind:value={company.inn}
        disabled={form.loading || !managment_mode}
        errors={form.errors.inn}
      />
    </div>

    {#if managment_mode}
      <div class="pb-6 border-b border-solid border-b-slate-200">
        <Label>
          Представитель <span class="text-red-500">*</span>
        </Label>
        {#if form.errors.head_id}
          <ErrorNotification errors={form.errors.head_id} />
        {/if}

        <div class="py-2">
          {#if company.head}
            <span class="text-blue-900 font-medium inline-block bg-blue-100 px-3 py-1 rounded">
              {company.head.first_name}: {company.head.prefix} {company.head.phone}
            </span>
            {:else}
            <span class="text-slate-600 inline-block bg-slate-100 px-3 py-1 rounded">
              Не выбран
            </span>
          {/if}
        </div>

        {#if !company.id}
          <div class="flex flex-row relative">
            <Input
              placeholder="Поиск по номеру телефона"
              bind:value={head_phone}
              disabled={form.loading || form.search}
              class="flex-grow mr-1 relative z-[1]"
              on:keypress={onSearchTyping}
            />
            <SearchIcon size="20" class="text-slate-600 absolute top-2 right-4 z-[2]" />
          </div>

          <div class="pt-4 space-y-2">
            {#each user_list as user}
              <div
                class="text-slate-600 inline-block py-2 pl-10 rounded w-full cursor-pointer"
                class:bg-slate-100={user.id !== company.head_id}
                class:bg-blue-100={user.id === company.head_id}
                on:click={() => {setCompanyHead(user)}}
              >
                {user.first_name}: {user.prefix} {user.phone}
              </div>
            {/each}
          </div>
        {/if}

      </div>
    {/if}

    {#if show_description}
      <div>
        <Label>
          Описание агентства
        </Label>
        <Editor
          bind:value={company.description}
        />
      </div>
    {/if}
  </div>
</section>

<footer class="text-right  flex justify-end">
  <Button
    type="submit"
    loading={form.loading}
    disabled={form.loading}
    on:click={() => { submit(); }}
  >
    {$_('actions.save')}
  </Button>
</footer>
