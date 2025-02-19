<template>
  <div class="mx-select" :class="{ 'is-disabled': disabled }" @click="toggleDropdown">
    <Tooltip placement="bottom-start" manual ref="tooltipRef" :popper-options="popperOptions">
      <Input v-model="state.inputValue" :disabled="disabled" :placeholder="placeholder"></Input>
      <template #content>
        <ul class="mx-select__menu">
          <template v-for="(item, index) in options" :key="index">
            <li
              class="mx-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': state.selectedOption?.value === item.value
              }"
              :id="`select-item-${item.value}`"
              @click="itemSelect(item)"
            >
              {{ item.label }}
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import type { SelectEmits, SelectOption, SelectProps, SelectStates } from './types';
import Tooltip from '../Tooltip/Tooltip.vue';
import Input from '../Input/Input.vue';
import { reactive, ref, type Ref } from 'vue';
import type { TooltipInstance } from '../Tooltip/types';
defineOptions({ name: 'MxSelect' });
const props = defineProps<SelectProps>();
const emits = defineEmits<SelectEmits>();
const popperOptions: any = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 8]
      }
    },
    {
      name: 'sameWidth',
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      phase: 'beforeWrite',
      requires: ['computeStyles']
    }
  ]
};
const findOption = () => {
  const option = props.options?.find((item) => item.value === props.modelValue);
  return option;
};
const initialOption = findOption();
const state = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : '',
  selectedOption: initialOption ? initialOption : null
});

const isDropdownShow = ref(false);
const tooltipRef = ref() as Ref<TooltipInstance>;
const controlDropdown = (show: boolean) => {
  if (show) tooltipRef.value.show();
  else tooltipRef.value.hide();
  isDropdownShow.value = show;
  emits('visible-change', show);
};
const toggleDropdown = () => {
  if (props.disabled) return;
  if (isDropdownShow.value) {
    controlDropdown(false);
  } else {
    controlDropdown(true);
  }
};
const itemSelect = (e: SelectOption) => {
  if (e.disabled) return;
  state.inputValue = e.label;
  state.selectedOption = e;
  emits('change', e.value);
  emits('update:modelValue', e.value);
};
</script>

<style scoped></style>
