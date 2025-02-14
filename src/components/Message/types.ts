import type { ComponentInternalInstance, VNode } from 'vue';

export interface MessageProps {
  message?: string | VNode;
  duration?: number;
  showClose?: boolean;
  type?: 'success' | 'info' | 'warning' | 'error';
  onDestroy: () => void;
  offset?: number;
  id: string;
  zIndex: number;
}

export type CreateMessageProps = Omit<MessageProps, 'onDestroy' | 'id' | 'zIndex'>;

export interface MessageInstance {
  id: string;
  vNode: VNode;
  props: MessageProps;
  vm: ComponentInternalInstance;
  destroy: () => void;
}
