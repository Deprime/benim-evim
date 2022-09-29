import $axios from '$lib/config/http';

const PREFIX = "app/estate";

const estateApi = {
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

  /**
   * Editor
   */
  editor: (): Promise<any> => {
    const url = `${PREFIX}/editor`;
    return $axios.get(url)
  },

  /**
   * Create company
   * FIXME: add contract
   */
  create: (data: any): Promise<any> => {
    const url = `${PREFIX}`;
    return $axios.post(url, data)
  },

  /**
   * Update company
   * FIXME: add contract
   */
  update: (estate_id: number, data: any): Promise<any> => {
    const url = `${PREFIX}/${estate_id}`;
    return $axios.put(url, data)
  },


  /**
   * Get status
   */
  getStatus: (estate_id: number): Promise<any> => {
    const url = `${PREFIX}/${estate_id}/status`;
    return $axios.get(url)
  },

  /**
   * Set status
   */
  setStatus: (estate_id: number, data: any): Promise<any> => {
    const url = `${PREFIX}/${estate_id}/status`;
    return $axios.put(url, data)
  },
}

export default estateApi;

