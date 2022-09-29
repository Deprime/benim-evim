<script lang="ts">
  import dayjs from 'dayjs';

  // Components
  import { Logo } from '$lib/components/shared';
  import { Button } from '$lib/components/ui';
  import EstateGallery from './EstateGallery.svelte';
  import EstateStatus from './EstateStatus.svelte';

  import type { IEstate } from '$lib/interfaces';

  // Props
  export let estate: IEstate;
  export let editorMode = false;

  // Data
  const FORMAT_YMD = 'DD.MM.YYYY'
  const FORMAT_YMDHMS = 'DD.MM.YYYY H:m:s'
  const defaultUrl = '/pics/1.jpg';
  let posterUrl = defaultUrl;

  $: estateTitle = getEstateTitle(editorMode);
  $: estateUrl = getEstateUrl(editorMode);

  // Methods
  /**
   * Get estate title
   */
  const getEstateTitle = (mode: boolean): string => {
    if (estate.estate_type_id === 1) // Flat
      return `${estate.rent_type.title} ${estate.room_count}-комн. кв., ${estate.area} м², ${estate.level}/${estate.total_levels} этаж`;

    // Townhouse, House, Villa
    // TODO: pluralize
    if (estate.estate_type_id >= 2)
      return `${estate.rent_type.title} ${estate.estate_type.title} ${estate.room_count}-комн., ${estate.area} м², ${estate.total_levels} этаж`;

    return "";
  }

  /**
   * Get estate url
   */
  const getEstateUrl = (mode: boolean): string => {
    return mode
      ? `/app/posts/${estate.id}`
      : `/estate/${estate.id}`;
      // : `#`;
  }
</script>

<div class="estate-card">
  <h2 class="estate-card-header estate-card-header--mobile">
    <a href={estateUrl}>
      {estate.full_title}
    </a>
  </h2>

  <div class="estate-card-gallery-wrapper lg:basis-4/12  mb-4 lg:mb-0">
    <EstateGallery
      {estate}
      {editorMode}
    />
  </div>

  <div class="estate-card-summary">
    <h2 class="estate-card-header">
      <a href={estateUrl}>
        {estate.full_title}
      </a>
    </h2>

    <!--
    <h3 class="text-base font-semibold bb-1 lg:pb-2">
      3-комн. кв., 120 м², 4/12 этаж
    </h3>
    -->

    <div class="estate-location text-slate-500 pb-4">
      {estate.address}
    </div>

    <div class="estate-price">
      <h4 class="estate-price-total">
        {estate.price} {estate.currency.symbol}
        <!-- 6 300 000 ₽ -->
      </h4>

      {#if estate.rent_type_id === 2}
        <p class="estate-price-meter">
          / &nbsp;&nbsp;
          {Number(estate.price / estate.area).toFixed(0)} {estate.currency.symbol}/м²
        </p>
      {/if}
    </div>

    <div class="estate-description">
      {@html estate.description}
    </div>
  </div>

  <div class="estate-card-realtor">
    {#if editorMode}
      <div class="estate-card-author flex flex-col space-y-4">
        <div class="font-medium">
          Автор:
        </div>
        <div class="text-sm flex flex-col">
          {estate.author.first_name}
          {#if estate.author?.email}
            <div>
              ({estate.author.email})
            </div>
          {/if}
        </div>

        <div class="pb-4 border-b border-dotted border-slate-200">
          <EstateStatus status={estate.status} />
        </div>
      </div>
    {:else}
      <div class="estate-card-realtor">
        <!-- <div class="estate-card-realtor-logo"> -->
          <!-- <figure class="border rounded p-2 flex w-fit"> -->
          <figure class="estate-card-realtor-logo">
            <Logo class="h-10 lg:h-20" />
          </figure>
        <!-- </div> -->
        <div class="estate-card-realtor-naming">
          <p class="text-slate-500 text-sm">
            Агентство недвижимости
          </p>

          <h4 class="font-semibold">
            {estate.company.title}
          </h4>
        </div>
      </div>

      <div class="estate-card-company-actions">
        <Button block class="mb-2">
          Заказать звонок
        </Button>

        <Button
          block
          variant="secondary"
          class="mb-2"
        >
          Написать
        </Button>
      </div>
    {/if}

    <div class="estate-card-publish-date pt-4">
      {#if estate.created_at}
        <div>
          Создано {dayjs(estate.created_at).format(FORMAT_YMDHMS)}
        </div>
      {/if}
      {#if estate.published_at}
        <div>
          Опубликовано {dayjs(estate.published_at).format(FORMAT_YMD)}
        </div>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  @import './EstateListItem.scss';
</style>
