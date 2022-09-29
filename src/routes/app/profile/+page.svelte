<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from '$lib/config/i18n';
  // import cloneDeep  from 'lodash.clonedeep';

  // Componetns
  import { Input, Button, Label, Modal } from '$lib/components/ui';
  import { PageHeader } from '$lib/components/shared';
  import RealtorAlert from '../_components/RealtorAlert.svelte';
  import CompanySelectionForm from '../_components/CompanySelectionForm.svelte';

  // Services
  import { userStore } from '$lib/stores';
  import { dictionaryApi, userApi } from '$lib/api';
  import { userService } from '$lib/services';

  // Data
  let show_company_list = false;
  let prefix_list: any = [];
  const user: any = {};
  const form = {
    loading: false,
    errors: {},
  }

  // Methods
  /**
   * Get prefix list
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

  /**
   * Refresh profile
   */
  const refresh = async () => {
    show_company_list = false;
    form.loading = true;
    try {
      await userService.getProfile();
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
	<title>
    {$_('pages.profile.title')}
  </title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="min-h-full flex flex-col justify-center">
  <PageHeader>
    {$_('pages.profile.title')}
  </PageHeader>

  <div class="md:grid md:grid-cols-3 md:gap-6">
    <div class="mt-5 md:col-span-2 md:mt-0">
      <form on:submit|preventDefault={update}  class="text-sm">
        <div class="shadow sm:overflow-hidden sm:rounded-md">
          <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
            <div>
              <Input
                label={$_('pages.profile.your_name')}
                placeholder="Укажите ваше имя"
                class="w-full md:w-2/3"
                bind:value={user.first_name}
                disabled={form.loading}
                errors={form.errors.first_name}
              />
            </div>

            <div>
              <Input
                label={$_('pages.profile.email')}
                placeholder="Укажите ваш email"
                class="w-full md:w-2/3"
                type="email"
                bind:value={user.email}
                disabled={form.loading}
                errors={form.errors.email}
              />

              <!--
              <div class="text-gray-500 pt-3">
                {#if user.email_verified_at}
                  Email подтвержден: {user.email_verified_at}
                {:else}
                  Email не подтвержден.
                {/if}
              </div>
              -->
            </div>

            <div>
              <Label for="phone">
                {$_('pages.profile.phone')}
              </Label>

              <Input
                id="phone"
                class="w-1/2"
                type="text"
                name="phone"
                disabled
                value={user.phone ? `${user.prefix} ${user.phone}` : ""}
              />

              {#if !form.loading && user.phone_verified_at}
                <p class="py-1 text-xs text-gray-500">
                  {$_('pages.profile.phone_validated')}: {user.phone_verified_at}
                </p>
              {/if}

              <span class="pb-2 link hidden">
                Изменить номер телефона
              </span>
            </div>

            {#if $userStore.data
              && $userStore.data.role !== 'dementor'
              && !$userStore.data.company_id
              && $userStore.data.realtor_accesses?.length === 0
            }
              <RealtorAlert
                on:show-company-list={() => { show_company_list = true; }}
              />
            {/if}
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
  bind:visible={show_company_list}
  title="Список агентств"
>
  {#if show_company_list}
    <CompanySelectionForm
      on:sent={() => { refresh(); }}
    />
  {/if}
</Modal>
