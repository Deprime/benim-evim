<script lang="ts">
  import { current_component } from "svelte/internal";

  type Variants = "primary" | "secondary" | "white" | "text";

  // Utils
  import { getEventsAction } from "$lib/common/utils";

  // Presets
  const events = getEventsAction(current_component);

  // Props
  export let loading  = false;
  export let disabled = false;
  export let block    = false;
  export let type     = "button";
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
      $$props.class && $$props.class
    ];
    return list.filter(c => c).join(' ');
  }
</script>

<button
  {...$$restProps}
  class={cssClassList}
  use:events
>
  <slot />
</button>

<style lang="scss">
  @import './Button.scss';
</style>
