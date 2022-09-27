<script lang="ts">
  import { _ } from '$lib/config/i18n';
  import { AtSignIcon } from 'svelte-feather-icons';
</script>

<svelte:head>
	<title>Company connection</title>
	<meta name="description" content="Post list" />
</svelte:head>

<div class="content">
  <div>
    <header class="py-6 px-4 lg:py-8 lg:px-0">
      <h1 class="pb-4 font-semibold text-2xl lg:text-3xl lg:leading-tight">
        {$_('pages.company-connection.title')}
      </h1>
    </header>

    <div class="flex flex-col lg:flex-row">
      <div class="bg-white w-full rounded-lg py-6 px-8">
        <h2 class="font-semibold text-xl mb-4">
          {$_('pages.company-connection.subtitle')}
        </h2>
        <p class="mb-6">
          {$_('pages.company-connection.text1')}:
        </p>

        <p class="mb-1">
          {$_('pages.company-connection.text0')}
        </p>
        <p class="mb-1">
          <strong>
            {$_('pages.company-connection.item1')}
          </strong>
          <span class="inline-block">
            <span class="connection-address">
              <span>estate.evim</span>
              <AtSignIcon size="16" />
              <span>gmail.com</span>
            </span>
          </span>
        </p>
        <p class="mb-1">
          <strong>
            {$_('pages.company-connection.item2')}
          </strong> {$_('pages.company-connection.item3')}
        </p>
        <p class="mb-1">
          <strong>
            {$_('pages.company-connection.text2')}:
          </strong>
        </p>
        <ol class="request-list mb-2">
          <li>{$_('pages.company-connection.item4')}</li>
          <li>{$_('pages.company-connection.item5')}</li>
          <li>{$_('pages.company-connection.item6')}</li>
          <li>{$_('pages.company-connection.item7')}</li>
        </ol>

        <p>
          {$_('pages.company-connection.text3')}
        </p>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .connection-address {
    @apply flex flex-row items-center font-semibold;
  }
  .request-list {
    @apply pl-5;
    li {
      @apply list-item list-outside list-decimal pl-2;
    }
  }
</style>
