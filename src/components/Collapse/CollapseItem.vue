<template>
  <div class="mx-collapse-item" :class="{ 'is-disable': disabled }">
    <!-- 标题 -->
    <div
      class="mx-collapse-item__header"
      :class="{ 'is-disabled': disabled, 'is-active': isActive }"
      :id="`item-header-${name}`"
      @click="handleClick"
    >
      <slot name="title">{{ title }}</slot>
    </div>
    <!-- 内容 -->
    <Transition name="slide" v-on="transitionEvents">
      <div class="mx-collapse-item__wrapper" v-show="isActive">
        <div class="mx-collapse-item__content" :id="`item-content-${name}`">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { collapseContextKey, type CollapseItemProps } from './types';

defineOptions({ name: 'MxCollapseItem' });
const props = defineProps<CollapseItemProps>();
// 1.处理面板展开函数
const collapseContext = inject(collapseContextKey);
const isActive = computed(() => collapseContext?.activeNames.value.includes(props.name));
const handleClick = () => {
  if (props.disabled) {
    return;
  } else {
    collapseContext?.handleItemClick(props.name);
  }
};
// 2.过渡钩子函数
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  // 2.1 展开
  beforeEnter: (el) => {
    el.style.height = '0px';
    el.style.overflow = 'hidden';
  },
  enter: (el) => {
    el.style.height = `${el.scrollHeight}px`;
  },
  afterEnter: (el) => {
    el.style.height = '';
    el.style.overflow = '';
  },
  // 2.2 隐藏
  beforeLeave: (el) => {
    el.style.height = `${el.scrollHeight}px`;
    el.style.overflow = 'hidden';
  },
  leave: (el) => {
    el.style.height = `0px`;
  },
  afterLeave: (el) => {
    el.style.height = '';
    el.style.overflow = '';
  }
};
</script>

<style></style>
