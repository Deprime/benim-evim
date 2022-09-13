<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // Props
	export let label = "";
  // export let active = false;

  // Data
  // const dispatch = createEventDispatcher();
	const uuid = crypto.randomUUID();
</script>

<div class={`${$$props.class || ''}`}>
  {#if label && label.length > 0}
    <label
      for={uuid}
      class="block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
  {/if}
  <select
    id={uuid}
    {...$$restProps}
    class={`select-control`}
  >
    <slot />
  </select>
</div>

<style lang="scss">
  @import './Select.scss';
</style>
