<script lang="ts">
	import { goto } from '$app/navigation';

  // Componetns
  import { Input, Button, Alert } from '$lib/components/ui';

  import { userApi } from '$lib/api';
  import { userStore } from '$lib/stores';

  // Data
  const form = {
    loading: false,
    email: "",
    password: "",
    errors: {}
  }

  // Methods
  /**
   * Submit
   */
  const submit = async () => {
    form.loading = true;
    try {
      await userApi.getCsrfCookie();
      const response = await userApi.signin(form.email, form.password);

      userStore.setData(response.data);
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
</script>

<form class="space-y-6" on:submit|preventDefault={submit}>
  <Input
    label="Email address"
    placeholder="Enter your email"
    type="email"
    disabled={form.loading}
    bind:value={form.email}
  />

  <Input
    label="Password"
    placeholder="Enter your password"
    type="password"
    disabled={form.loading}
    bind:value={form.password}
  />

  <div>
    <Button
      block
      type="submit"
      disabled={form.loading}
      loading={form.loading}
    >
      Sign in
    </Button>
  </div>

  {#if Object.keys(form.errors).length > 0}
    <div>
      <Alert
        variant="danger"
        title="Wrong creditionals"
      >
        <p>Incorrect email or password</p>
      </Alert>
    </div>
  {/if}
</form>
