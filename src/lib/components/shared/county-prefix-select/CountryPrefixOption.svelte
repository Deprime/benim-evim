<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { current_component } from "svelte/internal";
  import { getEventsAction } from "$lib/common/utils";

  // Props
  export let value = "";
  export let key = "";

  // Data
  const events = getEventsAction(current_component);
  const dispatch = createEventDispatcher();
</script>

<option
  {value}
  {...$$restProps}
  class={`country-prefix-option country-prefix-${key} `}
  use:events
>
  <slot />
</option>

<style lang="scss">
  @import './CountryPrefixOption.scss';
</style>
