import type { VNode } from 'vue';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}
export type RenderLabelFunc = (option: SelectOption) => VNode;
export type CustomFilterFunc = (value: string) => SelectOption[];
export type CustomRemoteFunc = (value: string) => Promise<SelectOption[]>;
export interface SelectProps {
  modelValue: string;
  options?: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  filterable?: boolean;
  filterMethod?: CustomFilterFunc;
  renderLabel?: RenderLabelFunc;
  remote?: boolean;
  remoteMethod?: CustomRemoteFunc;
}
export interface SelectEmits {
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string): void;
  (e: 'visible-change', value: boolean): void;
  (e: 'clear'): void;
}
// 当前选择的选项
export interface SelectStates {
  inputValue: string;
  selectedOption: null | SelectOption;
  isHover: boolean;
  loading: boolean;
}
