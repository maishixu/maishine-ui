<template>
  <i class="mx-icon" :class="{ [`mx-icon--${type}`]: type }" :style="customStyle">
    <font-awesome-icon v-bind="filterProps"></font-awesome-icon>
  </i>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { omit } from 'lodash-es';
import type { IconProps } from './types';
import { computed } from 'vue';
defineOptions({
  name: 'MxIcon',
  inheritAttrs: false // 不继承父组件传递的非 prop 的属性
});
const props = defineProps<IconProps>();
const filterProps = computed(() => omit(props, ['type', 'color']));
// 自定义主题
const customStyle = computed(() => {
  return props.color ? { color: props.color } : {};
});
</script>

<style></style>
