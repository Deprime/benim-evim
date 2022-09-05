import $axios from '$lib/config/http';

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "auth";

const userApi = {
  /**
   * Get csrf cookie
   */
  getCsrfCookie: (): Promise<any> => {
    const url = `${API_URL}/sanctum/csrf-cookie`;
    return $axios.get(url);
  },

  /**
   * Sign in
   */
  signinByPhone:  (prefix: string, phone: string, password: string): Promise<any> => {
    const url = `${PREFIX}/signin-by-phone`;
    return $axios.post(url, {prefix, phone, password})
  },


  /**
   * Sign in
   */
   signin: (email: string, password: string): Promise<any> => {
    const url = `${PREFIX}/signin`;
    return $axios.post(url, {email, password})
  },

  /**
   * Sign up via email
   */
  signupEmail: (email: string, password: string): Promise<any> => {
    const url = `${PREFIX}/signup-email`;
    return $axios.post(url, {email, password})
  },

  /**
   * Sign up via email
   */
  requestSmsCode: (prefix: string, phone: string): Promise<any> => {
    const url = `${PREFIX}/send-sms-code`;
    return $axios.post(url, {prefix, phone})
  },

  /**
   * Validate phone
   */
  validatePhone: (prefix: string, phone: string, code: string): Promise<any> => {
    const url = `${PREFIX}/validate-phone`;
    return $axios.post(url, {prefix, phone, code})
  },

  /**
   * Sign up via phone
   */
  signupPhone: (prefix: string, phone: string, password: string): Promise<any> => {
    const url = `${PREFIX}/signup-phone`;
    return $axios.post(url, {prefix, phone, password})
  },

  /**
   * Get profile
   */
  getProfile: (): Promise<any> => {
    const url = `app/profile`;
    return $axios.get(url)
  },

  /**
   * Update profile
   */
  updateProfile: (data): Promise<any> => {
    const url = `app/profile`;
    return $axios.put(url, data)
  },

  /**
   * Change password
   */
  changePassword: (password: string, password_confirmation: string): Promise<any> => {
    const url = `app/profile/change-password`;
    return $axios.put(url, {password, password_confirmation})
  },
}

export default userApi;

