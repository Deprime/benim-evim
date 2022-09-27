<script>
  import FilePond, { registerPlugin, supported } from 'svelte-filepond';
  const API_URL = import.meta.env.VITE_API_URL;
  const API_VERSION = `${import.meta.env.VITE_API_VERSION}`;

  // Import the Image EXIF Orientation and Image Preview plugins
  // Note: These need to be installed separately
  // `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

  // Register the plugins
  registerPlugin(FilePondPluginImagePreview);

  // a reference to the component, used to call FilePond methods
  let pond;

  // pond.getFiles() will return the active files
  // the name to use for the internal file input
  let name = 'filepond';
  let serverUrl = `${API_URL}/api/${API_VERSION}/app/estate/1/photos`;

  // handle filepond events
  function handleInit() {
    console.log('FilePond has initialised');
  }

  function handleAddFile(err, fileItem) {
    console.log('A file has been added', fileItem);
  }
</script>

<div class="app">
  <FilePond
    bind:this={pond}
    {name}
    server={serverUrl}
    allowMultiple={true}
    oninit={handleInit}
    onaddfile={handleAddFile}
  />
</div>

<style global>
  @import 'filepond/dist/filepond.css';
  @import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
</style>
