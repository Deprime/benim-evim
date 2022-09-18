<script lang="ts">
  export let variant: 'default' | 'primary' = 'default';
</script>


<span class={`spinner spinner-${variant}`}></span>

<style lang="scss">
  @import './Spinner.scss';
</style>
