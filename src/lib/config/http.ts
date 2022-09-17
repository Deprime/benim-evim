import axios from "axios";
import { DEFAULT_LOCALE } from '$lib/constants/languages';

// Config
const DEBUG_MODE  = (import.meta.env.VITE_APP_DEBUG_MODE === 'true');
const API_URL     = import.meta.env.VITE_API_URL;
const API_VERSION = `${import.meta.env.VITE_API_VERSION}`;
const DEV_MODE    = import.meta.env.DEV;

if (DEBUG_MODE) {
  // eslint-disable-next-line no-console
  console.table({ API_URL, API_VERSION, DEV_MODE, DEBUG_MODE });
}
// Create a instance of axios
const $axios = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api/${API_VERSION}`
});

/**
 * Pre config of axios request
 */
$axios.interceptors.request.use((config) => {
  if (typeof localStorage !== "undefined") {
    if (localStorage?.user) {
      const json = localStorage.getItem("user");
      const user = JSON.parse(json);
      const token = user.token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Accept-Language"] = localStorage?.locale || DEFAULT_LOCALE;
  }
  else {
    config.headers["Accept-Language"] = DEFAULT_LOCALE;
  }

  return config;
});

/**
 * Pre config of axios response
 */
$axios.interceptors.response.use((response) =>
  response,
  async (error) => {
    if (DEV_MODE) {
      console.log(error);
    }
    return Promise.reject(error);
  },
);

export default $axios;
