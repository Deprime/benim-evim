<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { current_component } from "svelte/internal";
  import { getEventsAction } from "$lib/common/utils";
  import { EyeIcon, EyeOffIcon } from 'svelte-feather-icons'

  import Label from '../label/Label.svelte'

  type Types = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'

	// Props
	export let value: string|number = '';
	export let label = "";
  export let type: Types = 'text'
  export let disabled = false;
  export let required = false;
  export let togglable = false; // for password
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
      const val = event.target?.value;
      if (['tel', 'number'].includes(type)) {
        const isNumeric = /^[0-9]*$/.test(val)

        if (isNumeric) {
          value = val;
          return
        }
        event.target.value = value
      }
      else {
        value = val;
      }
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
    <Label for={uuid}>
      {label}

      {#if required}
        <span class="text-red-500">*</span>
      {/if}
    </Label>
  {/if}
	<div class="relative">
		<input
			id={uuid}
      {disabled}
      {required}
      value={value}
      on:input={onInput}
      on:focus={onFocus}
      on:blur={onBlur}
      type={visible ? "text" : type}
      {...$$restProps}
			class={`input-control ${disabled ? 'input-control-disabled' : ''}`}
      use:events
		/>
    {#if togglable}
      <span
        class="absolute z-10 top-2 right-2 cursor-pointer"
        on:click={e => {visible = !visible}}
      >
        {#if visible}
          <EyeOffIcon />
        {:else}
          <EyeIcon />
        {/if}
      </span>
    {/if}
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
  @import './Input.scss';
</style>
