import type { VNode, ComponentInternalInstance } from 'vue';
export interface NotificationProps {
  title: string;
  message?: string | VNode;
  duration?: number;
  showClose?: boolean;
  type?: 'success' | 'info' | 'warning' | 'danger';
  destroy: () => void;
  id: string;
  zIndex: number;
  offset?: number;
  transitionName?: string;
  icon?: string;
}
export interface NotificationInstance {
  id: string;
  VNode: VNode;
  vm: ComponentInternalInstance;
  props: NotificationProps;
  close: () => void;
}
export type CreateNotificationProps = Omit<NotificationProps, 'destroy' | 'id' | 'zIndex'>;
