import Message from '@/components/Message/Message.vue';
import { createMessage, destroyAllMessage } from '@/components/Message/method';
Message.install = (app: any) => {
  app.component(Message.name, Message);
};

export default Message;
export { createMessage, destroyAllMessage };
export * from './types';
