export const prerender = true;
import { error } from '@sveltejs/kit';
import { searchApi } from '$lib/api';
// import axios from "axios";

/** @type {import('./$types').PageLoad} */
export const load = async ({ params }: any) => {
  // if (params.id === 'hello-world') {

  try {
    let posts = [];

    const resp = await searchApi.list();
    posts = resp.data;

    return {
      title: 'Hello world!',
      content: 'Welcome to our blog. Lorem ipsum dolor sit amet...',
      posts,
    };
  }
  catch (err: any) {
    throw new Error(err)
  }
};
