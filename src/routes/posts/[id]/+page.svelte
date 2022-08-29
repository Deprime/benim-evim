<script>
  /** @type {import('./$types').PageData} */
  export let data;

  const { post } = data;
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="content">
	<h1>About this app</h1>

  <h1>
    {post.title}
  </h1>
  <div class="pb-6">
    {@html post.body}
  </div>

  <div>
    <h2>
      Comments
    </h2>

    <ul>
      {#each post.comments as comment}
      <li class="pb-6">
        <h3>
          {comment.email}
        </h3>
        <div>
          {comment.body}
        </div>
      </li>
      {/each}
    </ul>
  </div>
</div>
