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
      Password restore
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

        <div>
          <Button type="submit" block>
            Send me a new password
          </Button>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <a href="/auth/signup" class="font-medium text-indigo-600 hover:text-indigo-500"> Signup </a>
          </div>

          <div class="text-sm">
            <a href="/auth/signin"class="font-medium text-indigo-600 hover:text-indigo-500"> Signin</a>
          </div>
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
