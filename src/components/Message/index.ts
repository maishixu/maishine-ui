import Message from '@/components/Message/Message.vue';
import { createMessage, closeAllMessage } from '@/components/Message/method';
Message.install = (app: any) => {
  app.component(Message.name, Message);
};

export default Message;
export { createMessage, closeAllMessage };
export * from './types';
