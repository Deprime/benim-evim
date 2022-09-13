<script lang="ts">
  import { onMount } from 'svelte';
  // import { createEventDispatcher } from 'svelte';
  // import { current_component } from "svelte/internal";
  // import { getEventsAction } from "$lib/common/utils";
  import { browser } from '$app/environment';

  // Components
  import Label from '../label/Label.svelte'

	// Props
	export let value: string|number = '';
	export let label = "";
	export let placeholder = "";
  export let disabled = false;
  export let rows = 4;
  export let errors: [string]|undefined = undefined;

	// Data
  // const events = getEventsAction(current_component);
  // const dispatch = createEventDispatcher();
	const uuid = crypto.randomUUID();
  let quill;
  const content = value;

  // Methods
  onMount(async () => {
    const svetteQuill = await import('./svelte-quill');
    quill = svetteQuill.quill;
  })
</script>

<svelte:head>
  <link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
</svelte:head>

<div class={`ui-element input-control-wrapper ${$$props.class || ''}`}>
  {#if label && label.length > 0}
    <Label for={uuid}>
      {label}
    </Label>
  {/if}
  <div class="mt-1 relative">
    {#if browser && quill}
      <div
        class="editor"
        use:quill={{placeholder}}
        on:text-change={e => {value = e.detail.html}}
      >
        {@html content}
      </div>
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
  @import './Editor.scss';
</style>
