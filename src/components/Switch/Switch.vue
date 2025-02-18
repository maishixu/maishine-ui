<template>
  <div
    class="mx-switch"
    :class="{ [`mx-switch--${size}`]: size, 'is-disabled': disabled, 'is-checked': checked }"
  >
    <input
      class="mx-switch__input"
      type="checkbox"
      role="switch"
      :disabled="disabled"
      :name="name"
      ref="inputRef"
      @keydown.enter="handleClick"
    />
    <div class="mx-switch__core" @click="handleClick">
      <!-- 文本 -->
      <div class="mx-switch__core-inner">
        <span v-if="activeText || inactiveText" class="mx-switch__core-inner-text">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <!-- 圆圈 -->
      <div class="mx-switch__core-action"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import type { SwitchEmits, SwitchProps } from './types';

defineOptions({ name: 'MxSwitch' });
const props = withDefaults(defineProps<SwitchProps>(), { activeValue: true, inactiveValue: false });
const emits = defineEmits<SwitchEmits>();
// 获取 v-model 值并使用 watch 监视
const innerValue = ref(props.modelValue);
watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue;
  }
);
const checked = computed(() => innerValue.value === props.activeValue);
// 点击后切换状态
const handleClick = () => {
  if (props.disabled) return;
  innerValue.value = checked.value ? props.inactiveValue : props.activeValue;
  emits('update:modelValue', innerValue.value);
  emits('change', innerValue.value);
};
// 将 checked 值和 input 联系
const inputRef = ref<HTMLInputElement>();
onMounted(() => {
  inputRef.value!.checked = checked.value;
});
watch(checked, () => {
  inputRef.value!.checked = checked.value;
});
</script>

<style></style>
