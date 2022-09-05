<script lang="ts">
  import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

  // Componetns
  import { Checkbox, Input, Button, ButtonGroup, Select, SelectItem } from '$lib/components/ui';
  import { Logo, CountryPrefixOption, CountryPrefixSelect } from '$lib/components/shared';

  import { userApi, dictionaryApi } from '$lib/api';
  import { userStore } from '$lib/stores';

  // Data
  let items = []; // FIXME: add contract
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
    errors: {},
  }

  // Reactive
  $: phoneCountry = getPhoneCountry(form.prefix);

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
   * request Sms Code
   */
  const requestSmsCode = async () => {
    form.loading = true;
    try {
      await userApi.getCsrfCookie();
      const prefix = items[form.prefix].prefix;
      const response = await userApi.requestSmsCode(prefix, form.phone);
      form.is_phone_valid = true;
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
   * Validate phone
   */
  const validatePhone = async () => {
    form.loading = true;
    try {
      await userApi.getCsrfCookie();
      const prefix = items[form.prefix].prefix;
      const response = await userApi.validatePhone(prefix, form.phone, form.validation_code);
      form.is_phone_verified = true;
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
   * Signup phone
   */
  const signupPhone = async () => {
    form.loading = true;
    try {
      await userApi.getCsrfCookie();
      const prefix = items[form.prefix].prefix;
      const response = await userApi.signupPhone(prefix, form.phone, form.password);

      const { token, user } = response.data;
      userStore.setToken(token);
      userStore.setData(user);
      form.errors = {};
      goto('/profile')
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
   * Submit
   */
  const signupEmail = async (): Promise<any>  => {
    form.loading = true;
    try {
      await userApi.getCsrfCookie();
      const response = await userApi.signupEmail(form.email, form.password);
      const { user } = response.data;
      form.errors = {};
      goto('/auth/signin');
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
   * Submit
   */
  const submit = async (): Promise<any>  => {
    if (form.validation_type === 0) {
      if (!form.is_phone_valid) {
        requestSmsCode();
      }
      else {
        if (!form.is_phone_verified) {
          validatePhone();
        }
        else {
          signupPhone();
        }
      }
    }
    if (form.validation_type === 1) {
      signupEmail();
    }
  }

  /**
   * loadInititalData
   */
  const loadInititalData = async (): Promise<any> => {
    form.loading = true;
    try {
      const request = await dictionaryApi.getPhonePrefixList();
      items = request.data;
      form.prefix = 0;
    }
    catch (error: any) {
      throw new Error(error)
    }
    finally {
      form.loading = false;
    }
  }

  onMount(async () => {
    await loadInititalData();
  })
</script>

<svelte:head>
	<title>Sign up</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <Logo class="mx-auto" />
    <h2 class="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
      Sign up
    </h2>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

      <!--
      <ButtonGroup class="mb-6 w-full">
        <Button
          block
          variant={form.validation_type === 0 ? "primary" : "white" }
          disabled={form.loading}
          on:click={() => {form.validation_type = 0}}
        >
          By Phone
        </Button>
        <Button
          block
          variant={form.validation_type === 1 ? "primary" : "white" }
          disabled={form.loading}
          on:click={() => {form.validation_type = 1}}
        >
          By Email
        </Button>
      </ButtonGroup>
      -->

      <form class="space-y-6" on:submit|preventDefault={submit}>
        {#if form.validation_type === 0 }
          <div>
            <label for="" class="block text-sm font-medium text-gray-700">
              Phone number
            </label>

            <ButtonGroup class="w-full">
              <CountryPrefixSelect
                class="w-8 mr-2"
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
                placeholder="Enter phone number"
                type="number"
                name="phone"
                required
                disabled={form.loading || form.is_phone_valid}
                bind:value={form.phone}
              />
            </ButtonGroup>

            <div>
              {form.errors.phone || ""}
            </div>
          </div>

          {#if form.is_phone_valid && !form.is_phone_verified}
            <div>
              <Input
                class="w-full"
                label="Validation code"
                placeholder="Enter validation code"
                type="number"
                name="validation_code"
                required
                disabled={form.loading}
                bind:value={form.validation_code}
              />
            </div>
          {/if}
          {#if form.is_phone_verified}
            <div>
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                bind:value={form.password}
                togglable
                errors={form.errors.password}
              />
            </div>
          {/if}

          <div>
            {#if form.is_phone_verified}
              <Button
                type="submit"
                block
                disabled={form.loading}
                loading={form.loading}
              >
                Sign up
              </Button>
            {/if}
            {#if form.is_phone_valid && !form.is_phone_verified}
              <Button
                type="submit"
                block
                disabled={form.loading || form.validation_code.length !== 4}
                loading={form.loading}
              >
                Submit code
              </Button>
            {/if}
            {#if !form.is_phone_valid}
              <Button
                type="submit"
                block
                disabled={form.loading}
                loading={form.loading}
              >
                Send validation code
              </Button>
            {/if}
          </div>
        {:else}
          <Input
            label="Email address"
            placeholder="Enter your email"
            type="email"
            bind:value={form.email}
            errors={form.errors.email}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            bind:value={form.password}
            togglable
            errors={form.errors.password}
          />

          <div>
            <Button
              type="submit"
              block
              disabled={form.loading}
              loading={form.loading}
            >
              Sign up
            </Button>
          </div>
        {/if}

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <a href="/auth/signin" class="font-medium text-indigo-600 hover:text-indigo-500"> Signin </a>
          </div>

          <div class="text-sm">
            <a href="/auth/forgot-password"class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
