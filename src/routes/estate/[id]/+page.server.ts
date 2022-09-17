export const prerender = true;
import { error } from '@sveltejs/kit';
import axios from "axios";

import { BASE_API_URL } from '$lib/helpers/url';

/** @type {import('./$types').PageLoad} */
export const load = async ({ params }: any) => {
  const { id } = params;

  try {
    const url = `${BASE_API_URL}/estate/${id}`
    let post = {};

    const resp = await axios.get(url);
    post = resp.data;

    return {
      content: url,
      post,
    };
  }
  catch (err: any) {
    throw new Error(err)
  }
};
