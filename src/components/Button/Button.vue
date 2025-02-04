<template>
  <button
    ref="_ref"
    class="mx-button"
    :class="{
      [`mx-button--${type}`]: type,
      [`mx-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading
    }"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <Icon icon="spinner" spin v-if="loading"></Icon>
    <Icon :icon="icon" v-if="icon"></Icon>
    <span>
      <slot></slot>
    </span>
  </button>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { ButtonProps } from './types';
import Icon from '../Icon/Icon.vue';
defineOptions({
  name: 'MxButton'
});
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
});

const _ref = ref<HTMLButtonElement>();
defineExpose({
  ref: _ref
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
