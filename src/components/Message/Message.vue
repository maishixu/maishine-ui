<template>
  <Transition :name="transition" @after-leave="destroyComponent" @enter="updateHeight">
    <div
      class="mx-message"
      :class="{ [`mx-message--${type}`]: type, 'is-close': showClose }"
      role="alert"
      v-show="visible"
      ref="messageRef"
      :style="cssStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <!-- 内容 -->
      <div class="mx-message__content">
        <slot>
          <RenderVNode :vNode="message" v-if="message"></RenderVNode>
        </slot>
      </div>
      <!-- 关闭图标 -->
      <div class="mx-message__close" v-if="showClose" @click.stop="visible = false">
        <Icon icon="xmark"></Icon>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { MessageProps } from './types';
import Icon from '../Icon/Icon.vue';
import RenderVNode from '../Common/RenderVNode';
import { computed, onMounted, ref } from 'vue';
import { getLastBottomOffset } from './method';
import useEventListener from '@/hooks/useEventListener';
defineOptions({ name: 'MxMessage' });
const props = withDefaults(defineProps<MessageProps>(), {
  duration: 3000,
  type: 'info',
  offset: 20,
  transition: 'fade-up'
});
// 1.计算组件位置
const messageRef = ref<HTMLDivElement>();
const height = ref(0);
const updateHeight = () => {
  height.value = messageRef.value!.getBoundingClientRect().height;
};
const lastOffset = computed(() => getLastBottomOffset(props.id));
const topOffset = computed(() => {
  return lastOffset.value + props.offset;
});
const bottomOffset = computed(() => {
  return height.value + topOffset.value;
});
const cssStyle = computed(() => {
  return { top: topOffset.value + 'px', zIndex: props.zIndex };
});
// 2.控制是否展示
const visible = ref(false);
let timer: any;
// 2.1 开始计时器
const startTimer = () => {
  if (props.duration === 0) return; // 一直展示
  timer = setTimeout(() => {
    visible.value = false;
    props.destroy();
  }, props.duration);
};
// 2.2 清空计时器
const clearTimer = () => {
  clearTimeout(timer);
};
// 2.3 销毁实例
const destroyComponent = () => {
  props.destroy();
};
// 2.4 监听键盘事件
const keydown = (e: Event) => {
  const event = e as KeyboardEvent;
  if (event.code === 'Escape') visible.value = false;
};
useEventListener(document, 'keydown', keydown);

onMounted(async () => {
  visible.value = true;
  startTimer();
});
defineExpose({ bottomOffset, visible });
</script>

<style scoped></style>
