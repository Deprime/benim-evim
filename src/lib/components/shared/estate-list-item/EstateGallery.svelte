<script lang="ts">
  const CDN_URL = import.meta.env.VITE_CDN_URL;

  // Props
  export let estate: any;
  export let editorMode = false;

  // Data
  const defaultUrl = '/pics/1.jpg';
  let posterUrl = defaultUrl;

  // Methods
  const onMouseEnter = (event) => {
    posterUrl = event.target.src;
  }

  const onMouseLeave = (event) => {
    posterUrl = defaultUrl;
  }
</script>

<div class="estate-card-gallery">
  <div class="estate-card-gallery-poster">
    {#if estate.photos?.length > 0}
      <img
        src={`${CDN_URL}/${estate.photos[0].url}`}
        alt="Real estate"
      >
      {#if editorMode}
        <span class="estate-card-picture-counter">
          + {estate.photos.length - 1} фото
        </span>
      {/if}
    {:else}
      <img
        src={posterUrl}
        alt="Real estate"
      >
    {/if}
  </div>
  <!-- src={`${CDN_URL}/${photo.url}`} -->

  {#if !editorMode}
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
  {/if}
</div>


<style lang="scss">
  @import './EstateGallery.scss';
</style>
