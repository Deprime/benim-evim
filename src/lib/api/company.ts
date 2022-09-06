import $axios from '$lib/config/http';

// const API_URL = import.meta.env.VITE_API_URL;
// const PREFIX = "auth";

const companyApi = {
  /**
   * Get company
   */
  get: (): Promise<any> => {
    const url = `app/company`;
    return $axios.get(url)
  },

  /**
   * Create company
   * FIXME: add contract
   */
  create: (data: any): Promise<any> => {
    const url = `app/company`;
    return $axios.post(url, data)
  },

  /**
   * Update company
   * FIXME: add contract
   */
  update: (data: any): Promise<any> => {
    const url = `app/company`;
    return $axios.put(url, data)
  },
}

export default companyApi;

