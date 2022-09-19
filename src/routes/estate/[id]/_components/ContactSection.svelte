<script lang="ts">
  import { _ } from '$lib/config/i18n';

  import toast from 'svelte-french-toast'
  import { MoreVerticalIcon, HeartIcon, Share2Icon } from 'svelte-feather-icons';
  import { Button } from '$lib/components/ui';

  import type { IEstate } from '$lib/interfaces';

  // Props
  export let estate: IEstate;
</script>

<div class="space-y-3">
  <div>
    Информация о риелторе
  </div>

  <div class="flex flex-row justify-center items-start space-x-2">
    <Button variant="secondary" class="w-5/12 px-2 items-center">
      <HeartIcon size="18" class="mr-2" /> В избранное
    </Button>
    <Button variant="secondary" class="w-5/12 px-2 items-center">
      <Share2Icon size="18" class="mr-2" /> Поделиться
    </Button>
    <Button variant="secondary" class="flex flex-grow px-0">
      <MoreVerticalIcon size="20" />
    </Button>
  </div>

  <Button block on:click={e => {
    toast.success('Скоро с вами свяжется риелтор.', {
      icon: '👏',
      position: "top-right"
    })
  }}>
    Написать
  </Button>
</div>
