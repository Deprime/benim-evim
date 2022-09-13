import { getNotificationsContext } from 'svelte-notifications';

const notifyService = {
  /**
   * info
   */
  info: (text: string, heading = null, position = 'bottom-center') => {
    const { addNotification } = getNotificationsContext();
    addNotification({
      text,
      heading,
      type: 'info',
      position,
      removeAfter: 4000,
    })
  },

  /**
   * message
   */
  message: (text: string, heading = null, position = 'bottom-center') => {
    const { addNotification } = getNotificationsContext();
    addNotification({
      text,
      heading,
      type: 'message',
      position,
      removeAfter: 4000,
    })
  },

  /**
   * success
   */
  success: (text: string, heading = null, position = 'bottom-center') => {
    const { addNotification } = getNotificationsContext();
    addNotification({
      text,
      heading,
      type: 'success',
      position,
      removeAfter: 4000,
    })
  },

  /**
   * error
   */
  error: (text: string, heading = null, position = 'bottom-center') => {
    const { addNotification } = getNotificationsContext();
    addNotification({
      text,
      heading,
      type: 'error',
      position,
      removeAfter: 4000,
    })
  },
}

export default notifyService;
