<template>
  <div class="mx-collapse-item" :class="{ 'is-disable': disabled }">
    <div class="mx-collapse-item__header" :id="`item-header-${name}`" @click="handleClick">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="mx-collapse-item__content" :id="`item-content-${name}`" v-show="isActive">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { collapseContextKey, type CollapseItemProps } from './types';

defineOptions({ name: 'MxCollapseItem' });
const props = defineProps<CollapseItemProps>();
// 1.处理面板点击函数
const collapseContext = inject(collapseContextKey);
const isActive = computed(() => collapseContext?.activeNames.value.includes(props.name));
const handleClick = () => {
  if (props.disabled) {
    return;
  } else {
    collapseContext?.handleItemClick(props.name);
  }
};
</script>

<style></style>
