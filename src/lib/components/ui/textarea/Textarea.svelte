<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { current_component } from "svelte/internal";
  import { getEventsAction } from "$lib/common/utils";

	// Props
	export let value: string|number = '';
	export let label = "";
  export let disabled = false;
  export let rows = 4;
  export let errors: [string]|undefined = undefined;

	// Data
  const events = getEventsAction(current_component);
  const dispatch = createEventDispatcher();
	const uuid = crypto.randomUUID();
  let visible = false;

  // Methods
  /**
   * On input
   */
  const onInput = (event: any)  => {
    if (!disabled) {
      dispatch('input', event);
    }
  };

  /**
   * On blur
   */
  const onBlur = (event: any): void => {
    if (!disabled) {
      dispatch('blur', event);
    }
  };

  /**
   * On focus
   */
  const onFocus = (event: any): void => {
    if (!disabled) {
      dispatch('focus', event);
    }
  };
</script>

<div class={`ui-element input-control-wrapper ${$$props.class || ''}`}>
  {#if label && label.length > 0}
    <label
      for={uuid}
      class="block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
  {/if}
	<div class="mt-1 relative">
    <textarea
			id={uuid}
      {rows}
      {disabled}
      bind:value={value}
      on:input={onInput}
      on:focus={onFocus}
      on:blur={onBlur}
      {...$$restProps}
      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      use:events
    ></textarea>
	</div>
  {#if errors}
    {#each errors as error }
      <p class="mt-2 text-sm text-red-600">
        {error}
      </p>
    {/each}
  {/if}
</div>

<style lang="scss">
  @import './Textarea.scss';
</style>
