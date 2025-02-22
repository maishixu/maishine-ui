import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator';
import type { InjectionKey } from 'vue';

export interface FormItemRule extends RuleItem {
  trigger?: string;
}
export type FormRules = Record<string, FormItemRule[]>;

export interface FormProps {
  model: Record<string, any>;
  rules?: FormRules;
}
export interface FormContext extends FormProps {
  addField: (field: FormItemContext) => void;
  removeField: (field: FormItemContext) => void;
}
export interface FormInstance {
  validate: () => Promise<any>;
  clearValidate: (keys: string[]) => void;
  resetFields: (keys: string[]) => void;
}
export interface FormItemProps {
  label: string;
  prop?: string;
}

export interface FormValidateFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}
export interface ValidateStatus {
  state: 'init' | 'success' | 'error';
  errorMsg: string;
  loading: boolean;
}
export interface FormItemContext {
  prop: string;
  validate: (trigger: string) => any;
  clearValidate: () => void;
  resetField: () => void;
}
export interface FormItemInstance {
  validate: (trigger: string) => any;
  clearValidate: () => void;
  resetField: () => void;
  validateState: ValidateStatus;
}
export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey');
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContextKey');
