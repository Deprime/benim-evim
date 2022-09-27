<script lang="ts">
  import { _ } from '$lib/config/i18n';
	import { page } from '$app/stores';

  // Props
  export let id: string | number = "create";

  // Data
  let parsedId = parseInt(id);

  // Reactive
  $: menu = getMenu(id);

  // Methods
  const getMenu = ($$id: string | number) => {
    const disabled = !Number.isInteger(parsedId);
    const list = [
      {url: `/app/posts/${$$id}`, key: 'editor', default: 'Информация', disabled},
      {url: `/app/posts/${$$id}/gallery`, key: 'gallery', default: 'Галерея', disabled},
    ];

    return list;
  }
</script>

<div class="block">
  <nav class="flex space-x-4" aria-label="Tabs">
    {#each menu as item}
      {@const isActive = $page.url.pathname === item.url}
      <a
        href={item.disabled ? "#" : item.url}
        class="tab-link"
        class:tab-link-active={isActive}
        class:tab-link-disabled={item.disabled}
        role="menuitem"
      >
        {$_(`pages.${item.key}.title`, {default: item.default})}
      </a>
    {/each}
  </nav>
</div>

<style lang="scss">
  .tab-link {
    @apply px-3 py-2 font-medium text-sm rounded-md cursor-pointer;
    @apply text-gray-500 hover:text-gray-700;
    &:hover {
      @apply text-gray-500 hover:text-gray-700;
    }
    &-active {
      @apply bg-blue-100 text-blue-700;
      &:hover {
        @apply bg-blue-100 text-blue-800;
      }
    }
    &-disabled {
      @apply opacity-70 cursor-default;
    }
  }
</style>
