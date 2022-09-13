<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import Select from 'svelte-select';
  import Label from '../label/Label.svelte'

  // Props
  export let showChevron = true;
  export let label: string|null = null;

  // Data
  const dispatch = createEventDispatcher();
</script>

<div class={`select2 ${$$props.class || ''}`}>
  {#if label}
    <Label>
      {label}
    </Label>
  {/if}
  <Select
    {...$$restProps}
    {...$$props}
    inputAttributes={{class: "select2-input"}}
    showChevron={showChevron}
    showIndicator={true}
    on:select={e => {dispatch("select", e.detail)}}
    on:clear={e => {dispatch("clear", e.detail)}}
    on:loaded={e => {dispatch("loaded", e.detail)}}
    on:error={e => {dispatch("error", e.detail)}}
  ></Select>
</div>


<style lang="scss">
:global(.select2-input) {
  border-radius: 6px !important;
  border: 1px solid rgb(209 213 219) !important;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05) !important;
}

:global(.select2-input:focus) {
  box-shadow: none !important;
  outline-color: rgb(59 130 246) !important;
  outline-width: 2px !important;
  outline-style: solid !important;
  outline-offset: -1px !important;
}

:global(.select2-input:active) {
  box-shadow: none !important;
}

.select2-input:focus {
  border: none !important;
  border-color: transparent !important;
  outline: none !important;
  border-radius: 6px;
}

.select2 {
  --border: none;
  --borderRadius: 6px;
  --height: 38px;
  --borderFocusColor: rgb(59 130 246);
  --indicatorTop: 8px;
}
</style>
