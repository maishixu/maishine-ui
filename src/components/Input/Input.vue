<template>
  <div
    class="mx-input"
    :class="{
      [`mx-input--${type}`]: type,
      [`mx-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-focus': isFocus
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- 左外 -->
      <div v-if="$slots.prepend" class="mx-input__prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="mx-input__wrapper">
        <!-- 左内 -->
        <span v-if="$slots.prefix" class="mx-input__prefix"><slot name="prefix"></slot></span>
        <!-- 输入框 -->
        <input
          class="mx-input__inner"
          :type="showPassword ? (isPasswordVisible ? 'text' : 'password') : type"
          :disabled="disabled"
          :placeholder="placeholder"
          :readonly="readonly"
          :autofocus="autofocus"
          :autocomplete="autocomplete"
          :form="form"
          v-bind="$attrs"
          v-model="innerValue"
          ref="inputRef"
          @input="handelInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        />
        <!-- 右内 -->
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="mx-input__suffix"
          @click="keepFocus"
        >
          <slot name="suffix"> </slot>
          <!-- 一键清空 -->
          <Icon
            v-if="showClear"
            icon="circle-xmark"
            class="mx-input__clear"
            @click="handleClear"
            @mousedown.prevent="NOOP"
          ></Icon>
          <!-- 显示/隐藏密码 -->
          <Icon
            v-if="showPasswordArea"
            :icon="isPasswordVisible ? 'eye' : 'eye-slash'"
            class="mx-input__password"
            @click="togglePasswordVisible"
          ></Icon>
        </span>
      </div>
      <!-- 右外 -->
      <div v-if="$slots.append" class="mx-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        class="mx-textarea__wrapper"
        :disabled="disabled"
        :placeholder="placeholder"
        :readonly="readonly"
        :autofocus="autofocus"
        :autocomplete="autocomplete"
        :form="form"
        v-bind="$attrs"
        v-model="innerValue"
        @input="handelInput"
        @click="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      ></textarea>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch, type Ref } from 'vue';
import type { InputProps, InputEmits } from './types';
import Icon from '../Icon/Icon.vue';

defineOptions({ name: 'MxInput', inheritAttrs: false });
const props = withDefaults(defineProps<InputProps>(), { type: 'text' });
const emits = defineEmits<InputEmits>();
const inputRef = ref() as Ref<HTMLElement>;
// 双向绑定输入值
const innerValue = ref(props.modelValue);
watch(
  () => props.modelValue,
  () => {
    innerValue.value = props.modelValue;
  }
);
const handelInput = () => {
  emits('update:modelValue', innerValue.value);
  emits('input', innerValue.value);
};
// 一键清空
const isFocus = ref(false);
const showClear = computed(() => {
  return props.clearable && !props.disabled && !!innerValue.value && isFocus.value;
});
const handleClear = () => {
  innerValue.value = '';
  emits('update:modelValue', innerValue.value);
  emits('clear');
  emits('input', innerValue.value);
  emits('change', innerValue.value);
};
const handleFocus = (e: FocusEvent) => {
  isFocus.value = true;
  emits('focus', e);
};
const handleBlur = (e: FocusEvent) => {
  isFocus.value = false;
  emits('blur', e);
};
// 隐藏密码
const isPasswordVisible = ref(false);
const showPasswordArea = computed(() => {
  return props.showPassword && !props.disabled && !!innerValue.value;
});
const togglePasswordVisible = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
// change 事件：修改值且失去焦点时触发
const handleChange = () => {
  emits('change', innerValue.value);
};
// 保持焦点
const keepFocus = async () => {
  await nextTick();
  inputRef.value.focus();
};
// 空函数
const NOOP = () => {};
// 暴露 Input 实例
defineExpose({ ref: inputRef });
</script>

<style></style>
