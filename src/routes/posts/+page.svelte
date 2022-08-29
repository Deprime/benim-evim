<script>
  /** @type {import('./$types').PageData} */
  export let data;

  console.log(data)
</script>

<svelte:head>
	<title>Post list</title>
	<meta name="description" content="Post list" />
</svelte:head>

<div class="content">
	<h1>Post list</h1>

  <div>
    <h1>
      {data.title}
    </h1>
    <div class="mb-10">
      {@html data.content}
    </div>

    {#each data.posts as post}
      <div>
        <h2 class="text-lg font-semibold first-letter:capitalize">
          <a href={`/posts/${post.id}`}>
            {post.title}
          </a>
        </h2>
        <div class="pb-6">
          {post.body}
        </div>
      </div>
    {/each}
  </div>
</div>
