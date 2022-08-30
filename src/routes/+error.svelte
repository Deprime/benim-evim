<script lang="ts">
	import { page } from '$app/stores';

  // Componetns
  import { Button } from '$lib/components/ui';
  import { Logo } from '$lib/components/shared';

  // Data
	const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
	const status   = $page.status;
</script>

<svelte:head>
	<title>Error</title>
</svelte:head>

<div class="flex min-h-screen flex-col bg-white pt-16 pb-12">
  <main class="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
    <div class="flex flex-shrink-0 justify-center">
      <a href="/" class="inline-flex">
        <Logo />
      </a>
    </div>
    <div class="py-16">
      <div class="text-center">
        <p class="text-lg font-semibold text-indigo-600">
          {status}
        </p>
        <h1 class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found.
        </h1>
        <p class="mt-2 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>

        <div class="mt-6">
          <a href="/" class="text-base font-medium text-indigo-600 hover:text-indigo-500">
            Go back home
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  </main>

  <!--
    <footer class="mx-auto w-full max-w-7xl flex-shrink-0 px-4 sm:px-6 lg:px-8">
    <nav class="flex justify-center space-x-4">
      <a href="#" class="text-sm font-medium text-gray-500 hover:text-gray-600">
        Contact Support
      </a>
    </nav>
  </footer>
  -->
</div>
