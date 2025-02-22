<template>
  <div
    class="mx-form-item"
    :class="{
      'is-error': validateState.state === 'error',
      'is-success': validateState.state === 'success',
      'is-loading': validateState.loading === true,
      'is-required': isRequired
    }"
  >
    <label class="mx-form-item__label">
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>
    <div class="mx-form-item__content">
      <slot :validate="validate"></slot>
      <div class="mx-form-item__error-msg" v-if="validateState.state === 'error'">
        {{ validateState.errorMsg }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, provide, reactive } from 'vue';
import {
  formContextKey,
  formItemContextKey,
  type FormItemContext,
  type FormItemInstance,
  type FormItemProps,
  type FormValidateFailure,
  type ValidateStatus
} from './types';
import { isNil } from 'lodash-es';
import Schema from 'async-validator';

defineOptions({ name: 'MxFormItem' });
const props = defineProps<FormItemProps>();

let initialValue: any = null;
const formContext = inject(formContextKey);

const innerValue = computed(() => {
  const model = formContext?.model;
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop];
  } else {
    return null;
  }
});

const itemRules = computed(() => {
  const rules = formContext?.rules;
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop];
  } else {
    return [];
  }
});

const isRequired = computed(() => {
  return itemRules.value.some((rule) => rule.required);
});

const validateState: ValidateStatus = reactive({
  state: 'init',
  loading: false,
  errorMsg: ''
});
const getTriggerRules = (trigger: string) => {
  if (itemRules.value.length !== 0) {
    return itemRules.value.filter((rule) => {
      if (!rule.trigger || !trigger) return true;
      return rule.trigger === trigger;
    });
  } else {
    return [];
  }
};
const validate = async (trigger: string) => {
  const triggerRules = getTriggerRules(trigger);
  if (triggerRules.length === 0) return;
  if (props.prop) {
    // 创建验证器
    const validator = new Schema({
      [props.prop]: triggerRules
    });
    // 验证
    validateState.loading = true;
    return validator
      .validate({ [props.prop]: innerValue.value })
      .then(() => {
        validateState.state = 'success';
      })
      .catch((e: FormValidateFailure) => {
        const { errors } = e;
        validateState.state = 'error';
        validateState.errorMsg = errors && errors.length > 0 ? errors[0].message || '' : '';
        return Promise.reject(e);
      })
      .finally(() => {
        validateState.loading = false;
      });
  }
};
const clearValidate = () => {
  validateState.state = 'init';
  validateState.loading = false;
  validateState.errorMsg = '';
};
const resetField = () => {
  clearValidate();
  const model = formContext?.model;
  if (model && props.prop && !isNil(model[props.prop])) {
    model[props.prop] = initialValue;
  }
};
const context: FormItemContext = {
  validate,
  prop: props.prop || '',
  clearValidate,
  resetField
};
provide(formItemContextKey, context);
onMounted(() => {
  if (props.prop) {
    formContext?.addField(context);
    initialValue = innerValue.value;
  }
});
onUnmounted(() => {
  if (props.prop) {
    formContext?.removeField(context);
  }
});
defineExpose<FormItemInstance>({
  validate,
  resetField,
  clearValidate,
  validateState
});
</script>

<style></style>
