<script lang="ts">
  import { onMount, afterUpdate,  createEventDispatcher } from 'svelte';
  import { browser } from '$app/environment';
  import { locale } from '$lib/config/i18n';

  import type { IMapMarker } from '$lib/interfaces/map-marker';

  // Props
  // export let lang = 'en_EN';
  export let lang = $locale || 'ru';
  export let center = [55.75361503443606, 37.620883000000006];
  export let zoom = 16;
  // export let draggable = false;
  export let editorMode = false;
  export let height = "400px";

  export let hasSearchControl = true;

  export let marker: IMapMarker | null = null;
  export let markerList: [IMapMarker] = [];
  export let updateTinker = 0;

  // Data
  const dispatch = createEventDispatcher();
  const uuid = crypto.randomUUID();
  let theMap;
  let placemarList = [];
  let loaded = false;

  // Reactive
  $: getTinkerValue = updatMarkerCoords(updateTinker);

  // Methods
  /**
   * updatMarkerCoords
   */
  const updatMarkerCoords = (tinker: number) => {
    if (theMap && editorMode && marker.coords) {
      const points = theMap.geoObjects;
      points.each(el => {
        el.geometry.setCoordinates(marker.coords);
      });
      theMap.setCenter(marker.coords)
    }
  }

  /**
   * Get address by coords
  */
  const getAddresByCoords = (coords) => {
    ymaps.geocode(coords)
      .then(function(res) {
        const data = res.geoObjects.get(0).properties.getAll();
        // console.log(data);
        const info = {
          'address': data.text,
          coords,
        }
        dispatch('positionChange', info)
      });
  }

  /**
   * create marker
   */
  const createMarker = ($$marker: IMapMarker) => {
    const coords = $$marker.coords;

    const options = {
      preset: $$marker.iconContent ? 'islands#blackStretchyIcon' : 'islands#blueDotIcon',
      draggable: editorMode,
    };

    const balloon = {
      balloonContent: $$marker.title,
      iconContent: $$marker.iconContent,
    };

    const placemark = new ymaps.Placemark(coords, balloon, options);


    // If editorMode true
    if (editorMode) {
      // Event dragend
      placemark.events.add('dragend', (event) => {
        const newCoords = event.get('target').geometry.getCoordinates();
        getAddresByCoords(newCoords)
      });

      // Event map click
      theMap.events.add("click", (event) => {
        const newCoords = event.get('coords');
        placemark.geometry.setCoordinates(newCoords);
        getAddresByCoords(newCoords)
      });
    }

    return placemark;
  }

  /**
   * Load map
   */
  const loadMap = () => {
    const controls = [
      'zoomControl',
      'fullscreenControl',
    ];

    if (hasSearchControl) {
      controls.push('searchControl')
    }

    theMap = new ymaps.Map(uuid, {
      center,
      zoom,
      controls,
    });

    try {
      // theMap.behaviors.disable('scrollZoom');
    }
    catch (error) {
      console.error(error)
    }
    const points = theMap.geoObjects;

    // For single marker
    if (marker) {
      const placemark = createMarker(marker)
      points.add(placemark);
    }

    // Adding markers on map
    markerList.forEach(el => {
      const placemark = createMarker(marker)
      points.add(placemark);
    });

    loaded = true;
  }
</script>

<svelte:head>
  <script
    src={`https://api-maps.yandex.ru/2.1/?lang=${lang}_RU&apikey=fe01a68f-ddd3-429d-a13e-2b33e8310470`}
    type="text/javascript"
    on:load={() => {
      if (!loaded) {
        ymaps.ready(loadMap);
      }
    }}
  ></script>
</svelte:head>

{#if browser}
  <div class="map" id={uuid} style={`height: ${height};`}></div>
{/if}

<style>
  .map {
    width: 100%;
  }
  :global(.ymaps-2-1-79-gototech) {
    visibility: hidden !important;
  }
  /* :global(.ymaps-2-1-79-map-copyrights-promo) {
    visibility: hidden !important;
  } */
</style>
