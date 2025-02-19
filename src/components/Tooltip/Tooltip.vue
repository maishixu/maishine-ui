<template>
  <div class="mx-tooltip" v-on="outerEvents" ref="popperContainerNode">
    <!-- 按钮 -->
    <div class="mx-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot></slot>
    </div>
    <!-- 内容 -->
    <Transition :name="transition">
      <div class="mx-tooltip__popper" ref="popperNode" v-if="isOpen">
        {{ content }}
        <slot name="content"></slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, reactive, ref, watch } from 'vue';
import type { TooltipInstance, TooltipEmit, TooltipProps } from './types';
import { createPopper } from '@popperjs/core';
import type { Instance } from '@popperjs/core';
import useClickOutside from '@/hooks/useClickOutside';
import { debounce } from 'lodash-es';

defineOptions({ name: 'MxTooltip' });
const emits = defineEmits<TooltipEmit>();
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'click',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0
});
// DOM 节点
const isOpen = ref<boolean>(false);
const triggerNode = ref<HTMLElement>();
const popperNode = ref<HTMLElement>();
const popperContainerNode = ref<HTMLElement>();
// popper 库实例
let popperInstance: null | Instance = null;
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8]
        }
      }
    ],
    ...props.popperOptions
  };
});
// click 函数
const togglePopper = () => {
  if (isOpen.value === true) {
    close();
  } else {
    open();
  }
};
// mouse 函数
// *debounce: 延迟内部回调，知道延迟时间内回调没有再被调用为止
const openDebounce = debounce(() => {
  isOpen.value = true;
  emits('visible-change', isOpen.value);
}, props.openDelay);

const closeDebounce = debounce(() => {
  isOpen.value = false;
  emits('visible-change', isOpen.value);
}, props.closeDelay);

const open = () => {
  closeDebounce.cancel(); // 打开前取消关闭防抖操作
  openDebounce();
};
const close = () => {
  openDebounce.cancel(); //关闭前取消打开防抖操作
  closeDebounce();
};
// 绑定到按钮的事件
let events: Record<string, unknown> = reactive({});
// 绑定到外部的事件
let outerEvents: Record<string, unknown> = reactive({});
const attachEvent = () => {
  if (props.trigger === 'click') {
    events['click'] = togglePopper;
  } else if (props.trigger === 'hover') {
    events['mouseenter'] = open;
    outerEvents['mouseleave'] = close;
  }
};
// click outside 时隐藏
useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    close();
  }
  if (isOpen.value) {
    emits('click-outside', true);
  }
});
// 监视 trigger/manual 变化重新绑定事件
watch(
  () => [props.trigger, props.manual],
  () => {
    events = {};
    outerEvents = {};
    if (!props.manual) {
      attachEvent();
    }
  },
  { immediate: true }
);
// 监视状态以创建/销毁 popper 实例
watch(
  isOpen,
  (newValue) => {
    if (newValue) {
      if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value);
      } else {
        popperInstance?.destroy();
      }
    }
  },
  { flush: 'post' }
);
onUnmounted(() => {
  popperInstance?.destroy();
});
// 暴露给父组件方法
defineExpose<TooltipInstance>({
  show: open,
  hide: close
});
</script>

<style scoped></style>
