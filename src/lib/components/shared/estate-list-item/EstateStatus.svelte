<script lang="ts">
  // Props
  export let status: any;
</script>

<div
  class={`estate-status estate-status-${status.mui_key}`}
  title={`Статус ${status.title}`}
>
  {status.title}
</div>

<style lang="scss">
  .estate-status {
    @apply text-sm font-medium;
    @apply rounded-md px-3 py-2;
    @apply border border-solid;

    &-draft {
      @apply border-gray-200;
      @apply bg-gray-50 text-gray-800;
    }

    &-moderate {
      @apply bg-blue-50 text-blue-700;
    }

    &-published {
      @apply bg-green-50 text-green-800;
    }

    &-rejected {
      @apply bg-red-50 text-red-700;
    }

    &-archived {
      @apply bg-yellow-50 text-yellow-700;
    }
  }
</style>
