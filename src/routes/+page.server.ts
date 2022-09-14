export const prerender = true;
import { error } from '@sveltejs/kit';
// import { searchApi } from '$lib/api';
import axios from "axios";

const API_URL     = import.meta.env.VITE_API_URL;
const API_VERSION = `${import.meta.env.VITE_API_VERSION}`;

/** @type {import('./$types').PageLoad} */
export const load = async ({ params }: any) => {
  // if (params.id === 'hello-world') {


  try {
    let posts = [];
    const url = `${API_URL}/api/${API_VERSION}/estate`

    // const resp = await searchApi.list();
    const resp = await axios.get(url);
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
