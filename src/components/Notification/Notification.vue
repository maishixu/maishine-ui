<template>
  <Transition
    :name="`mx-notification-${transitionName}`"
    @after-leave="destroyComponent"
    @enter="updateHeight"
  >
    <div
      class="mx-notification"
      v-show="visible"
      :class="{
        [`mx-notification--${type}`]: type,
        'is-close': showClose
      }"
      role="alert"
      ref="notificationRef"
      :style="cssStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <Icon :icon="iconName" v-if="iconName" class="mx-notification__icon" />
      <div class="mx-notification__text">
        <div class="mx-notification__title">
          {{ title }}
        </div>
        <div class="mx-notification__content">
          <slot>
            <RenderVNode :vNode="message" v-if="message" />
          </slot>
        </div>
      </div>

      <div class="mx-notification__close" v-if="showClose">
        <Icon @click.stop="visible = false" icon="xmark" />
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { NotificationProps } from './types';
import { getLastBottomOffset } from './method';
import RenderVNode from '../Common/RenderVNode';
import Icon from '../Icon/Icon.vue';
import useEventListener from '../../hooks/useEventListener';
defineOptions({ name: 'MxNotification' });
const props = withDefaults(defineProps<NotificationProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
  transitionName: 'fade',
  showClose: true
});

const visible = ref(false);
const notificationRef = ref<HTMLDivElement>();

const typeIconNameMap = {
  success: 'circle-check',
  info: 'circle-info',
  warning: 'circle-exclamation',
  danger: 'circle-xmark'
};
const iconName = computed(() => {
  if (props.icon) return props.icon;
  return typeIconNameMap[props.type];
});

// 计算实例位置
const height = ref(0);
const updateHeight = () => {
  height.value = notificationRef.value!.getBoundingClientRect().height;
};
// *** 当其他实例关闭时，instances 会变，导致 computed 重新计算，元素位置上移动
const lastOffset = computed(() => getLastBottomOffset(props.id));
const topOffset = computed(() => props.offset + lastOffset.value);
const bottomOffset = computed(() => height.value + topOffset.value);
const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
  zIndex: props.zIndex
}));

let timer: any;
const startTimer = () => {
  if (props.duration === 0) return;
  timer = setTimeout(() => {
    visible.value = false;
  }, props.duration);
};
const clearTimer = () => {
  clearTimeout(timer);
};

onMounted(async () => {
  visible.value = true;
  startTimer();
});

const keydown = (e: Event) => {
  const event = e as KeyboardEvent;
  if (event.code === 'Escape') {
    visible.value = false;
  }
};
useEventListener(document, 'keydown', keydown);

const destroyComponent = () => {
  props.destroy();
};

defineExpose({
  visible,
  bottomOffset
});
</script>
