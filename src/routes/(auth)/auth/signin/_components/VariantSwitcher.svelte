
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // Componetns
  import { ButtonGroup, Button } from '$lib/components/ui';

  // Props
  export let loading = false;

  // Data
  const dispatch = createEventDispatcher();
  let validation_type = 0; // 0 - phone, 1 - email

  // Methods
  /**
   * On variant change
   */
  const onTypeChange = (type: number) => {
    validation_type = type;
    dispatch('change', type)
  }
</script>

<ButtonGroup class="mb-6 w-full">
  <Button
    block
    variant={validation_type === 0 ? "primary" : "white" }
    disabled={loading}
    on:click={() => {onTypeChange(0)}}
  >
    By Phone
  </Button>
  <Button
    block
    variant={validation_type === 1 ? "primary" : "white" }
    disabled={loading}
    on:click={() => {onTypeChange(1)}}
  >
    By Email
  </Button>
</ButtonGroup>
