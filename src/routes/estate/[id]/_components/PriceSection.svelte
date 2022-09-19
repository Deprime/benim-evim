<script lang="ts">
  import { _ } from '$lib/config/i18n';

  import type { IEstate } from '$lib/interfaces';

  // Props
  export let estate: IEstate;
</script>

<div class="estate-price">
  <h4 class="estate-price-total font-semibold text-2xl mb-2">
    {estate.price} {estate.currency.symbol}
  </h4>
  <p class="estate-price-meter mb-2">
    Цена за м²: {Number(estate.price / estate.area).toFixed(0)} {estate.currency.symbol}/м²
  </p>

  <p class="mb-2">
    Площадь: {estate.area} м²
  </p>
  <p class="mb-2">
    {#if estate.rent_type_id === 1}
      Этаж: {estate.level}/{estate.total_levels}
    {:else}
      Этажей: {estate.total_levels}
    {/if}
  </p>
</div>
