import $axios from '$lib/config/http';

const PREFIX = "app/admin/user";

const userManagmentApi = {

  /**
   * Get user list
   */
  list: (searchParams = {}): Promise<any> => {
    let params = Object.keys(searchParams).map(key => `${key}=${searchParams[key]}`);
    params = (params.length > 0)
      ?  "?" + params.join("&")
      : ""
    const url = `${PREFIX}${params}`;
    return $axios.get(url)
  },
}

export default userManagmentApi;

