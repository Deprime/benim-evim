<script lang="ts">
	import { page } from '$app/stores';

  // Components
  import { ChevronRightIcon } from 'svelte-feather-icons';

  import GallerySection from './_components/GallerySection.svelte';
  import PriceSection from './_components/PriceSection.svelte';
  import ContactSection from './_components/ContactSection.svelte';
  import MapSection from './_components/MapSection.svelte';


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
  <header class="py-6 px-4 xl:py-8 xl:px-0">
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

      <div class="gallery-wrapper mb-4">
        <GallerySection {estate} />
      </div>

      <div class="description-wrapper estate-description mb-8">
        <h4 class="text-lg font-medium pb-2">
          Описание
        </h4>
        {@html estate.description}
      </div>

      <div class="map-wrapper">
        <MapSection {estate} />
      </div>
    </section>

    <aside class="w-full lg:w-2/6 bg-white rounded-lg p-5">
      <section class="price mb-4">
        <PriceSection {estate} />
      </section>
      <section class="contacts">
        <ContactSection {estate} />
      </section>
    </aside>
  </div>
</div>

<style lang="scss">
  @import './style.scss';
</style>
