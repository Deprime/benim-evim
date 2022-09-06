<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { current_component } from "svelte/internal";
  import { getEventsAction } from "$lib/common/utils";

  // Props
  export let value = "";

  // Data
  const events = getEventsAction(current_component);
  const dispatch = createEventDispatcher();
  const onSelect = (event: any): void => {
    dispatch('expand', event)
  }
</script>

<option
  {value}
  {...$$restProps}
  use:events
>
  <slot />
</option>
