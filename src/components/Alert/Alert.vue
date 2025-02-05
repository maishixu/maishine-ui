<template>
  <Transition name="mx-alert-fade">
    <div
      class="mx-alert"
      :class="{ [`mx-alert__${type}`]: type, [`mx-alert__${effect}`]: type }"
      v-if="isDisplay"
    >
      <span class="mx-alert__content">
        {{ title }}
      </span>
      <div class="mx-alert__close" @click="isDisplay = false" v-if="closable">
        <Icon v-if="!closeText" icon="xmark"></Icon>
        <span v-if="closeText">{{ closeText }}</span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { AlertProps } from './types';
import Icon from '../Icon/Icon.vue';
import { ref } from 'vue';
defineOptions({
  name: 'MxAlert'
});
withDefaults(defineProps<AlertProps>(), {
  type: 'info',
  effect: 'light',
  closable: true
});
const isDisplay = ref<boolean>(true);
</script>

<style></style>
