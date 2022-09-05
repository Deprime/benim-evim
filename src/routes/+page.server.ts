export const prerender = true;
import { error } from '@sveltejs/kit';
import axios from "axios";

/** @type {import('./$types').PageLoad} */
export const load = async ({ params }: any) => {
  // if (params.id === 'hello-world') {

  let posts = []
  try {
    const theposts = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const data = theposts.data;

    return {
      title: 'Hello world!',
      content: 'Welcome to our blog. Lorem ipsum dolor sit amet...',
      posts: data,
    };
  }
  catch (err: any) {
    throw new Error(err)
  }
};
