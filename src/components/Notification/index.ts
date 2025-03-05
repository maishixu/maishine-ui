import Notification from '@/components/Notification/Notification.vue';
import { createNotification, closeAllNotification } from '@/components/Notification/method';
Notification.install = (app: any) => {
  app.component(Notification.name, Notification);
};

export default Notification;
export { createNotification, closeAllNotification };
export * from './types';
