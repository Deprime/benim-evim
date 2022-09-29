<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from '$lib/config/i18n';
  import dayjs from 'dayjs';

  // Componetns
  import { Button, Modal, Textarea, Alert } from '$lib/components/ui';
  import { PageHeader  } from '$lib/components/shared';
  import { CheckIcon, XIcon, XCircleIcon, CheckCircleIcon } from 'svelte-feather-icons'

  // Services
  import { companyApi } from '$lib/api';
  import { userStore } from '$lib/stores';

  import { ACCESS_SENT, ACCESS_REJECTED, ACCESS_APPROVED } from '$lib/constants/access-statuses';

  // Data
  const FORMAT_YMDHMS = 'DD.MM.YYYY H:m:s';
  let loading = true;
  let processing = false;
  const reject_modal = {
    visible: false,
    realtor_access: null,
    comment: "",
  }
  let realtor_access_list: any[] = [];

  /**
   * Get request list
   */
  const getRequestList = async () => {
    loading = true;
    try {
      const request = await companyApi.listRealtorAccess();
      realtor_access_list = request.data.realtor_access_list;
    }
    catch (error: any) {
      throw new Error(error)
    }
    finally {
      loading = false;
    }
  }

  /**
   * On approve
   */
  const onApprove = async (realtor_access: any) => {
    processing = true;
    try {
      await companyApi.approveRealtorAccess(realtor_access.id);
      await getRequestList();
      reject_modal.comment = ""
    }
    catch (error: any) {
      throw new Error(error)
    }
    finally {
      processing = false;
    }
  }

  /**
   * On open reject modal
   */
  const openRejectModal = (realtor_access: any) => {
    reject_modal.realtor_access = realtor_access;
    reject_modal.visible = true;
  }

  const resetModalState = () => {
    reject_modal.visible = false;
    reject_modal.comment = "";
    reject_modal.realtor_access = null;
  }

  /**
   * On reject
   */
  const onReject = async () => {
    processing = true;
    try {
      const { realtor_access, comment } = reject_modal;
      await companyApi.rejectRealtorAccess(realtor_access.id, comment);
      resetModalState();
      await getRequestList();
    }
    catch (error: any) {
      throw new Error(error)
    }
    finally {
      processing = false;
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
              <th width="200px">
                {$_(`pages.access_requests.author`)}
              </th>
              <th>
                {$_(`pages.access_requests.comment`)}
              </th>
              <th width="200px">
                {$_(`pages.access_requests.request_status`)}
              </th>
              <th width="160px">
                {$_(`pages.access_requests.send_date`)}
              </th>
              <th width="110px"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {realtor_access.author?.first_name}:
                {realtor_access.author?.prefix} {realtor_access.author?.phone}

                <div class="text-xs font-normal text-slate-500">
                  request id: {realtor_access.id}
                </div>
              </td>
              <td>
                {#if realtor_access.comment}
                  <div class="border-l-4 border-solid border-l-slate-200 pl-2">
                    {realtor_access.comment}
                  </div>
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
                {#if $userStore.data.is_head }
                  {#if realtor_access.status === ACCESS_SENT}
                    <div class="flex flex-row space-x-2">
                      <Button
                        variant="white"
                        class="px-2 text-sm"
                        title={$_('actions.approve')}
                        disabled={processing}
                        on:click={() => {onApprove(realtor_access)}}
                      >
                        <CheckIcon class="link text-green-600" size="20" />
                      </Button>
                      <Button
                        variant="white"
                        class="px-2 text-sm"
                        title={$_('actions.reject')}
                        disabled={processing}
                        on:click={() => {openRejectModal(realtor_access)}}
                      >
                        <XIcon class="link text-red-600" size="20" />
                      </Button>
                    </div>
                  {/if}
                {/if}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    {/each}
  </div>

  <Modal
    bind:visible={reject_modal.visible}
    size="xs"
    title={$_('pages.access_requests.reject_reason')}
  >
    {#if reject_modal.realtor_access}
      <Alert class="mb-4">
        <p class="mb-2">
          Отклонение запроса пользователя
        </p>
        <p class="font-semibold">
          {reject_modal.realtor_access.author.first_name}:
          {reject_modal.realtor_access.author.prefix}
          {reject_modal.realtor_access.author.phone}
        </p>
      </Alert>
    {/if}


    <Textarea
      rows={2}
      label={$_('pages.access_requests.reject_reason')}
      placeholder="Не обязательное поле"
      bind:value={reject_modal.comment}
    />

    <footer class="pt-4 flex justify-end">
      <Button
        disabled={processing}
        loading={processing}
        on:click={onReject}
      >
        {$_('actions.reject')}
      </Button>
    </footer>
  </Modal>
</div>
