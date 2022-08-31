<script lang="ts">
  // Components
  import { Logo } from '$lib/components/shared';
  import { Button } from '$lib/components/ui';

  // Props
  export let estate;

  const defaultUrl = '/pics/1.jpg';
  let posterUrl = defaultUrl;

  const onMouseEnter = (event) => {
    posterUrl = event.target.src;
  }

  const onMouseLeave = (event) => {
    posterUrl = defaultUrl;
  }
</script>

<div class="estate-card">
  <h2 class="estate-card-header estate-card-header--mobile">
    <a href={`/posts/${estate.id}`}>
      {estate.title}
    </a>
  </h2>

  <div class="estate-card-gallery">
    <div class="estate-card-gallery-poster">
      <img
        src={posterUrl}
        alt="Real estate"
      >
    </div>

    <div class="grid gap-2 grid-cols-3">
      {#each [...Array(3).keys()] as key}
        <div class="overflow-hidden cursor-pointer hover:opacity-80">
          <img
            src={`/pics/${key + 2}.jpg`}
            alt="Real estate"
            class="h-full rounded-md"
            on:mouseenter={onMouseEnter}
            on:mouseleave={onMouseLeave}
          >
        </div>
      {/each}
    </div>
  </div>

  <div class="estate-card-summary">
    <h2 class="estate-card-header">
      <a href={`/posts/${estate.id}`}>
        {estate.title}
      </a>
    </h2>

    <h3 class="text-base font-semibold bb-1 lg:pb-2">
      3-комн. кв., 120 м², 4/12 этаж
    </h3>

    <div class="estate-location text-slate-500 pb-4">
      Алания, Махмутлар, ул. Фатих, 12
    </div>

    <div class="estate-price">
      <h4 class="estate-price-total">
        6 300 000 ₽
      </h4>

      <p class="estate-price-meter">
        / &nbsp;&nbsp; 118 868  ₽/м²
      </p>
    </div>

    <div class="estate-description">
      {estate.body}
    </div>
  </div>

  <div class="estate-card-realtor">

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
          GRAND REAL ESTATE
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
  </div>

  <div class="estate-card-publish-date">
    Опубликовано 12.08.2022
  </div>
</div>

<style lang="scss">
  @import './EstateListItem.scss';
</style>
