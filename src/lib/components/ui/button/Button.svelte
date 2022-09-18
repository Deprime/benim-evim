<script lang="ts">
  import { current_component } from "svelte/internal";

  import { Spinner } from "$lib/components/ui"

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
  export let variant: Variants = "primary";
  export let synthetic  = false;

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
      'ui-element',
      'btn',
      `btn-${$$variant}`,
      $$block && 'btn-block',
      $$disabled && 'btn-disabled',
      $$loading && 'btn-loading',
      $$props.class && $$props.class
    ];
    return list.filter(c => c).join(' ');
  }
</script>

{#if !synthetic}
  <button
    {disabled}
    {...$$restProps}
    class={cssClassList}
    use:events
  >
    <slot />
    {#if loading}
      <Spinner />
    {/if}
  </button>
{:else}
  <span
    {disabled}
    {...$$restProps}
    class={cssClassList}
    use:events
  >
    <slot />
    {#if loading}
      <Spinner />
    {/if}
  </span>
{/if}

<style lang="scss">
  @import './Button.scss';
</style>
