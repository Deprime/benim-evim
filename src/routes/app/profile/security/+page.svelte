<script lang="ts">
  import { _ } from '$lib/config/i18n';

  // Componetns
  import { Input, Button, Alert } from '$lib/components/ui';
  import { PageHeader  } from '$lib/components/shared';

  // Services
  import { userApi } from '$lib/api';
  import toast from 'svelte-french-toast'

  // Data
  const user: any = {
    password: "",
    password_confirmation : "",
  };
  const form = {
    loading: false,
    errors: {},
    success: false,
  }

  $: isPasswordsEqual = checkPasswordsEqual(user.password, user.password_confirmation );

  /**
   * checkPasswordsEqual
   */
  const checkPasswordsEqual = (
    password: string,
    password_confirmation : string
  ): boolean => {
    if (password.length > 0 && password_confirmation .length > 0) {
      return password === password_confirmation ;
    }
    return false;
  }

  /**
   * Update profile
   */
  const update = async () => {
    form.loading = true;
    try {
      await userApi.changePassword(user.password, user.password_confirmation);
      form.errors = {};
      user.password = "";
      user.password_confirmation = "";
      form.success = true;
      toast.success($_('noty.save_success'), {position: "top-right"});
    }
    catch (error: any) {
      form.errors = error.response?.data || {};
      toast.error($_('noty.validation_errors'), {position: "top-right"});
      throw new Error(error)
    }
    finally {
      form.loading = false;
    }
  }
</script>

<svelte:head>
	<title>
    {$_(`pages.security.subtitle`)}
  </title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="min-h-full flex flex-col justify-center">
  <PageHeader>
    {$_(`pages.security.subtitle`)}
  </PageHeader>

  <div class="md:grid md:grid-cols-3 md:gap-6">
    <div class="mt-5 md:col-span-2 md:mt-0">

      <form on:submit|preventDefault={update}  class="text-sm">
        <div class="shadow sm:overflow-hidden sm:rounded-md">
          <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
            {#if form.success}
              <Alert variant="success">
                Ваш пароль обновлён.
              </Alert>
            {:else}
              <Alert variant="info">
                <ul class="list">
                  <li>{$_(`pages.security.text1`)}</li>
                  <li>{$_(`pages.security.text2`)}</li>
                </ul>
              </Alert>
            {/if}

            <div>
              <Input
                label={$_(`pages.security.new_password`)}
                class="w-2/3"
                type="password"
                bind:value={user.password}
                disabled={form.loading}
              />
            </div>

            <div>
              <Input
                label={$_(`pages.security.repeat_password`)}
                class="w-2/3 pb-3"
                type="password"
                bind:value={user.password_confirmation }
                disabled={form.loading}
                errors={form.errors.password}
              />
            </div>
          </div>

          <div class="bg-gray-100 px-4 py-3 text-right flex justify-end sm:px-6">
            <Button
              type="submit"
              loading={form.loading}
              disabled={form.loading || !isPasswordsEqual}
            >
              {$_('actions.save')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
