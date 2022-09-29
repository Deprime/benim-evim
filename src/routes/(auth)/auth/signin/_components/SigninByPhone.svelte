<script lang="ts">
  import { _ } from '$lib/config/i18n';
  import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

  // Componetns
  import { Input, Button, ButtonGroup, Alert, Label } from '$lib/components/ui';
  import { CountryPrefixOption, CountryPrefixSelect } from '$lib/components/shared';

  import { userApi } from '$lib/api';
  import { userStore } from '$lib/stores';

  // Props
  export let items = []; // FIXME: add contract

  // Data
  const form = {
    loading: false,
    email: "",
    password: "",
    prefix: null,
    phone: "",
    is_phone_valid: false,
    is_phone_verified: false,
    validation_type: 0, // 0 - phone, 1 - email
    validation_code: "",
    errors: false,
  }

  // Methods
  /**
   * getPhoneCountry
   */
  const getPhoneCountry = (index: number) => {
    if (items[index]) {
      return items[index].country
    }
    return "";
  }

  /**
   * Submit
   */
  const submit = async (): Promise<any>  => {
    form.loading = true;
    try {
      await userApi.getCsrfCookie();
      const prefix = items[form.prefix].prefix;
      const response = await userApi.signinByPhone(prefix, form.phone, form.password);

      const { token, user } = response.data;
      userStore.setToken(token);
      userStore.setData(user);
      form.errors = false;
      goto('/app/profile')
    }
    catch (error: any) {
      form.errors = true;
      throw new Error(error)
    }
    finally {
      form.loading = false;
    }
  }

  onMount(async () => {
    form.prefix = 0;
  })
</script>

<form class="space-y-6" on:submit|preventDefault={submit}>
  <div>
    <Label for="phone">
      {$_('pages.profile.phone')}
    </Label>

    <ButtonGroup class="w-full">
      <CountryPrefixSelect
        class="w-24 mr-2 mt-0"
        bind:value={form.prefix}
        disabled={form.loading || form.is_phone_valid}
      >
        {#each items as item, key}
          <CountryPrefixOption
            key={item.country}
            value={key}
          >
            {item.prefix}
          </CountryPrefixOption>
        {/each}
      </CountryPrefixSelect>
      <Input
        class="w-full"
        placeholder={$_('pages.signup.enter_phone')}
        type="number"
        name="phone"
        required
        disabled={form.loading || form.is_phone_valid}
        bind:value={form.phone}
      />
    </ButtonGroup>
  </div>

  <div>
    <Input
      label={$_('pages.profile.password')}
      placeholder={$_('pages.signup.enter_password')}
      type="password"
      bind:value={form.password}
      togglable
    />
  </div>

  <div>
    <Button
      type="submit"
      block
      disabled={form.loading}
      loading={form.loading}
    >
    {$_('actions.signin')}
    </Button>
  </div>

  {#if form.errors}
    <div>
      <Alert
        variant="danger"
      >
        <p>
          {$_('errors.auth_by_phone')}
        </p>
      </Alert>
    </div>
  {/if}
</form>
