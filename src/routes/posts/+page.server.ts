export const prerender = true;
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load = async ({ params }: any) => {
  // if (params.id === 'hello-world') {

  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await response.json();

  return {
    title: 'Hello world!',
    content: 'Welcome to our blog. Lorem ipsum dolor sit amet...',
    posts,
  };

	// if (response.status === 404) {
	// 	return {
	// 		todos: [] as Todo[]
	// 	};
	// }

	// if (response.status === 200) {
	// 	return {
	// 		todos: (await response.json()) as Todo[]
	// 	};
	// }

	// throw error(response.status);
};
