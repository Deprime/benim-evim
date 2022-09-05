<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  import SelectItem from  "./SelectItem.svelte"
  import { CheckIcon } from 'svelte-feather-icons'

  // Props
  export let selected = false;
  export let value = "";

  // Data
  const dispatch = createEventDispatcher();

  const onSelect = (event: any): void => {
    active = true;
    dispatch('expand', event)
  }
</script>

<li class="select-item" id="listbox-option-0" role="option">
  <div class="flex items-center">
    <slot />
    <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
    <!-- <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-6 w-6 flex-shrink-0 rounded-full">
    <span class="font-normal ml-3 block truncate">Wade Cooper</span> -->
  </div>

  {#if $$slots.iconRight}
    <span class="select-item-icon">
      <slot />
      <!-- <CheckIcon class="h-5 w-5" /> -->
    </span>
  {/if}
</li>

<style lang="scss">
  .select-item {
    @apply text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9;

    &-icon {
      @apply text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4;
    }
    &:hover {
      @apply cursor-pointer;
      @apply text-white bg-indigo-600;

      .select-item-icon {
        @apply text-white;
      }
    }
  }
</style>
