<script lang="ts">
  import { _ } from '$lib/config/i18n';
  import { onMount } from 'svelte';

  // Componetns
  import { Logo } from '$lib/components/shared';
  import SigninByEmail from './_components/SigninByEmail.svelte';
  import SigninByPhone from './_components/SigninByPhone.svelte';
  // import VariantSwitcher from './_components/VariantSwitcher.svelte';

  import { dictionaryApi } from '$lib/api';

  // Data
  let loading = false;
  let prefix_list = [];
  let validation_type = 0; // 0 - phone, 1 - email

  // Methods
  /**
   * On variant change
   */
  const onVariantChange = (event: CustomEvent) => {
    validation_type = event.detail
  }

  /**
   * loadInititalData
   */
  const loadInititalData = async (): Promise<any> => {
    loading = true;
    try {
      const request = await dictionaryApi.getPhonePrefixList();
      prefix_list = request.data;
    }
    catch (error: any) {
      throw new Error(error)
    }
    finally {
      loading = false;
    }
  }

  onMount(async () => {
    await loadInititalData();
  })
</script>

<svelte:head>
	<title>
    {$_('pages.signin.title')}
  </title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <Logo class="mx-auto" />
    <h2 class="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
      {$_('pages.signin.title')}
    </h2>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-6">
      <!--
        <VariantSwitcher
          {loading}
          on:change={onVariantChange}
        />
      -->

      {#if validation_type === 0}
        <SigninByPhone items={prefix_list} />
      {/if}
      {#if validation_type === 1}
        <SigninByEmail />
      {/if}

      <div class="flex items-center justify-between">
        <div class="text-sm">
          <a href="/auth/signup" class="font-medium text-indigo-600 hover:text-indigo-500">
            {$_('actions.signup')}
          </a>
        </div>

        <div class="text-sm">
          <a href="/auth/forgot-password"class="font-medium text-indigo-600 hover:text-indigo-500">
            {$_('pages.signup.forgot_password')}
          </a>
        </div>
      </div>

    </div>
  </div>
</div>
