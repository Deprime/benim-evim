export const prerender = true;
import { error } from '@sveltejs/kit';
import axios from "axios";

import { BASE_API_URL } from '$lib/helpers/url';

/** @type {import('./$types').PageLoad} */
export const load = async ({ params }: any) => {

  try {
    const url = `${BASE_API_URL}/estate`
    let posts = [];

    const resp = await axios.get(url);
    posts = resp.data;

    return {
      title: 'Hello world!',
      content: url,
      posts,
    };
  }
  catch (err: any) {
    throw new Error(err)
  }
};
