<script lang="ts">
  // Props
  export let value: string|number|boolean = "";

  // Data
  const uuid = crypto.randomUUID();
</script>

<div class="relative flex items-start">
	<div class="flex items-center h-5">
		<input
      id={uuid}
			aria-describedby="comments-description"
			type="checkbox"
			class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
      {...$$restProps}
		/>
	</div>

	<div class="ml-3 text-sm">
		<label for={uuid} class="font-medium text-gray-700">
      <slot />
    </label>
    {#if $$slots.description}
      <p id="comments-description" class="text-gray-500">
        <slot name="description" />
      </p>
    {/if}
	</div>
</div>
