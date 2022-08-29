<script lang="ts">
	// import Counter from '$lib/Counter.svelte';
  // Componetns
  import { Checkbox, Input, Button } from '$lib/components/ui';
  import { Logo } from '$lib/components/shared';

  // Data
  const user = {
    email: "",
    password: "",
  }
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
      <form class="space-y-6" action="#" method="POST">
        <Input
          label="Email address"
          placeholder="Enter your email"
          type="email"
          bind:value={user.email}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          type="password"
          bind:value={user.password}
          togglable
        />

        <div>
          <Button type="submit" block>
            Sign in
          </Button>
        </div>
      </form>
    </div>
  </div>
</div>
