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

<div class="bg-white p-5 mb-4 rounded-lg flex relative">
  <div class="basis-4/12">
    <div class="h-60 overflow-hidden  mb-2">
      <img
        src={posterUrl}
        alt="Real estate"
        class="h-60 overflow-hidden rounded-md"
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

  <div class="basis-6/12 px-6">
    <h2 class="text-xl font-semibold first-letter:capitalize pb-2">
      <a href={`/posts/${estate.id}`} class="text-blue-600 focus:ring-blue-500">
        {estate.title}
      </a>
    </h2>

    <h3 class="text-base font-semibold pb-2">
      3-комн. кв., 120 м², 4/12 этаж
    </h3>

    <div class="estate-location text-slate-500 pb-4">
      Алания, Махмутлар, ул. Фатих, 12
    </div>

    <div class="estate-price pb-4">
      <h4 class="estate-totla-price font-semibold text-2xl">
        6 300 000 ₽
      </h4>

      <p class="estate-meter-price text-slate-500">
        118 868  ₽/м²
      </p>
    </div>

    <div class="pb-6">
      {estate.body}
    </div>
  </div>

  <div class="basis-2/12 pl-2">
    <div class="pb-4 flex justify-center">
      <figure class="border rounded p-2 flex w-fit">
        <Logo class="h-14" />
      </figure>
    </div>

    <p class="text-slate-500 text-sm">
      Агентство недвижимости
    </p>

    <h4 class="font-semibold">
      GRAND REAL ESTATE
    </h4>

    <div class="pt-8">
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

  <div class="absolute bottom-4 right-6 text-xs text-slate-400">
    Опубликовано 12.08.2022
  </div>
</div>
