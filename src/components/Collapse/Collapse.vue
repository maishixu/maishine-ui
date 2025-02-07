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
// 1.初始展开数组
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
  let _activeNames = [...activeNames.value];
  // 3.1 手风琴模式
  if (props.accordion) {
    _activeNames = [_activeNames[0] === name ? '' : name];
    activeNames.value = _activeNames;
  }
  // 3.2 普通模式
  else {
    const index = _activeNames.indexOf(name);
    if (index > -1) {
      // 存在，删除数组中对应的一项
      _activeNames.splice(index, 1);
    } else {
      // 不存在，添加到数组中
      _activeNames.push(name);
    }
    activeNames.value = _activeNames;
  }
  // 3.3 双向绑定
  emits('update:modelValue', activeNames.value);
  emits('change', _activeNames);
};
provide(collapseContextKey, { activeNames, handleItemClick });
</script>

<style></style>
