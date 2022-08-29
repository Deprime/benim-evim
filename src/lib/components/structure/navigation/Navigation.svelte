<script lang="ts">
	import { page } from '$app/stores';
  import { Logo } from '$lib/components/shared';

  const menu = [
    {url: '/', key: 'home', default: 'Home'},
    {url: '/about', key: 'about', default: 'About', compare: null},
    // {url: '/todos', key: 'todos', default: 'Todos', compare: null},
    {url: '/posts', key: 'posts', default: 'Posts', compare: '/posts'},
    {url: '/auth/signin', key: 'signin', default: 'Signin', compare: null},
    {url: '/auth/signup', key: 'signup', default: 'Signup', compare: null},
  ];

  const profileMenu = {
    list: [
      {url: '/profile', key: 'profile', default: 'Your Profile'},
      {url: '/profile/settings', key: 'settings', default: 'Settings'},
      {url: '/auth/signout', key: 'signout', default: 'Sign out'},
    ],
    visible: false,
  }

  let visible = false;
</script>

<nav class="bg-white shadow">
  <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
    <div class="flex h-14 justify-between">

      <div class="flex px-2 lg:px-0">
        <div class="flex flex-shrink-0 items-center">
          <Logo class="block h-8 w-auto lg:hidden" />
          <Logo class="hidden h-8 w-auto lg:block" />
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
              {item.default}
            </a>
          {/each}
        </div>
      </div>

      <div class="flex items-center lg:hidden">
        <!-- Mobile menu button -->
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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

      <div class="hidden lg:ml-4 lg:flex lg:items-center">

        <!-- Profile dropdown -->
        <div class="relative ml-4 flex-shrink-0">
          <div>
            <button
              class="profile-avatar"
              type="button"
              aria-expanded="false"
              aria-haspopup="true"
              on:click={e => {profileMenu.visible = !profileMenu.visible}}
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

          <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          -->
          <div
            class="profile-menu"
            class:hidden={!profileMenu.visible}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabindex="-1"
          >
            <!-- Active: "bg-gray-100", Not Active: "" -->
            {#each profileMenu.list as item, index}
              <a
                sveltekit:prefetch
                href={item.url}
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabindex="-1"
              >
                {item.default}
              </a>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile menu, show/hide based on menu state. -->
  <div class:hidden={!visible} class="lg:hidden" id="mobile-menu">
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
          {item.default}
        </a>
      {/each}
    </div>

    <div class="border-t border-gray-200 pt-4 pb-3">
      <div class="flex items-center px-4">
        <div class="flex-shrink-0">
          <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
        </div>
        <div class="ml-3">
          <div class="text-base font-medium text-gray-800">Tom Cook</div>
          <div class="text-sm font-medium text-gray-500">tom@example.com</div>
        </div>
      </div>
      <div class="mt-3 space-y-1">
        <a href="#" class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">Your Profile</a>
        <a href="#" class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">Settings</a>
        <a href="#" class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">Sign out</a>
      </div>
    </div>
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
      @apply border-indigo-500 text-gray-900;
      @apply bg-indigo-50  text-indigo-700;
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
    @apply focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2;
  }
</style>
