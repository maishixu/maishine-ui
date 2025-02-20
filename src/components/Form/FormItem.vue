<template>
  <div
    class="mx-form-item"
    :class="{
      'is-error': validateState.state === 'error',
      'is-success': validateState.state === 'success',
      'is-loading': validateState.loading === true
    }"
  >
    <label class="mx-form-item__label">
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>
    <slot :validate="validate"></slot>
    <div class="mx-form-item__error-msg" v-if="validateState.state === 'error'">
      {{ validateState.errorMsg }}
    </div>

    <span>{{ innerValue }}</span>
    <span>{{ itemRules }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, provide, reactive } from 'vue';
import {
  formContextKey,
  formItemContextKey,
  type FormItemContext,
  type FormItemProps,
  type FormValidateFailure
} from './types';
import { isNil } from 'lodash-es';
import Schema from 'async-validator';

defineOptions({ name: 'MxFormItem' });
const props = defineProps<FormItemProps>();

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
const validateState = reactive({
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
const context: FormItemContext = {
  validate,
  prop: props.prop || ''
};
provide(formItemContextKey, context);
onMounted(() => {
  if (props.prop) {
    formContext?.addField(context);
  }
});
onUnmounted(() => {
  if (props.prop) {
    formContext?.removeField(context);
  }
});
</script>

<style></style>
