<script>
import { compute_slots } from "svelte/internal";

</script>
<header class="mb-0 ml-2 md:mb-10 md:lm-0">
  <div class="mt-2 md:flex md:items-center md:justify-between">
    <div class="min-w-0 flex-1">
      <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        <slot/>
      </h2>
    </div>

    {#if $$slots.actions}
      <div class="mt-4 flex flex-shrink-0 md:mt-0 md:ml-4">
        <slot name="actions"></slot>
      </div>
    {/if}
  </div>
</header>
