<script lang="ts">
  const CDN_URL = import.meta.env.VITE_CDN_URL;
</script>

<picture>
  <object
    data="/logo.svg"
    type="image/svg"
    title="Logo"
    aria-label="Logo"
  >
    <img
      src={`${CDN_URL}/logo.svg`}
      alt="Logo"
      class={`w-auto max-h-20 ${$$props.class || ''}`}
    />
  </object>
</picture>
