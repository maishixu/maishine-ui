<template>
  <div
    class="mx-select"
    :class="{ 'is-disabled': disabled }"
    @click="toggleDropdown"
    @mouseenter="state.isHover = true"
    @mouseleave="state.isHover = false"
  >
    <Tooltip
      placement="bottom-start"
      manual
      ref="tooltipRef"
      :popper-options="popperOptions"
      @click-outside="controlDropdown(false)"
    >
      <Input
        v-model="state.inputValue"
        :disabled="disabled"
        :placeholder="filterPlaceholder"
        :readonly="!filterable || !isDropdownShow"
        ref="inputRef"
        @input="onFilter"
      >
        <template #suffix>
          <Icon
            v-if="!showClearIcon"
            icon="angle-down"
            class="header-angle"
            :class="{ 'is-active': isDropdownShow }"
          ></Icon>
          <Icon v-else class="mx-input__clear" icon="circle-xmark" @click.stop="onClear"></Icon>
        </template>
      </Input>
      <template #content>
        <ul class="mx-select__menu">
          <template v-for="(item, index) in filterOptions" :key="index">
            <li
              class="mx-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': state.selectedOption?.value === item.value
              }"
              :id="`select-item-${item.value}`"
              @click="itemSelect(item)"
            >
              <!-- 支持自定义模板 -->
              <RenderVNode :vNode="renderLabel ? renderLabel(item) : item.label"></RenderVNode>
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
import Icon from '../Icon/Icon.vue';
import RenderVNode from '../Common/RenderVNode';
import { computed, reactive, ref, watch, type Ref } from 'vue';
import type { TooltipInstance } from '../Tooltip/types';
import type { InputInstance } from '../Input/types';
import { isFunction } from 'lodash-es';
defineOptions({ name: 'MxSelect' });
const props = defineProps<SelectProps>();
const emits = defineEmits<SelectEmits>();

const isDropdownShow = ref(false);

const tooltipRef = ref() as Ref<TooltipInstance>;
const inputRef = ref() as Ref<InputInstance>;
const filterOptions = ref(props.options);
watch(
  () => props.options,
  (newValue) => {
    filterOptions.value = newValue;
  }
);
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
  selectedOption: initialOption ? initialOption : null,
  isHover: false
});

const generateFilterOptions = (searchValue: string) => {
  if (!props.filterable) return;
  // 自定义搜索方法
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filterOptions.value = props.filterMethod(searchValue);
  } else {
    // 默认搜索
    filterOptions.value = props.options?.filter((item) => item.label.includes(searchValue));
  }
};
const onFilter = () => generateFilterOptions(state.inputValue);
const filterPlaceholder = computed(() => {
  if (props.filterable && state.selectedOption && isDropdownShow) {
    return state.selectedOption.label;
  } else {
    return props.placeholder;
  }
});
const controlDropdown = (show: boolean) => {
  if (show) {
    // 如果时 filter 模式，先清空值然后重新过滤
    if (props.filterable) {
      state.inputValue = '';
      generateFilterOptions(state.inputValue);
    }
    tooltipRef.value.show();
  } else {
    if (props.filterable) {
      state.inputValue = state.selectedOption ? state.selectedOption.label : '';
    }
    tooltipRef.value.hide();
  }
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
  inputRef.value.ref.focus();
  emits('change', e.value);
  emits('update:modelValue', e.value);
};

const showClearIcon = computed(() => {
  return props.clearable && state.isHover && state.inputValue && state.selectedOption;
});
const onClear = () => {
  state.inputValue = '';
  state.selectedOption = null;
  emits('update:modelValue', '');
  emits('change', '');
  emits('clear');
};
</script>

<style scoped></style>
