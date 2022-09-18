<script lang="ts">
  const CDN_URL = import.meta.env.VITE_CDN_URL;
  import type { IEstate } from '$lib/interfaces';

  // Props
  export let estate: IEstate;

  // Data
  const poster = estate.photos.find(el => el.is_poster);
  const photos = estate.photos.filter(el => !el.is_poster);
</script>

<section>
  <div class="main-photo rounded-lg bg-slate-100 h-80 flex justify-center items-center mb-2">
    <img
      src={`${CDN_URL}/${poster.url}`}
      alt={estate.short_title}
      class="h-[96%] w-auto rounded-lg"
    />
  </div>

  <div class="photo-grid custom-scroll overflow-x-scroll rounded-md h-28 flex flex-row space-x-2">
    {#each photos as photo}
      <img
        src={`${CDN_URL}/${photo.url}`}
        alt={estate.short_title}
        class="h-24 w-auto rounded-md"
      />
    {/each}
  </div>
</section>
