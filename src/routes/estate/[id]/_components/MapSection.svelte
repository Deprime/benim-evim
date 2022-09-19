<script lang="ts">
  import { _ } from '$lib/config/i18n';

  import { Map } from '$lib/components/shared';
  import { ChevronDownIcon } from 'svelte-feather-icons';

  import type { IEstate } from '$lib/interfaces';

  // Props
  export let estate: IEstate;

  // Data
  let visible = false;
</script>

<section>
  <h4
    class="flex flex-row items-center md:hidden font-medium pb-2"
    on:click={() => { visible = !visible; }}
  >
    Показать на карте
    <ChevronDownIcon size="18" class="ml-4" />
  </h4>

  <div class={`${visible ? "flex" : "hidden"} md:flex`}>
    <Map
      center={estate.coords}
      zoom={17}
      hasSearchControl={false}
      marker={{
        coords: estate.coords,
        iconContent: `${estate.estate_type.title} ${estate.price} ${estate.currency.symbol}`,
        title: `${estate.estate_type.title} ${estate.room_count}-комн., ${estate.area}м², ${estate.price} ${estate.currency.symbol}`
      }}
    />
  </div>
</section>
