<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from '$lib/config/i18n';
  import dayjs from 'dayjs';

  // Componetns
  // import { Input, Button, Alert } from '$lib/components/ui';
  import { PageHeader  } from '$lib/components/shared';
  import { Trash2Icon, XCircleIcon, CheckCircleIcon } from 'svelte-feather-icons'

  // Services
  import { userApi } from '$lib/api';
  import { userStore } from '$lib/stores';

  import { ACCESS_REJECTED, ACCESS_APPROVED, ACCESS_SENT } from '$lib/constants/access-statuses';

  // Data
  const FORMAT_YMDHMS = 'DD.MM.YYYY H:m:s';
  let loading = true
  let realtor_access_list: any[] = [];

  /**
   * Get request list
   */
  const getRequestList = async () => {
    loading = true;
    try {
      const request = await userApi.listRealtorAccess();
      realtor_access_list = request.data.realtor_access_list;
    }
    catch (error: any) {
      throw new Error(error)
    }
    finally {
      loading = false;
    }
  }

  onMount(async () => {
    await getRequestList();
  })
</script>

<svelte:head>
	<title>
    {$_(`pages.access_requests.title`)}
  </title>
</svelte:head>

<div class="min-h-full flex flex-col justify-center">
  <PageHeader>
    {$_(`pages.access_requests.title`)}
  </PageHeader>

  <div class="w-full">
    {#each realtor_access_list as realtor_access}
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th width="100px">ID</th>
              <th>Агентство</th>
              <th width="240px">Комментарий</th>
              <th width="140px">Статус запроса</th>
              <th width="180px">Отправлен</th>
              <th width="60px"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {realtor_access.id}
              </td>
              <td>
                {realtor_access.company?.title}
              </td>
              <td>
                {#if realtor_access.comment}
                  {realtor_access.comment}
                {/if}
              </td>
              <td>
                <div class="flex flex-row items-center">
                  {#if realtor_access.status === ACCESS_REJECTED}
                    <XCircleIcon class="text-red-700" />
                  {/if}
                  {#if realtor_access.status === ACCESS_APPROVED}
                    <CheckCircleIcon class="text-green-600" />
                  {/if}
                  <span class="ml-2">
                    {$_(`statuses.${realtor_access.status}`, {default: realtor_access.status})}
                  </span>
                </div>
              </td>
              <td>
                {dayjs(realtor_access.created_at).format(FORMAT_YMDHMS)}
              </td>
              <td>
                {#if realtor_access.status === ACCESS_SENT}
                  <!-- <Trash2Icon class="link" size="20" /> -->
                {/if}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    {/each}
  </div>

</div>
