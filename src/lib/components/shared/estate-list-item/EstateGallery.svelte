<script lang="ts">
  const CDN_URL = import.meta.env.VITE_CDN_URL;

  // Props
  export let estate: any;
  export let editorMode = false;

  // Data
  const defaultUrl = '/pics/1.jpg';
  const poster = estate.photos?.find(el => el.is_poster);
  let posterUrl = (poster)
    ? `${CDN_URL}/${poster.url}`
    : (estate.photos?.length > 0)
      ? `${CDN_URL}/${estate.photos[0].url}`
      : defaultUrl;

  const defaultPosterUrl = posterUrl;

  // Methods
  const onMouseEnter = (event) => {
    posterUrl = event.target.src;
  }

  const onMouseLeave = (event) => {
    posterUrl = defaultPosterUrl;
  }
</script>

<div class="estate-card-gallery">
  <div class="estate-card-gallery-poster">
    {#if estate.photos?.length > 0}
      <img
        src={posterUrl}
        alt="Real estate"
      >
      {#if editorMode}
        <span class="estate-card-picture-counter">
          + {estate.photos?.length - 1} фото
        </span>
      {/if}
    {:else}
      <img
        src={posterUrl}
        alt="Real estate"
      >
    {/if}
  </div>

  {#if !editorMode}
    <div class="grid gap-2 grid-cols-3">
      {#if estate.photos}
        {#each estate.photos.slice(0, 3) as photo}
            <div class="overflow-hidden cursor-pointer hover:opacity-80">
              <img
                src={`${CDN_URL}/${photo.url}`}
                alt="Real estate"
                class="h-full rounded-md"
                on:mouseenter={onMouseEnter}
                on:mouseleave={onMouseLeave}
              >
            </div>
          {/each}
      {/if}
    </div>
  {/if}
</div>


<style lang="scss">
  @import './EstateGallery.scss';
</style>
