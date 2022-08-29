<script lang="ts">
  import { current_component } from "svelte/internal";

  // Utils
  import { getEventsAction } from "$lib/common/utils";

  // Constants

  // Presets
  const events = getEventsAction(current_component);

  // Props
  export let loading  = false;
  export let disabled = false;
  export let block    = false;
  export let variant  = "primary";

  // Data
  $: cssClassList = getCssClassList(variant, block, disabled, loading);

  // Methods
  const getCssClassList = (
    $$variant: string,
    $$block: boolean,
    $$disabled: boolean,
    $$loading: boolean
  ): string => {
    const list = [
      'btn',
      `btn-${$$variant}`,
      $$block && 'btn-block',
      $$disabled && 'disabled',
      $$loading && 'loading',
      ($$props.class) && $$props.class
    ];
    return list.filter(c => c).join(' ');
  }
</script>

<button
  class={cssClassList}
  {...$$restProps}
  use:events
>
  <slot />
</button>

<style lang="scss">
  .btn {
    @apply py-2 px-4;
    @apply rounded-md;
    @apply text-sm font-medium;
    @apply flex justify-center border border-transparent shadow-sm;

    &-primary {
      @apply rounded-md;
      @apply text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500;
    }

    &-block {
      @apply w-full;
    }
  }
</style>
