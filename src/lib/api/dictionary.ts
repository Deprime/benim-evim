import $axios from '$lib/config/http';

const PREFIX = "dictionary";

const dictionaryApi = {
  /**
   * Get phone prefix list
   */
  getPhonePrefixList: (): Promise<any> => {
    const url = `${PREFIX}/phone-prefix-list`;
    return $axios.get(url)
  },

  /**
   * Get contact list
   */
  getContactList: (): Promise<any> => {
    const url = `${PREFIX}/contact-list`;
    return $axios.get(url)
  },
}

export default dictionaryApi;

