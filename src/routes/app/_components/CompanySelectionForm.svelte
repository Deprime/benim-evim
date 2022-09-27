<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { _ } from '$lib/config/i18n';

  // Components
  import { Spinner, Button } from '$lib/components/ui';
  import { CircleIcon, CheckCircleIcon } from 'svelte-feather-icons'

  // Services
  import { companyApi, userApi } from '$lib/api';

  // Types
  import type { ICompany } from '$lib/interfaces';

  // Props

  // Data
  const dispatch = createEventDispatcher();
  let company_list: ICompany[] = [];
  let company_id: undefined|number;
  let loading = true;
  let processing = false;

  // Methods
  /**
   * On company select
   */
  const onCompanySelect = (company: ICompany) => {
    if (!processing) {
      company_id = company.id;
    }
  }

  /**
   * Get company List
   */
  const getCompanyList = async (): Promise<any> => {
    loading = true;
    try {
      const request = await companyApi.list();
      company_list = request.data.company_list;
    }
    catch (error: any) {
      throw new Error(error)
    }
    finally {
      loading = false;
    }
  }

  /**
   * Send realtor request
   */
  const sendRealtorRequest = async (): Promise<any> => {
    processing = true;
    try {
      const request = await userApi.createRealtorAccess(company_id);
      dispatch('sent');
    }
    catch (error: any) {
      throw new Error(error)
    }
    finally {
      processing = false;
    }
  }

  onMount(() => {
    getCompanyList();
  })
</script>

<section class="text-sm flex flex-col w-full">
  <div class="flex flex-col w-full">
    {#if loading}
      <div class="relative h-28">
        <Spinner />
      </div>
    {:else}

    {#if company_list.length > 0}
      <p class="mb-1">
        Выберите агентство из списка и направте запрос.
      </p>
      <p class="mb-4">
        Если агентство одобрит запрос, вы получите статус риэлтора и сможете размещать обьявления.
      </p>

      <div class="space-y-4 mb-2">
        {#each company_list as company}
          <div
            class="company-item"
            on:click={() => {onCompanySelect(company)}}
          >
            <div class="company-selector">
              {#if company_id === company.id}
                <CheckCircleIcon class="text-blue-500" />
              {:else}
                <CircleIcon class="text-slate-500" />
              {/if}
            </div>
            <div>
              <h3 class="font-semibold mb-1">
                {company.title}
              </h3>
              <div>
                T.C. Kimlik No.: {company.inn}
              </div>
              <div>
                {company.address}
              </div>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <div class="text-center py-6">
        Список агентств пуст
      </div>
    {/if}
  {/if}

  </div>
  {#if company_list.length > 0}
    <footer class="pt-2 flex justify-end">
      <Button
        disabled={processing || !company_id}
        loading={processing}
        on:click={() => { sendRealtorRequest(); }}
      >
        Отправить запрос
      </Button>
    </footer>
  {/if}
</section>

<style lang="scss">
.company {
  &-selector {
    @apply pt-1 h-8 w-10;
  }
  &-item {
    @apply flex flex-row;
    @apply px-4 py-2;
    @apply border-2 border-solid border-slate-300 rounded-lg;
    @apply w-full;
    @apply cursor-pointer;

    &:hover {
      @apply bg-slate-50;
    }
  }
}
</style>
