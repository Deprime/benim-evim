<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { _ } from '$lib/config/i18n';

  // Componetns
  import { Button } from '$lib/components/ui';
  import { AwardIcon, HelpCircleIcon } from 'svelte-feather-icons';

  // Data
  const dispatch = createEventDispatcher();
</script>

<div class="rounded-md bg-sky-50 px-4">
  <div class="py-4 space-y-4">
    <section class="flex flex-row pb-4">
      <div class="w-20 flex flex-shrink-0 justify-center pr-3 text-blue-600">
        <AwardIcon size="46" />
      </div>
      <div class="flex flex-col flex-grow">
        <h3 class="font-medium text-base">
          {$_('connection_info.realtor.title')}
        </h3>
        <p>
          {$_('connection_info.realtor.text1')}
        </p>
        <p>
          {$_('connection_info.realtor.text2')}
        </p>
      </div>
    </section>

    <Button
      synthetic
      block on:click={() => {dispatch('show-company-list')}}
    >
      {$_('connection_info.realtor.button')}
    </Button>

    <hr class="my-4">

    <section class="agency-section flex flex-row pb-4">
      <div class="w-20 flex flex-shrink-0 justify-center pr-3 text-blue-600">
        <HelpCircleIcon size="46" />
      </div>
      <div class="flex flex-col flex-grow">
        <h3 class="font-medium text-base">
          {$_('connection_info.no_agency.title')}
        </h3>
        <p>
          {@html $_('connection_info.no_agency.text1')}
        </p>
      </div>
    </section>
  </div>
</div>

<style lang="scss">
:global(.agency-section a) {
  @apply text-blue-700 cursor-pointer underline font-medium;
  &:hover {
    @apply text-blue-600;
  }
}
</style>
