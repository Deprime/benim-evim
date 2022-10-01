<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from '$lib/config/i18n';

  import "bigger-picture/css";
  import BiggerPicture from 'bigger-picture/svelte';

  const CDN_URL = import.meta.env.VITE_CDN_URL;
  import type { IEstate } from '$lib/interfaces';

  // Props
  export let estate: IEstate;

  // Data
  const poster = estate.photos.find(el => el.is_poster);
  const photos = estate.photos.filter(el => !el.is_poster);

  onMount(() => {
    const bp = BiggerPicture({
      target: document.body,
    });

    // grab image links
    let imageLinks = document.querySelectorAll('#gallery a')

    // add click listener to open BiggerPicture
    for (let link of imageLinks) {
      link.addEventListener("click", openGallery);
    }

    // function to open BiggerPicture
    function openGallery(e) {
      e.preventDefault()
      bp.open({
        items: imageLinks,
        el: e.currentTarget,
      })
    }
  })
</script>

<section id="gallery">
  <div class="main-photo rounded-lg bg-slate-100 h-60 md:h-80 flex justify-center items-center mb-2">
    <a
      href={`${CDN_URL}/${poster?.url}`}
      data-img={`${CDN_URL}/${poster?.url}`}
      data-thumb={`${CDN_URL}/${poster?.url}`}
      data-alt={estate.short_title}
      class="h-[96%] w-auto rounded-lg"
    >
      <img
        src={`${CDN_URL}/${poster?.url}`}
        alt={estate.short_title}
        class="h-[96%] w-auto rounded-lg"
      />
    </a>
  </div>

  <div class="photo-grid custom-scroll overflow-x-scroll rounded-md h-20 md:h-28 flex flex-row space-x-2">
    {#each photos as photo}
      <a
        href={`${CDN_URL}/${photo?.url}`}
        data-img={`${CDN_URL}/${photo?.url}`}
        data-thumb={`${CDN_URL}/${photo?.url}`}
        data-alt={estate.short_title}
        class="h-16 md:h-24 w-auto rounded-md"
      >
        <img
          src={`${CDN_URL}/${photo?.url}`}
          alt={estate.short_title}
          class="h-16 md:h-24 w-auto rounded-md"
        />
      </a>

    {/each}
  </div>
</section>
