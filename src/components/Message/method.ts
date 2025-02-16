import { h, render, shallowReactive } from 'vue';
import Message from './Message.vue';
import type { CreateMessageProps, MessageInstance } from './types';
import useZIndex from '@/hooks/UseZIndex';
const instances: MessageInstance[] = shallowReactive([]);
let seed = 1;
// 1.创建 Message 实例
export const createMessage = (props: CreateMessageProps) => {
  const id = `message_${seed++}`;
  const container = document.createElement('div');
  const { nextZIndex } = useZIndex();
  // 卸载
  const destroy = () => {
    const idx = instances.findIndex((item) => item.id === id);
    if (idx === -1) return;
    instances.splice(idx, 1);
    render(null, container);
  };
  const manualDestroy = () => {
    const instance = instances.find((item) => (item.id = id));
    if (instance) {
      instance.vm.exposed!.visible.value = false;
    }
  };
  const newProps = {
    ...props,
    onDestroy: destroy,
    id,
    zIndex: nextZIndex()
  };
  // Message 的虚拟 DOM
  const vNode = h(Message, newProps);
  // 虚拟 DOM 挂载到真实 DOM 节点上
  render(vNode, container);
  document.body.appendChild(container.firstChild!); // 非空类型断言
  const instance: MessageInstance = {
    id,
    vNode,
    props: newProps,
    vm: vNode.component!,
    destroy: manualDestroy
  };
  instances.push(instance);
  return instance;
};
// 2.获取上一个实例
export const findLastMessage = () => {
  return instances.at(-1);
};
// 3.获取上一个实例底边偏移
export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex((item) => item.id === id);
  if (idx <= 0) return 0;
  else return instances[idx - 1].vm.exposed!.bottomOffset.value;
};
// 4.清空所有实例
export const destroyAllMessage = () => {
  instances.forEach((item) => {
    item.destroy();
  });
};
