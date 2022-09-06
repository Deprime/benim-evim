<script lang="ts">
	import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  // Componetns
  import { Overlay } from '$lib/components/ui';

  // Props
  export let visible = false;
	export let title = "";
	export let closable = true;

  // Data
	const dispatch = createEventDispatcher();

	// Methods
  const onClose = (): void => {
		if (closable) {
			dispatch('close');
			visible = false;
		}
  }
</script>

{#if visible}
  <Overlay >
    <div
      class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 lg:w-6/12"
      transition:fade={{ duration: 300 }}
    >
      <header class="relative px-6 py-4">
        <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">
          {title}
        </h3>
        <span
          class="modal-close"
          on:click={onClose}
        >
          ✕
        </span>
      </header>
      <div class="px-6 py-4">
        <slot />
      </div>
      {#if $$slots.footer}
        <footer class="bg-gray-100 px-6 py-4">
          <slot name="footer" />
        </footer>
      {/if}
    </div>

    <!-- <div class="{`modal ${$$props.class || ''}`}">
      <header class="modal-title">
        {title}
        <span class="modal-close" on:click="{onClose}">✕</span>
      </header>
      <div class="modal-content">
        <slot />
      </div>
    </div> -->
  </Overlay>
{/if}

<style lang="scss">
  @import './Modal.scss';
</style>
