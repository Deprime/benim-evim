export const prerender = true;
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load = async ({ params }: any) => {
  // if (params.id === 'hello-world') {
  const { id } = params;

  const resp1 = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await resp1.json();

  const resp2 = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
  post.comments = await resp2.json();

  return {
    title: 'Hello world!',
    content: 'Welcome to our blog. Lorem ipsum dolor sit amet...',
    post,
  };
};
