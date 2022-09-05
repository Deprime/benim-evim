<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  import SelectItem from  "./SelectItem.svelte"
  import { ChevronDownIcon } from 'svelte-feather-icons'

  // Props
  export let active = false;

  // Data
  const dispatch = createEventDispatcher();

  const onExpand = (event: any): void => {
    active = true;
    dispatch('expand', event)
  }
</script>

<div>
  <label id="listbox-label" class="block text-sm font-medium text-gray-700">Assigned to</label>
  <div class="relative mt-1">
    <button
      type="button"
      class="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
      aria-haspopup="listbox"
      aria-expanded="true"
      aria-labelledby="listbox-label"
      on:click={onExpand}
    >
      <span class="flex items-center">
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-6 w-6 flex-shrink-0 rounded-full">
        <span class="ml-3 block truncate">Tom Cook</span>
      </span>
      <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
        <!-- Heroicon name: mini/chevron-up-down -->
        <ChevronDownIcon  class="h-5 w-5 text-gray-400" />
      </span>
    </button>

    <!--
      Select popover, show/hide based on select state.

      Entering: ""
        From: ""
        To: ""
      Leaving: "transition ease-in duration-100"
        From: "opacity-100"
        To: "opacity-0"
    -->
    {#if active}
      <ul
        transition:fade
        class="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-option-3"
      >
        <slot />
      </ul>
    {/if}
  </div>
</div>
