<script lang="ts">
  import { browser } from '$app/environment';
	import { page } from '$app/stores';
  import { _ } from '$lib/config/i18n';
  import { goto } from '$app/navigation';

  import { Logo } from '$lib/components/shared';
  import { userStore } from '$lib/stores';

  const menu = [
    {url: '/', key: 'home', default: 'Home'},
    // {url: '/about', key: 'about', default: 'About', compare: null},
    // {url: '/todos', key: 'todos', default: 'Todos', compare: null},
    // {url: '/posts', key: 'posts', default: 'Posts', compare: '/posts'},
  ];

  const authMenu = [
    {url: '/auth/signin', key: 'signin', default: 'Signin', compare: null},
    {url: '/auth/signup', key: 'signup', default: 'Signup', compare: null},
  ]

  const profileMenu = {
    list: [
      {url: '/profile', key: 'profile', default: 'Your Profile'},
    ],
    visible: false,
  }

  let visible = false;
</script>

<nav class="bg-white shadow relative">
  <div class="mx-auto max-w-[1348px] px-2 sm:px-4 lg:px-0">
    <div class="flex h-14 justify-between">

      <div class="flex px-2 lg:px-0">
        <div class="flex flex-shrink-0 items-center">
          <a href="/">
            <Logo class="block h-8 w-auto" />
          </a>
          <!-- <Logo class="hidden h-8 w-auto lg:block" /> -->
        </div>
        <div class="hidden lg:ml-6 lg:flex lg:space-x-8">
          {#each menu as item}
            {@const isActive = item.compare ? $page.url.pathname.includes(item.compare) : $page.url.pathname === item.url}
            <a
              sveltekit:prefetch
              class="menu-item"
              class:menu-item-active={isActive}
              href={item.url}
            >
              {$_(`pages.${item.key}.title`, {default: item.default})}
            </a>
          {/each}

          {#if browser}
            {#if !$userStore?.token}
              {#each authMenu as item}
                {@const isActive = item.compare ? $page.url.pathname.includes(item.compare) : $page.url.pathname === item.url}
                <a
                  class="menu-item"
                  class:menu-item-active={isActive}
                  href={item.url}
                >
                  {$_(`pages.${item.key}.title`, {default: item.default})}
                </a>
              {/each}
            {/if}
          {/if}
        </div>
      </div>

      <div class="flex items-center lg:hidden">
        <!-- Mobile menu button -->
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          aria-controls="mobile-menu"
          aria-expanded="false"
          on:click={e => {visible = !visible}}
        >
          <span class="sr-only">
            Open main menu
          </span>

          <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Profile icon desktop -->
      <div class="hidden lg:ml-4 lg:flex lg:items-center">
        <div class="relative ml-4 flex-shrink-0">
          {#if $userStore.token}
            <div>
              <button
                class="profile-avatar"
                type="button"
                aria-expanded="false"
                aria-haspopup="true"
                on:click={() => {goto('/profile')}}
              >
                <span class="sr-only">
                  Open user menu
                </span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                >
              </button>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile menu, show/hide based on menu state. -->
  <div class:hidden={!visible} class="lg:hidden absolute top-full w-full right-0 left-0 z-10 bg-white" id="mobile-menu">
    <div class="space-y-1 pt-2 pb-3">
      {#each menu as item}
        {@const isActive = item.compare ? $page.url.pathname.includes(item.compare) : $page.url.pathname === item.url}
        <a
          sveltekit:prefetch
          class="menu-item"
          class:menu-item-active={isActive}
          href={item.url}
          on:click={e => {visible = !visible}}
        >
          {$_(`pages.${item.key}.title`, {default: item.default})}
        </a>
      {/each}
    </div>

    {#if browser && $userStore?.token}
      <!-- Mobile nav menu -->
      <section class="border-t border-gray-200 pt-4 pb-3">
        <div class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">
              {$userStore?.data?.first_name || "New user"}
            </div>
            {#if $userStore?.data?.email}
              <div class="text-sm font-medium text-gray-500">
                {$userStore.data.email}
              </div>
            {/if}
          </div>
        </div>
        <nav class="mt-3 space-y-1">
          {#each profileMenu.list as item}
            {@const isActive = item.compare ? $page.url.pathname.includes(item.compare) : $page.url.pathname === item.url}
            <a
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              class:menu-item-active={isActive}
              href={item.url}
              on:click={e => {visible = !visible}}
            >
              {$_(`pages.${item.key}.title`, {default: item.default})}
            </a>
          {/each}
        </nav>
      </section>
    {/if}

  </div>
</nav>

<style lang="scss">
  .menu-item {
    @apply block border-l-4;
    @apply py-2 pl-3 pr-4;
    @apply text-base;
    @apply font-medium;
    @apply lg:inline-flex lg:items-center lg:border-b-2 lg:border-l-0;
    @apply lg:text-sm;
    @apply lg:px-1 lg:pt-1;

    &-active {
      @apply border-blue-500 text-gray-900;
      @apply bg-blue-50  text-blue-700;
      @apply lg:text-gray-900 lg:bg-transparent;
    }
    &:not(.menu-item-active) {
      @apply border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700
    }
  }

  .profile-menu {
    @apply absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none;

  }

  .profile-avatar {
    @apply flex rounded-full bg-white text-sm;
    @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
  }
</style>
