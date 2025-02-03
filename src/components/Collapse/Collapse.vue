<template>
  <div class="mx-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue';
import type { CollapseProps, NameType, CollapseEmits } from './types';
import { collapseContextKey } from './types';

defineOptions({ name: 'MxCollapse' });
const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();
// 1.初始展开效果
const activeNames = ref<NameType[]>(props.modelValue);
watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue;
  }
);
// 2.手风琴模式限制
if (props.accordion && activeNames.value.length > 1) {
  console.log('accordion mode should only have one active item');
  activeNames.value = [];
  emits('update:modelValue', activeNames.value);
}
// 3.处理面板展开收缩
const handleItemClick = (name: NameType) => {
  // 3.1 手风琴模式
  if (props.accordion) {
    activeNames.value = [activeNames.value[0] === name ? '' : name];
  }
  // 3.2 普通模式
  else {
    const index = activeNames.value.indexOf(name);
    // 存在，删除数组中对应的一项
    if (index > -1) {
      activeNames.value.splice(index, 1);
    }
    // 不存在，添加到数组中
    else {
      activeNames.value.push(name);
    }
  }
  // 3.3 双向绑定
  emits('update:modelValue', activeNames.value);
  emits('change', activeNames.value);
};
provide(collapseContextKey, { activeNames, handleItemClick });
</script>

<style></style>
