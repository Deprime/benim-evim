
<script lang="ts">
  import { onMount } from 'svelte';

  import WhatsappIcon   from '$lib/assets/social/whatsapp.png';
  import TelegramIcon   from '$lib/assets/social/telegram.png';
  import InstagramIcon  from '$lib/assets/social/instagram.png';
  import ViberIcon      from '$lib/assets/social/viber.png';
  import MessengerIcon  from '$lib/assets/social/messenger.png';
  import WechatIcon     from '$lib/assets/social/wechat.png';

  // Components
  import { Button } from '$lib/components/ui';

  // Types
  import type { IEstate, IContactShort } from '$lib/interfaces';

  // Props
  export let estate: IEstate;

  // Data
  let visible = true;
  let loading = false;
  const social = {
    'whatsapp':  WhatsappIcon,
    'telegram':  TelegramIcon,
    'instagram': InstagramIcon,
    'viber':     ViberIcon,
    'messenger': MessengerIcon,
    'wechat':    WechatIcon,
  }

  // Methods
  /**
   * Toggle contacts
   */
  const toggle = (): void => {
    visible = !visible;
  }

  /**
   * Open contact
   */
  const openContact = (contact: IContactShort): void => {
    loading = true;
    setTimeout(() => {
      loading = false;
      window.open(contact.content, '_blank').focus();
    }, 1000);
  }

  onMount(() => {
    visible = false;
    loading = false;
  })
</script>

<div class="relative">
  <!--
  <Button block class="mb-2">
    Заказать звонок
  </Button>
  -->

  <Button
    block
    disabled={loading}
    {loading}
    on:click={toggle}
  >
    Написать
  </Button>

  {#if visible}
    <div class="contact-list">
      {#each estate.contacts as contact}
        <Button
          block
          variant="white"
          class="mb-2 items-center space-x-4 pl-4 justify-start"
          disabled={loading}
          on:click={() => {openContact(contact)}}
        >
          <img src={social[contact.icon]} alt={contact.title} width="24px">
          <span>
            {contact.title}
          </span>
        </Button>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .contact-list {
    @apply pt-2 lg:pt-2 lg:px-2;
    @apply flex flex-col;
    @apply lg:absolute top-full left-0 w-full bg-white/50;
    @apply w-full bg-white/50;
    @apply rounded-lg;
  }
</style>
