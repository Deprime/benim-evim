<script lang="ts">
	// import Counter from '$lib/Counter.svelte';
  // Componetns
  import { Checkbox, Input, Button, Alert } from '$lib/components/ui';
  import { Logo } from '$lib/components/shared';

  // Data
  const user = {
    email: "",
    password: "",
  }
</script>

<svelte:head>
	<title>Sign in</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <Logo class="mx-auto" />
    <h2 class="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
      Sign in to your account
    </h2>
    <!-- <p class="mt-2 text-center text-sm text-gray-600">
      Or
      <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> start your 14-day free trial </a>
    </p> -->
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
        />

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <a href="/auth/signup" class="font-medium text-indigo-600 hover:text-indigo-500"> Signup </a>
          </div>

          <div class="text-sm">
            <a href="/auth/forgot-password"class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
          </div>
        </div>

        <div>
          <Button block variant="secondary">
            Sign in
          </Button>
          <Button  block>
            Sign in
          </Button>
        </div>

        <div>
          <Alert
            variant="danger"
            title="Wrong creditionals"
          >
            <p>Incorrect email or password</p>
          </Alert>
        </div>
      </form>

    </div>
  </div>
</div>
