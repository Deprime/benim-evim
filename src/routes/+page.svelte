<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data: any;

  // Components
  import { EstateListItem } from '$lib/components/shared';
  import { Checkbox, Input, Button } from '$lib/components/ui';

  // Data
  const posts = data.posts.slice(0, 20);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Post list" />
</svelte:head>

<div class="content">
  <div>
    <header class="py-6 px-4 lg:py-8 lg:px-0">
      <h1 class="pb-4 font-semibold text-2xl lg:text-3xl lg:leading-tight">
        <!-- {data.title} -->
        Продажа квартир, таунхаусов, домов и вилл в Турции
      </h1>

      <!-- <div class="flex flex-row justify-between lg:justify-start gap-2  text-sm lg:text-base">
        <div class="text-slate-400">
          Найдено 1 371 объявление
        </div>
        <div class="text-blue-800 font-semibold">
          На карте
        </div>
      </div> -->
    </header>

    <!-- <div class="mb-10">
      {data.content}
    </div> -->

    <div class="flex flex-col lg:flex-row">
      <section>
        {#each posts as post}
          <EstateListItem estate={post} />
        {/each}
      </section>
    </div>
  </div>
</div>
