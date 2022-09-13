import $axios from '$lib/config/http';

const PREFIX = "app/estate";

const photoApi = {
  /**
   * List
   */
  list: (estate_id: number): Promise<any> => {
    const url = `${PREFIX}/${estate_id}/photos`;
    return $axios.get(url)
  },

  /**
   * Create company
   * FIXME: add contract
   */
  create: (estate_id: number, data: any): Promise<any> => {
    const url = `${PREFIX}/${estate_id}/photos`;
    return $axios.post(url, data, {headers: { "Content-Type": "multipart/form-data" }})
  },
}

export default photoApi;

