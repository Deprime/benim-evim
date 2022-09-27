import $axios from '$lib/config/http';

// const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "app/admin/company";

const companyManagmentApi = {
  /**
   * Get company list
   */
  list: (): Promise<any> => {
    const url = `${PREFIX}`;
    return $axios.get(url)
  },

  /**
   * Get company by id
   */
  get: (company_id: number): Promise<any> => {
    const url = `${PREFIX}/${company_id}`;
    return $axios.get(url)
  },

  /**
   * Create company
   */
  create: (data: any): Promise<any> => {
    const url = `${PREFIX}`;
    return $axios.post(url, data)
  },

  /**
   * Update company
   */
  update: (company_id: number, data: any): Promise<any> => {
    const url = `${PREFIX}/${company_id}`;
    return $axios.put(url, data)
  },

  /**
   * Delete company
   */
  delete: (company_id: number): Promise<any> => {
    const url = `${PREFIX}/${company_id}`;
    return $axios.delete(url)
  },
}

export default companyManagmentApi;

