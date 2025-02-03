import type { Ref, InjectionKey } from 'vue';

// 1.面板参数
export type NameType = number | string;
export interface CollapseProps {
  modelValue: NameType[];
  accordion?: boolean;
}
export interface CollapseItemProps {
  name: NameType;
  title?: string;
  disabled?: boolean;
}
// 2.上下文数据
export interface CollapseContext {
  activeNames: Ref<NameType[]>;
  handleItemClick: (name: NameType) => void;
}
export const collapseContextKey: InjectionKey<CollapseContext> = Symbol();

// 3.触发事件函数
export interface CollapseEmits {
  (e: 'update:modelValue', values: NameType[]): void;
  (e: 'change', values: NameType[]): void;
}
