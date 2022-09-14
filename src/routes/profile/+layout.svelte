<script lang="ts">
  import { _ } from '$lib/config/i18n';
	import { page } from '$app/stores';
  import { browser } from '$app/environment';

  import { UserIcon } from 'svelte-feather-icons'
  import { userStore } from '$lib/stores';

  // Data
  const profileMenu = [
    {url: '/profile', key: 'profile', default: 'Your Profile'},
    {url: '/profile/security', key: 'security', default: 'Security'},
    {url: '/profile/favorites', key: 'favorites', default: 'Favorites'},
  ];

  const companyMenu = [
    {url: '/profile/company', key: 'company', default: 'Company'},
    {url: '/profile/posts', compare: '/profile/posts', key: 'posts', default: 'Posts'},
  ];

  const defaultMenu = [
    {url: '/auth/signout', key: 'signout', default: 'Sign out'}
  ];
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
          <ul>
            <li class="menu-title">
              {$_(`pages.profile.title`)}
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
            <ul>
              <li class="menu-title">
                {$_(`pages.company.title`)}
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
          @apply text-slate-900 pb-2 pl-3;
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
