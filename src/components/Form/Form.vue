<template>
  <form class="mx-form">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import { formContextKey } from './types';
import type {
  FormContext,
  FormInstance,
  FormItemContext,
  FormProps,
  FormValidateFailure
} from './types';
import type { ValidateFieldsError } from 'async-validator';
defineOptions({ name: 'MxForm' });
const props = defineProps<FormProps>();

const fields: FormItemContext[] = [];

const addField: FormContext['addField'] = (field) => {
  fields.push(field);
};
const removeField: FormContext['removeField'] = (field) => {
  fields.splice(fields.indexOf(field), 1);
};
const clearValidate = (keys: string[] = []) => {
  const filterArr = keys.length > 0 ? fields.filter((field) => keys.includes(field.prop)) : fields;
  filterArr.forEach((field) => field.clearValidate());
};
const resetFields = (keys: string[] = []) => {
  const filterArr = keys.length > 0 ? fields.filter((field) => keys.includes(field.prop)) : fields;
  filterArr.forEach((field) => field.resetField());
};
const validate = async () => {
  let validationErrors: ValidateFieldsError = {};
  for (const field of fields) {
    try {
      await field.validate('');
    } catch (e) {
      const error = e as FormValidateFailure;
      validationErrors = {
        ...validationErrors,
        ...error.fields
      };
    }
  }
  // 把错误抛出去
  if (Object.keys(validationErrors).length === 0) return true;
  return Promise.reject(validationErrors);
};
provide(formContextKey, {
  ...props,
  removeField,
  addField
});
defineExpose<FormInstance>({
  validate,
  clearValidate,
  resetFields
});
</script>

<style></style>
