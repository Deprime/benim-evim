<script lang="ts">
  import { _ } from '$lib/config/i18n';
	import { page } from '$app/stores';
  import { browser } from '$app/environment';

  import { UserIcon, BoxIcon, SlidersIcon } from 'svelte-feather-icons'
  import { userStore } from '$lib/stores';

  interface IMenuItem {
    url: string,
    compare?: string,
    key: string,
    default: string,
  }

  // Data
  const adminMenu = [
    {url: '/app/companies', key: 'companies', default: 'Компании'},
    // {url: '/app/users', key: 'users', default: 'Пользователи'},
  ];

  const defaultMenu = [
    {url: '/auth/signout', key: 'signout', default: 'Sign out'}
  ];

  // Reactive
  $: profileMenu = getProfileMenu($userStore.data?.realtor_accesses);
  $: companyMenu = getCompanyMenu($userStore.data?.is_head);

  // Methods
  /**
   * Get Company menu
   */
  const getCompanyMenu = (is_head = false): IMenuItem[] => {
    const menu = [
      {url: '/app/posts', compare: '/app/posts', key: 'posts', default: 'Posts'},
      {url: '/app/company/access-request', compare: '/app/company/access-request', key: 'access_requests', default: 'Access requests'},
    ];

    if (is_head) {
      const companyItem = {
        url: '/app/company',
        // compare: '/app/company',
        key: 'company',
        default: 'Company'
      };
      menu.push(companyItem);
    }
    return menu;
  }

  /**
   * Get profile menu
   */
  const getProfileMenu = (realtor_accesses = []): IMenuItem[] => {
    const menu = [
      {url: '/app/profile', key: 'profile', default: 'Your Profile'},
      {url: '/app/profile/security', key: 'security', default: 'Security'},
      {url: '/app/profile/favorites', key: 'favorites', default: 'Favorites'},
    ];

    if (realtor_accesses && realtor_accesses.length > 0) {
      const requesItem = {
        url: '/app/profile/access-request',
        key: 'access_requests',
        default: 'Access requests'
      };
      menu.push(requesItem);
    }
    return menu;
  }
</script>

{#if browser}
  <div class="min-h-full flex flex-col justify-center pt-10">
    <div class="profile-layout">
      <aside class="profile-layout-sidebar">
        <div class="pt-4 pb-8 flex justify-center">
          <figure class="w-20 h-20 bg-slate-400 rounded-full flex justify-center items-center">
            {#if $userStore.data.avatar}
              {$userStore.data.avatar}
            {:else}
              <span>
                <UserIcon size="40" class="text-white" />
              </span>
            {/if}
          </figure>
        </div>

        <nav class="profile-navigation">
          <!-- Profile menu -->
          <ul>
            <li class="menu-title">
              <UserIcon size="20" />
              <span class="pl-2 inline-block">
                {$_(`pages.profile.title`)}
              </span>
            </li>
            {#each profileMenu as item}
              {@const isActive = item.compare ? $page.url.pathname.includes(item.compare) : $page.url.pathname === item.url}
              <li class:menu-item-active={isActive}>
                <a
                  href={item.url}
                  role="menuitem"
                  tabindex="-1"
                >
                  {$_(`pages.${item.key}.title`, {default: item.default})}
                </a>
              </li>
            {/each}
          </ul>

          {#if $userStore.data.company_id}
            <!-- Company menu -->
            <ul>
              <li class="menu-title">
                <BoxIcon size="20" />
                <span class="pl-2 inline-block">
                  {$_(`pages.company.title`)}
                </span>
              </li>
              {#each companyMenu as item}
                {@const isActive = item.compare ? $page.url.pathname.includes(item.compare) : $page.url.pathname === item.url}
                <li class:menu-item-active={isActive}>
                  <a
                    href={item.url}
                    role="menuitem"
                    tabindex="-1"
                  >
                    {$_(`pages.${item.key}.title`, {default: item.default})}
                  </a>
                </li>
              {/each}
            </ul>
          {/if}


          {#if $userStore.data.role === "dementor"}
            <!-- Admin menu -->
            <ul>
              <li class="menu-title">
                <SlidersIcon size="20" />
                <span class="pl-2 inline-block">
                  Управление
                </span>
              </li>
              {#each adminMenu as item}
                {@const isActive = item.compare ? $page.url.pathname.includes(item.compare) : $page.url.pathname === item.url}
                <li class:menu-item-active={isActive}>
                  <a
                    href={item.url}
                    role="menuitem"
                    tabindex="-1"
                  >
                    {$_(`pages.${item.key}.title`, {default: item.default})}
                  </a>
                </li>
              {/each}
            </ul>
          {/if}

          <!-- Other menu -->
          <ul>
            {#each defaultMenu as item}
              <li>
                <a
                  href={item.url}
                  role="menuitem"
                  tabindex="-1"
                >
                  {$_(`actions.${item.key}`, {default: item.default})}
                </a>
              </li>
            {/each}
          </ul>
        </nav>
      </aside>

      <div class="profile-layout-content">
        <main>
          <slot />
        </main>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .profile-layout {
    @apply md:grid md:grid-cols-6 md:gap-6;

    &-sidebar {
      @apply md:col-span-1;
    }

    &-content {
      @apply  col-span-5;
    }
  }

  .profile-navigation {
    ul {
      @apply flex flex-col font-medium;
      @apply mb-8;

      li {
        @apply block;

        &.menu-title {
          @apply flex flex-row items-center;
          @apply text-slate-900 pb-2;
        }

        a {
          @apply block rounded-md;
          @apply my-1 px-3 py-2;
          @apply text-gray-500 text-sm;
          @apply transition-colors;

          &:hover {
            @apply bg-slate-200;
          }
        }
        &.menu-item-active {
          a {
            @apply bg-blue-100 text-blue-700;

            &:hover {
              @apply bg-blue-100 text-blue-700;
            }
          }
        }
      }

      &:last-child {
        opacity: 0.6;
      }
    }
  }
</style>
