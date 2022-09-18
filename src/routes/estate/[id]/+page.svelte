<script lang="ts">
	import { page } from '$app/stores';

  // Components
  import { EstateListItem } from '$lib/components/shared';
  import { Checkbox, Input, Button } from '$lib/components/ui';
  import { ChevronRightIcon } from 'svelte-feather-icons';
  import { Map } from '$lib/components/shared';

  import Gallery from './_components/Gallery.svelte';

  import type { IEstate } from '$lib/interfaces';

  /** @type {import('./$types').PageData} */
  export let data: any;

  // Data
  const origin = $page.url.origin;
  const estate: IEstate = data.post;
  const poster = estate.photos.find(el => el.is_poster);
</script>

<svelte:head>
	<title>
    {estate.seo_title}
  </title>
	<meta name="description" content="Post list" />

  <meta property="og:title" content={estate.seo_title}/>
  <meta property="og:type" content="article" />
  <meta property="og:url" content={`${origin}/estate/${estate.id}`} />
  <meta property="og:image" content={poster?.url} />
</svelte:head>

<div class="content">
  <header class="py-6 px-4 lg:py-8 lg:px-0">
    <nav class="text-sm text-slate-600 flex space-x-2 flex-row items-center">
      <span>
        {estate.settlement.title}
      </span>
      <ChevronRightIcon size="16" />
      <span>
        {estate.rent_type.title}
      </span>
      <ChevronRightIcon size="16"/>
      <span>
        {estate.estate_type.title_multiple}
      </span>
    </nav>
  </header>

  <div class="estate-main">
    <section class="w-full lg:w-4/6 bg-white rounded-lg p-5">
      <h1 class="mb-4 font-semibold text-2xl lg:text-3xl lg:leading-tight">
        {estate.settlement.title}, {estate.short_title}
      </h1>

      <div class="mb-4 text-slate-600">
        <p>
          {estate.address}
        </p>
      </div>

      <div class="mb-4">
        <Gallery {estate} />
      </div>

      <div class="estate-text mb-8">
        <h4 class="text-lg font-medium pb-2">
          Описание
        </h4>
        {@html estate.description}
      </div>

      <div>
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

    <aside class="w-full lg:w-2/6 bg-white rounded-lg p-5">
      <div class="estate-price">
        <h4 class="estate-price-total">
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

      <div class="space-y-3">
        <div>
          Информация о риелторе
        </div>

        <div class="flex flex-col md:flex-row justify-center space-x-2">
          <Button variant="secondary" class="w-full md:w-1/3">
            В избранное
          </Button>
          <Button variant="secondary" class="w-full md:w-1/3">
            Поделиться
          </Button>
          <Button variant="secondary" class="w-full md:w-1/3">
            Другое
          </Button>
        </div>

        <Button block>
          Написать
        </Button>
      </div>
    </aside>
  </div>
</div>

<style lang="scss">
  @import './style.scss';
</style>
