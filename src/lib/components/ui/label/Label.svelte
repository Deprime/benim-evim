<script lang="ts">
  // Props
</script>

<label
  for={$$props.for || ''}
  class={`block text-sm font-medium text-gray-700 mb-1 ${$$props.class || ''}`}
>
  <slot />
</label>
