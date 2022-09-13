<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from '$lib/config/i18n';
  // import cloneDeep  from 'lodash.clonedeep';

  // Componetns
  import { Input, Button, Label, Modal } from '$lib/components/ui';
  import { PageHeader  } from '$lib/components/shared';
  import CompanyBasicForm from './_components/CompanyBasicForm.svelte';

  import { userStore } from '$lib/stores';
  import { dictionaryApi, userApi } from '$lib/api';
  import { userService } from '$lib/services';

  // Data
  let show_creator = false;
  let create_company = false;

  let prefix_list: any = [];
  const user: any = {};
  const form = {
    loading: false,
    errors: {},
  }

  /**
   * loadInititalData
   */
  const getPrefixList = async (): Promise<any> => {
    form.loading = true;
    try {
      const request = await dictionaryApi.getPhonePrefixList();
      prefix_list = request.data;
    }
    catch (error: any) {
      throw new Error(error)
    }
    finally {
      form.loading = false;
    }
  }

  /**
   * Update profile
   */
  const update = async () => {
    form.loading = true;
    try {
      await userApi.updateProfile(user);
      form.errors = {};
      await userService.getProfile();
    }
    catch (error: any) {
      form.errors = error.response?.data || {};
      throw new Error(error)
    }
    finally {
      form.loading = false;
    }
  }

  onMount(async () => {
    await getPrefixList();
    const data = $userStore.data;
    Object.keys(data).forEach(key => {
      user[key] = data[key];
    })
  })
</script>

<svelte:head>
	<title>User profile</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="min-h-full flex flex-col justify-center">
  <PageHeader>
    User profile
  </PageHeader>

  <div class="md:grid md:grid-cols-3 md:gap-6">
    <div class="mt-5 md:col-span-2 md:mt-0">
      <form on:submit|preventDefault={update}  class="text-sm">
        <div class="shadow sm:overflow-hidden sm:rounded-md">
          <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
            <div>
              <Input
                label="Ваше имя"
                placeholder="Укажите ваше имя"
                class="w-full md:w-2/3"
                bind:value={user.first_name}
                disabled={form.loading}
                errors={form.errors.first_name}
              />
            </div>

            {#if $userStore.data && !$userStore.data.company_id}
              <div class="w-2/3 border-t border-t-slate-200 border-b border-b-slate-200">
                <div class="py-6">
                  <p class="pb-4">
                    Если вы хотите размещать объявления на сайте и оказывать услуги риэлтора, зарегистрируйте свою компанию.
                  </p>
                  <Button synthetic block on:click={() => {
                    create_company = true;
                    show_creator = true;
                  }}>
                    Зарегистрировать компанию-риэлтора
                  </Button>
                </div>
            </div>
            {/if}

            <div>
              <Input
                label="Ваш email"
                placeholder="Укажите ваш email"
                class="w-full md:w-2/3 pb-3"
                type="email"
                bind:value={user.email}
                disabled={form.loading}
                errors={form.errors.email}
              />

              <div class="pb-1 text-gray-500">
                {#if user.email_verified_at}
                  Email подтвержден: {user.email_verified_at}
                {:else}
                  Email не подтвержден.
                {/if}
              </div>
            </div>

            <div>
              <Label for="phone">
                Ваш номер телефона
              </Label>

              <Input
                id="phone"
                class="w-1/2"
                placeholder="Enter phone number"
                type="text"
                name="phone"
                disabled
                value={`${user.prefix} ${user.phone}`}
              />

              <p class="pb-1 text-gray-500">
                {#if user.phone_verified_at}
                  Номер подтвержден: {user.phone_verified_at}
                {/if}
              </p>

              <span class="pb-2 link hidden">
                Изменить номер телефона
              </span>
            </div>

            <!--
            <div class="grid grid-cols-3">
              <div class="col-span-3 sm:col-span-2">
                <label for="company-website" class="block text-sm font-medium text-gray-700">
                  Whatsapp
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">https://</span>
                  <input type="text" name="company-website" id="company-website" class="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="wa.me/qr/AddMeInWA">
                </div>
              </div>
            </div>

            <div class="grid grid-cols-3">
              <div class="col-span-3 sm:col-span-2">
                <label for="company-website" class="block text-sm font-medium text-gray-700">
                  Telegram
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">https://</span>
                  <input type="text" name="company-website" id="company-website" class="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="t.me/BestUser">
                </div>
              </div>
            </div>
            -->
          </div>

          <div class="bg-gray-100 px-4 py-3 text-right flex justify-end sm:px-6">
            <Button
              type="submit"
              loading={form.loading}
              disabled={form.loading}
            >
              {$_('actions.save')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

<Modal
  bind:visible={show_creator}
  title={$_('company_creator.title')}
>
  {#if create_company}
    <CompanyBasicForm
      show_description={false}
    />
  {/if}
</Modal>
