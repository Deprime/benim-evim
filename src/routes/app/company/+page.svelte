<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from '$lib/config/i18n';

	// import Counter from '$lib/Counter.svelte';
  // Componetns
  // import { Checkbox, Input, Button } from '$lib/components/ui';
  import { PageHeader } from '$lib/components/shared';
  import CompanyBasicForm from '../_components/CompanyBasicForm.svelte';

  // Services
  // import { userService } from '$lib/services';
  import { companyApi } from '$lib/api';

  // Data
  const form = {
    loading: true,
    errors: <any>{},
  }
  let company = <any>{}

  /**
   * getCompany
   */
  const getCompany = async (): Promise<any> => {
    form.loading = true;
    try {
      const request = await companyApi.get();
      company = request.data.company;
    }
    catch (error: any) {
      throw new Error(error)
    }
    finally {
      form.loading = false;
    }
  }

  onMount(async () => {
    await getCompany();
  })
</script>

<svelte:head>
	<title>
    {$_("pages.company.subtitle")}
  </title>
</svelte:head>

<div class="min-h-full flex flex-col justify-center">
  <PageHeader>
    {$_("pages.company.subtitle")}
  </PageHeader>

  <div class="md:grid md:grid-cols-3 md:gap-6">
    <div class="mt-5 md:col-span-2 md:mt-0">

      <div class="shadow sm:overflow-hidden sm:rounded-md">
        <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
          {#if form.loading}
            <div class="h-52 justify-center content-center">
              {$_('actions.loading')}
            </div>
          {:else}
            <CompanyBasicForm
              mode="update"
              show_info={false}
              show_description
              {company}
            />
          {/if}
        </div>
      </div>

    </div>
  </div>
</div>
