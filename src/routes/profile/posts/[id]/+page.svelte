<script lang="ts">
  import { onMount } from 'svelte';
  import { _ } from '$lib/config/i18n';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  // Componetns
  import { RadioGroup, Radio } from "svelte-radio";
  import { Button, Input, Editor, Select2, Label, Alert } from '$lib/components/ui';
  import { PageHeader, Map } from '$lib/components/shared';
  import NavTabs from '../_components/NavTabs.svelte';

  import { estateApi } from '$lib/api';
  import { getNotificationsContext } from 'svelte-notifications';

  import type { ICurrency }  from '$lib/interfaces/currency';

  // Props
  export let estate = {
    price: 0,
    settlement_id: null,
    rent_type_id: 1,
    estate_type_id: 1,
    currency_id: 1,
    coords: [],
    updateTinker: 0,
  };

  // Data
  let { params } = $page;
  const id = parseInt(params.id);
  const { addNotification } = getNotificationsContext();

  let errors = {};
  let settlementList = <any>[];
  let settlement = <any>{};

  let currencyList = <Array<ICurrency>>[];
  let currency: ICurrency | undefined;

  let rentTypeList = <Array<any>>[];
  let rentTypeId = 1;

  let estateTypeList = <Array<any>>[];
  let estateType = <any>{};

  let loading = true;
  let form = {
    loading: false,
    errors: {}
  };

  // Reactive
  $: priceLabel = getPriceLabel(currency, rentTypeId)

  // Methods
  /**
   * Get price label
   */
  const getPriceLabel = ($$currency: ICurrency, rent_type_id: number) => {
    if ($$currency) {
      return (rentTypeId === 1 )
      ? `Цена за месяц ${$$currency.symbol}`
      : `Цена ${$$currency.symbol}`;
    }
    return `Цена`;
  }

  /**
   * Set address
   */
  const setAddress = (): void => {
    if (estate.suggested_address) {
      estate.address = estate.suggested_address;
    }
  }

  /**
   * On position change
   */
  const onPositionChange = (event: CustomEvent): void => {
    if (event.detail.address) {
      estate.suggested_address = event.detail.address;
    }
    if (event.detail.coords) {
      estate.coords = event.detail.coords;
      console.log(estate)
    }
  }

  /**
   * On settlement select
   */
  const onSettlementSelect = (event: CustomEvent) => {
    const $$settlement = event.detail;
    const $$state = estate.settlement_id;
    estate.settlement_id = $$settlement.id;
    estate.coords = $$settlement.coords;
    estate.updateTinker++;
  }

  /**
   * Load editor data
   */
  const loadEditorData = async () => {
    loading = true;
    try {
      const response = await estateApi.editor();
      const {
        settlement_list,
        currency_list,
        rent_type_list,
        estate_type_list,
      } = response.data;
      settlementList = settlement_list.map((el: any) => ({...el, value: el.id, label: el.title}));
      settlement = settlementList[0];
      estate.settlement_id = settlement.id;
      estate.coords = settlement.coords;

      currencyList = currency_list.map((el: ICurrency) => ({...el, value: el.id, label: `${el.code} ${el.symbol}`}));
      currency = currencyList.find((el: ICurrency) => el.number === 949);
      estate.currency_id = (!estate.currency_id)
        ? currency.id
        : estate.currency_id;

      rentTypeList = rent_type_list;
      estateTypeList = estate_type_list.map((el: any) => ({...el, value: el.id, label: el.title}));
      estateType = estateTypeList[0];
    }
    catch (error: any) {
      errors = error.response?.data || {};
      throw new Error(error)
    }
    finally {
      loading = false;
    }
  }

  /**
   * Load editor data
   */
  const loadEstate = async (estate_id: number) => {
    loading = true;
    try {
      const response = await estateApi.get(estate_id);
      estate = response.data;

      currency = currencyList.find((el: ICurrency) => el.id === estate.currency_id);
      settlement = settlementList.find((el) => el.id === estate.settlement_id);
      estateType = estateTypeList.find((el) => el.id === estate.estate_type_id);
      rentTypeId = estate.rent_type_id;
    }
    catch (error: any) {
      errors = error.response?.data || {};
      throw new Error(error)
    }
    finally {
      loading = false;
    }
  }

  /**
   * Submit estate data
   */
  const submit = async () => {
    form.loading = true;
    try {
      const $$estate = {...estate};
      $$estate.rent_type_id = rentTypeId;
      if (Number.isInteger(id)) {
        const response = await estateApi.update(id, $$estate);

        addNotification({
          text: 'Изменения сохранены',
          type: "success",
          position: 'top-right',
        })
      }
      else {
        const response = await estateApi.create($$estate);
        const $$estate_id = response.data.id;
        goto(`/profile/posts/${$$estate_id}/gallery`);
      }
    }
    catch (error: any) {
      form.errors = error.response?.data || {};

      addNotification({
        text: 'Данные заполнены не корректно',
        type: "error",
        position: 'top-right',
        removeAfter: 4000,
      });

      throw new Error(error)
    }
    finally {
      form.loading = false;
    }
  }

  onMount(async () => {
    await loadEditorData();

    if (Number.isInteger(id)) {
      await loadEstate(id);
    }
  })
</script>

<svelte:head>
	<title>
    {$_(`pages.post_editor.title`)}
  </title>
</svelte:head>

<div class="min-h-full flex flex-col justify-center">
  <PageHeader>
    {$_(`pages.post_editor.title`)}
  </PageHeader>

  <form on:submit|preventDefault={submit}  class="text-sm">
    <div class="shadow rounded-md">
      <nav class="py-4 px-6 bg-slate-50 border-b border-b-slate-200 rounded-t-md">
        <NavTabs id={$page.params.id} />
      </nav>
      <!-- <header class="py-4 px-6 bg-slate-50 border-b border-b-slate-200 font-medium text-base">
        {#if estate.title && estate.title.elngth > 0}
          {estate.title}
        {:else}
          <span class="text-slate-400">
            Наименование обьекта
          </span>
        {/if}
      </header> -->

      {#if !loading}
        <section class="editor-body">
          <div class="flex flex-row space-x-4">
            <div class="w-1/6">
              {#if rentTypeList.length > 0}
                <RadioGroup bind:value={rentTypeId}>
                  <div slot="legend">
                    <Label>Тип обьявления:</Label>
                  </div>
                  {#each rentTypeList as rentType}
                    <div class="pb-2">
                      <Radio
                        label={rentType.title}
                        value={rentType.id}
                      />
                    </div>
                  {/each}
                </RadioGroup>
              {/if}
            </div>

            <div class="w-1/6">
              <Select2
                id="estate_type"
                label="Тип жилья"
                items={estateTypeList}
                value={estateType}
                isClearable={false}
                required
                on:select={e => {
                  estateType = e.detail;
                  estate.estate_type_id = e.detail.id;
                }}
                errorText={form.errors.settlement_id}
              ></Select2>
            </div>
          </div>

          <div class="flex flex-row space-x-4">
            <div class="w-1/6">
              <Select2
                id="settlement"
                label="Город"
                items={settlementList}
                value={settlement}
                isClearable={false}
                required
                on:select={onSettlementSelect}
              ></Select2>
            </div>

            <div class="w-5/6">
              <Input
                label={`Адрес обьекта`}
                bind:value={estate.address}
                disabled={form.loading}
              />
              <span class="hidden">
                ${estate.coords?.length > 0 ? estate.coords : ""}
              </span>

              {#if estate.suggested_address}
                <div class="flex flex-row justify-between pt-1">
                    <div class="text-slate-500">
                      Отметка на карте: {estate.suggested_address}
                    </div>
                    <span class="link" on:click={setAddress}>
                      Установить
                    </span>
                </div>
              {/if}
            </div>
          </div>

          {#if estate.coords}
            <div>
              <Map
                editorMode
                center={estate.coords}
                marker={{coords: estate.coords, title: ""}}
                updateTinker={estate.updateTinker}
                on:positionChange={onPositionChange}
              />
            </div>
          {/if}

          <div class="flex flex-row space-x-4">
            <div class="w-1/6">
              <Input
                label="Этаж"
                type="number"
                disabled={form.loading}
                bind:value={estate.level}
                errors={form.errors.level}

              />
            </div>
            <div class="w-1/6">
              <Input
                label="Этажей в доме"
                type="number"
                disabled={form.loading}
                bind:value={estate.total_levels}
                errors={form.errors.total_levels}
              />
            </div>
          </div>

          <div class="flex flex-row space-x-4">
            <div class="w-1/6">
              <Input
                label="Количество комнат"
                type="number"
                required
                disabled={form.loading}
                bind:value={estate.room_count}
                errors={form.errors.room_count}
              />
            </div>
            <div class="w-1/6">
              <Input
                label="Площадь м²"
                type="number"
                required
                disabled={form.loading}
                bind:value={estate.area}
                errors={form.errors.area}
              />
            </div>
          </div>

          <div class="flex flex-row space-x-4">
            <div class="w-1/6">
              <Label>
                {priceLabel}
              </Label>
              <Input
                type="number"
                required
                disabled={form.loading}
                bind:value={estate.price}
                errors={form.errors.price}
              />
            </div>
            <div class="w-1/6">
              <Select2
                id="currency"
                label="Валюта"
                items={currencyList}
                value={currency}
                isClearable={false}
                on:select={e => {
                  currency = e.detail;
                  estate.currency_id = e.detail.id;
                }}
              ></Select2>
            </div>
          </div>

          <div>
            <Input
              type="url"
              label="Ссылка на видео (Youtube, Vimeo)"
              placeholder="пример https://youtu.be/dQw4w9WgXcQ"
              class="w-2/3"
              disabled={form.loading}
              bind:value={estate.video_link}
              errors={form.errors.video_link}
            />
          </div>

          <div>
            <Editor
              label="Описание обьекта"
              required
              placeholder="Введите описание обьекта"
              class="w-2/3 pb-3"
              bind:value={estate.description }
              disabled={form.loading}
              errors={form.errors.description}
            />
          </div>
        </section>
      {:else}
        <div class="py-16 flex content-center justify-center">
          Загрузка
        </div>
      {/if}

      <footer class="bg-gray-100 px-4 py-3 text-right flex justify-end sm:px-6">
        <Button
          type="submit"
          loading={form.loading}
          disabled={form.loading}
        >
          {$_('actions.save')}
        </Button>
      </footer>
    </div>
  </form>
</div>

<style lang="scss">
  .editor-body {
    @apply space-y-6 bg-white px-4 py-5 sm:p-6
  }
</style>
