<script lang="ts">
  import { _ } from '$lib/config/i18n';
  import { Alert } from '$lib/components/ui';
  import { PhoneCallIcon } from 'svelte-feather-icons'
</script>

<Alert variant="info">
  <div class="flex flex-row pb-2 items-center">
    <PhoneCallIcon /> <span class="font-semibold text-lg ml-4">+7*** ***-XX-XX</span>
  </div>
  <div>
    <h4 class="font-semibold text-base pb-1">
      {$_('pages.signup.flashcall_title')}
    </h4>
    <p>
      {@html $_('pages.signup.flashcall_text')}
    </p>
  </div>
</Alert>
