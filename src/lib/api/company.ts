import $axios from '$lib/config/http';

// const API_URL = import.meta.env.VITE_API_URL;
// const PREFIX = "auth";

const companyApi = {
  /**
   * Get company list
   */
  list: (): Promise<any> => {
    const url = `app/company/list`;
    return $axios.get(url)
  },

  /**
   * Get user company
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

  /**
   * List realtor access
   */
  listRealtorAccess: (): Promise<any> => {
    const url = `app/company/realtor-access/list`;
    return $axios.get(url)
  },

  /**
   * Approve realtor access
   */
  approveRealtorAccess: (access_id: number): Promise<any> => {
    const url = `app/company/realtor-access/${access_id}/approve`;
    return $axios.put(url)
  },

  /**
   * Reject realtor access
   */
  rejectRealtorAccess: (access_id: number, comment: null|string = ""): Promise<any> => {
    const url  = `app/company/realtor-access/${access_id}/reject`;
    const data = {
      comment: (comment?.length > 0) ? comment : null
    };
    return $axios.put(url, data)
  },
}

export default companyApi;

