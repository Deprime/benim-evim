<script lang="ts">
import { compute_slots } from "svelte/internal";

  type Variant =  'info' | 'warning' | 'danger' | 'success';

  // Props
  export let variant: Variant = 'info';
  export let title = "";
  export let closable = false;
</script>


<div class={`alert alert-${variant} ${$$props.class || ''}`}>
  <div class="flex">
    <div class="alert-icon">
      {#if variant === 'info'}
        <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0zM8.25 9.75A.75.75 0 019 9h.253a1.75 1.75 0 011.709 2.13l-.46 2.066a.25.25 0 00.245.304H11a.75.75 0 010 1.5h-.253a1.75 1.75 0 01-1.709-2.13l.46-2.066a.25.25 0 00-.245-.304H9a.75.75 0 01-.75-.75zM10 7a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
        </svg>
      {/if}
      {#if variant === 'success'}
        <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
        </svg>
      {/if}
      {#if variant === 'warning'}
        <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
        </svg>
      {/if}
      {#if variant === 'danger'}
        <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
        </svg>
      {/if}
    </div>

    <div class="ml-3">
      {#if title.length > 0}
        <h3 class="alert-title">
          {@html title}
        </h3>
      {/if}

      <div class="alert-content">
        <slot />
      </div>

      {#if $$slots.actions}
        <div class="mt-4">
          <div class="-mx-2 -my-1.5 flex">
            <slot name="actions" />
          </div>
        </div>
      {/if}
    </div>

    {#if closable}
      <div class="ml-auto pl-3">
        <div class="-mx-1.5 -my-1.5">
          <button type="button" class="alert-close">
            <span class="sr-only">
              Dismiss
            </span>
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .alert {
    @apply rounded-md p-4;

    &-icon {
      @apply flex-shrink-0;
    }

    &-title {
      @apply text-sm font-medium mb-2;
    }

    &-content {
      @apply text-sm;
    }

    &-close {
      @apply inline-flex rounded-md p-1.5;
      @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
    }

    &-warning {
      @apply bg-yellow-50;

      .alert-title {
        @apply text-yellow-800;
      }
      .alert-content {
        @apply text-yellow-700;
      }

      .alert-close {
        @apply bg-yellow-50 text-yellow-500;
        @apply hover:bg-yellow-100;
        @apply focus:ring-yellow-600 focus:ring-offset-yellow-50;
      }
    }

    &-danger {
      @apply bg-red-50;

      .alert-title {
        @apply text-red-800;
      }
      .alert-content {
        @apply text-red-700;
      }

      .alert-close {
        @apply bg-red-50 text-red-500;
        @apply hover:bg-red-100;
        @apply focus:ring-red-600 focus:ring-offset-red-50;
      }
    }

    &-success {
      @apply bg-green-50;

      .alert-title {
        @apply text-green-800;
      }
      .alert-content {
        @apply text-green-700;
      }

      .alert-close {
        @apply bg-green-50 text-green-500;
        @apply hover:bg-green-100;
        @apply focus:ring-green-600 focus:ring-offset-green-50;
      }
    }

    &-info {
      @apply bg-blue-50;

      .alert-title {
        @apply text-blue-800;
      }
      .alert-content {
        @apply text-blue-700;
      }

      .alert-close {
        @apply bg-blue-50 text-blue-500;
        @apply hover:bg-blue-100;
        @apply focus:ring-blue-600 focus:ring-offset-blue-50;
      }
    }
  }
</style>
