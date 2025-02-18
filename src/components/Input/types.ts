export interface InputProps {
  modelValue: string;
  type?: string;
  size?: 'large' | 'small';
  disabled?: boolean;
  clearable?: boolean;
  showPassword?: boolean;
  // 其他原生属性
  placeholder?: string;
  readonly?: boolean;
  autocomplete?: string;
  autofocus?: boolean;
  form?: string;
}
export interface InputEmits {
  (e: 'update:modelValue', value: string): void;
  (e: 'input', value: string): void;
  // change 修改值且失去焦点
  (e: 'change', value: string): void;
  (e: 'blur', value: FocusEvent): void;
  (e: 'focus', value: FocusEvent): void;
  (e: 'clear'): void;
}
