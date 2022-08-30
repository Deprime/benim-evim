<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { current_component } from "svelte/internal";
  import { getEventsAction } from "$lib/common/utils";
  import { EyeIcon, EyeOffIcon } from 'svelte-feather-icons'

  type Types = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'

	// Props
	export let value: string|number = '';
	export let label: string;
  export let type: Types = 'text'
  export let disabled = false;
  export let togglable = false; // for password

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
      value = val;
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

<div class={$$props.class || ''}>
  {#if label}
    <label
      for={uuid}
      class="block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
  {/if}
	<div class="mt-1 relative">
		<input
			id={uuid}
			class="shadow-sm focus:ring-indigo-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
      value={value}
      on:input={onInput}
      on:focus={onFocus}
      on:blur={onBlur}
      type={visible ? "text" : type}
      {...$$restProps}
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
</div>
