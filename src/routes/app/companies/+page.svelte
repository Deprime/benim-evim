<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from '$lib/config/i18n';
  import dayjs from 'dayjs';

  // Componetns
  import { Input, Button, Label, Modal } from '$lib/components/ui';
  import { PageHeader } from '$lib/components/shared';
  import CompanyBasicForm from '../_components/CompanyBasicForm.svelte';

  // Services
  import { companyManagmentApi } from '$lib/api';

  // Types
  import type { ICompany } from '$lib/interfaces';

  // Data
  const FORMAT_YMD = 'DD.MM.YYYY';
  const FORMAT_YMDHMS = 'DD.MM.YYYY H:m:s';

  let show_creator = false;
  let loading = true;
  let company_list: ICompany[] = [];
  let company: ICompany|null = null;
  const form = {
    loading: false,
    errors: {},
  }

  // Methods
  /**
   * Edit company
   */
  const editCompany = ($$company: ICompany) => {
    company = $$company;
    show_creator = true;
  }

  const createCompany = () => {
    company = null;
    show_creator = true;
  }

  /**
   * loadInititalData
   */
  const getCompanyList = async (): Promise<any> => {
    loading = true;
    try {
      const request = await companyManagmentApi.list();
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
   * Refresh
   */
  const refresh = () => {
    show_creator = false;
    getCompanyList();
  }

  onMount(async () => {
    await getCompanyList();
  })
</script>

<svelte:head>
	<title>Администрирование компаний</title>
</svelte:head>

<div class="min-h-full flex flex-col justify-center">
  <PageHeader>
    Администрирование компаний
    <div slot="actions">
      <Button on:click={createCompany}>
        Создать компанию
      </Button>
    </div>
  </PageHeader>

  <div class="shadow sm:overflow-hidden sm:rounded-md text-sm">

    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th scope="col" width="90px">ID</th>
            <th scope="col">Название</th>
            <th scope="col">ID представителя</th>
            <th scope="col" width="140px">ИНН</th>
            <th scope="col">Адрес</th>
            <th scope="col" width="160px">Дата создания</th>
          </tr>
        </thead>
        <tbody>
          {#each company_list as company}
            <tr>
              <td>
                {company.id}
              </td>
              <td>
                <span class="font-semibold link" on:click={() => editCompany(company)}>
                  {company.title}
                </span>
              </td>
              <td>
                {#if company.head}
                  <p>{company.head.first_name}</p>
                  <p>{company.head.prefix} {company.head.phone}</p>

                  {#if company.head.email}
                    <p>{company.head.email}</p>
                  {/if}
                {/if}
              </td>
              <td>
                {company.inn}
              </td>
              <td>
                {company.address}
              </td>
              <td>
                {dayjs(company.created_at).format(FORMAT_YMDHMS)}
              </td>
            </tr>
          {/each}

        </tbody>
      </table>
    </div>

  </div>
</div>

<Modal
  bind:visible={show_creator}
  title={$_('company_creator.title')}
>
  {#if company}
    <CompanyBasicForm
      {company}
      managment_mode
      on:created={refresh}
      on:updated={refresh}
    />
  {:else}
    <CompanyBasicForm
      managment_mode
      on:created={refresh}
      on:updated={refresh}
    />
  {/if}
</Modal>
