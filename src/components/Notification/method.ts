import { render, h, shallowReactive } from 'vue';
import type { CreateNotificationProps, NotificationInstance } from './types';
import NotificationConstructor from './Notification.vue';
import useZIndex from '@/hooks/UseZIndex';

let seed = 1;
const instances: NotificationInstance[] = shallowReactive([]);

export const createNotification = (props: CreateNotificationProps) => {
  const { nextZIndex } = useZIndex();
  const id = `notification_${seed++}`;
  const container = document.createElement('div');
  const destroy = () => {
    // 删除数组中的实例
    const idx = instances.findIndex((instance) => instance.id === id);
    if (idx === -1) return;
    instances.splice(idx, 1);
    render(null, container);
  };
  // 关闭实例，过渡结束时会自动调用 destroy 销毁
  const close = () => {
    const instance = instances.find((instance) => instance.id === id);
    if (instance) {
      instance.vm.exposed!.visible.value = false;
    }
  };
  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    destroy
  };
  const VNode = h(NotificationConstructor, newProps);
  render(VNode, container);
  //非空断言操作符
  document.body.appendChild(container.firstElementChild!);
  const instance: NotificationInstance = {
    id,
    VNode,
    vm: VNode.component!,
    props: newProps,
    close
  };
  instances.push(instance);
  return instance;
};

export const getLastInstance = () => {
  return instances.at(-1);
};

export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id);
  if (idx <= 0) {
    return 0;
  } else {
    const prevInstance = instances[idx - 1];
    return prevInstance.vm.exposed!.bottomOffset.value;
  }
};

export const closeAllNotification = () => {
  instances.forEach((instance) => {
    instance.close();
  });
};
