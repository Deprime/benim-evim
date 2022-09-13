import $axios from '$lib/config/http';

const PREFIX = "estate";

const searchApi = {
  /**
   * Get company
   */
  get: (estate_id: number): Promise<any> => {
    const url = `${PREFIX}/${estate_id}`;
    return $axios.get(url)
  },

  /**
   * List
   */
  list: (): Promise<any> => {
    const url = `${PREFIX}`;
    return $axios.get(url)
  },
}

export default searchApi;
