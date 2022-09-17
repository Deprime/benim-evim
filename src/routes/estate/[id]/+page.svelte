<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data: any;

  // Components
  import { EstateListItem } from '$lib/components/shared';
  import { Checkbox, Input, Button } from '$lib/components/ui';

  import type { IEstate } from '$lib/interfaces';

  // Data
  const estate: IEstate = data.post;
</script>

<svelte:head>
	<title>
    {estate.seo_title}
  </title>
	<meta name="description" content="Post list" />
</svelte:head>

<div class="content">
  <div>
    <header class="py-6 px-4 lg:py-8 lg:px-0">
      <h1 class="pb-4 font-semibold text-2xl lg:text-3xl lg:leading-tight">
        {estate.settlement.title}, {estate.short_title}
      </h1>
    </header>

    <div class="flex flex-col lg:flex-row">
      <section>
        <EstateListItem {estate} />
      </section>
    </div>
  </div>
</div>
