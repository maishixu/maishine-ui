<template>
  <div class="mx-dropdown">
    <Tooltip
      :trigger="trigger"
      :placement="placement"
      :popper-options="popperOptions"
      :close-delay="closeDelay"
      :open-delay="openDelay"
      :manual="manual"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
      <slot></slot>
      <template #content>
        <ul class="mx-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li v-if="item.divided" role="separator" class="divided-placeholder"></li>
            <li
              class="mx-dropdown__item"
              :class="{ 'is-disabled': item.disabled, 'is-divided': item.divided }"
              :id="`dropdown-item-${item.key}`"
              @click="itemClick(item)"
            >
              <!-- 直接渲染 VNode 会出现问题，借助组件完成渲染 -->
              <RenderVNode :v-node="item.label"></RenderVNode>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import Tooltip from '../Tooltip/Tooltip.vue';
import type { DropdownEmits, DropdownInstance, DropdownProps, MenuOption } from './types';
import type { TooltipInstance } from '../Tooltip/types';
import RenderVNode from '../Common/RenderVNode';

defineOptions({ name: 'MxDropdown' });
const props = withDefaults(defineProps<DropdownProps>(), {
  hideAfterClick: true
});
const emits = defineEmits<DropdownEmits>();
const tooltipRef = ref() as Ref<TooltipInstance>;

const visibleChange = (value: boolean) => {
  emits('visible-change', value);
};
const itemClick = (item: MenuOption) => {
  if (item.disabled) {
    // 如何选项不可用直接返回
    return;
  }
  emits('select', item);
  if (props.hideAfterClick) {
    tooltipRef.value?.hide();
  }
};
defineExpose<DropdownInstance>({
  // 通过箭头函数动态获取 tooltipRef 最新值
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide()
});
</script>

<style></style>
