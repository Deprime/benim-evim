import { userStore } from '$lib/stores';
import { userApi } from '$lib/api';

const userService = {
  /**
   * Get csrf cookie
   */
  getProfile: async (): Promise<any> => {
    try {
      await userApi.getCsrfCookie();
      const request = await userApi.getProfile();
      const { user } = request.data;
      userStore.setData(user);
    }
    catch (error) {
      throw new Error(error)
    }
  },
}

export default userService;

