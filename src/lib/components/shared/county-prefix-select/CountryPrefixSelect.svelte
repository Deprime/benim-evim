<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { current_component } from "svelte/internal";
  import { getEventsAction } from "$lib/common/utils";

  import CountryPrefixOption from  "./CountryPrefixOption.svelte"

  // Props
  export let disabled = false;
  export let value = "";

  // Data
  const events = getEventsAction(current_component);
  const dispatch = createEventDispatcher();

  // const onExpand = (event: any): void => {
  //   active = true;
  //   dispatch('expand', event)
  // }
</script>

<select
  {disabled}
  bind:value
  {...$$restProps}
  class={`ui-element select-control country-prefix-select ${$$props.class && $$props.class}`}
  use:events
>
  <slot />
</select>

<style lang="scss">
  @import './CountryPrefixSelect.scss';
</style>
