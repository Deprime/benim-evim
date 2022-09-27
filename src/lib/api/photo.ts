import $axios from '$lib/config/http';

const PREFIX = "app/estate";

const photoApi = {
  /**
   * List
   * FIXME: add contract
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

  /**
   * Create company
   * FIXME: add contract
   */
  remove: (estate_id: number, photo_id: number): Promise<any> => {
    const url = `${PREFIX}/${estate_id}/photos/${photo_id}`;
    return $axios.delete(url)
  },

  /**
   * Set as poster
   */
  setPoster: (estate_id: number, photo_id: number): Promise<any> => {
    const url = `${PREFIX}/${estate_id}/photos/${photo_id}`;
    return $axios.put(url)
  },
}

export default photoApi;

