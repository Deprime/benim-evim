<script lang="ts">
	// Props
  export let errors: [string]|[] = [];
</script>

<div>
  {#each errors as error }
    <p class="mt-2 text-sm text-red-600">
      {error}
    </p>
  {/each}
</div>
