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
        @input="debounceOnFilter"
        @keydown="handleKeydown"
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
        <div v-if="state.loading" class="mx-select__loading"><Icon icon="spinner" spin></Icon></div>
        <div v-else-if="filterOptions?.length === 0" class="mx-select__nodata">no match data</div>
        <ul v-else class="mx-select__menu">
          <template v-for="(item, index) in filterOptions" :key="index">
            <li
              class="mx-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': state.selectedOption?.value === item.value,
                'is-highlight': state.highlightIndex === index
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
import { isFunction, debounce } from 'lodash-es';
defineOptions({ name: 'MxSelect' });
const props = withDefaults(defineProps<SelectProps>(), { options: () => [] });
const emits = defineEmits<SelectEmits>();

const isDropdownShow = ref(false);

const tooltipRef = ref() as Ref<TooltipInstance>;
const inputRef = ref() as Ref<InputInstance>;
const filterOptions = ref(props.options);
const timeout = computed(() => (props.remote ? 300 : 0));

// 1.初始化
const findOption = () => {
  const option = props.options?.find((item) => item.value === props.modelValue);
  return option;
};

const initialOption = ref(findOption());
/* 小坑：当把 props 的值作为初始值赋值给响应式对象时，一定要 watch 原始值的修改，然后更新本地响应式对象 */
watch(props, () => {
  initialOption.value = findOption();
  filterOptions.value = props.options;
});

const state = reactive<SelectStates>({
  inputValue: initialOption.value ? initialOption.value.label : '',
  selectedOption: initialOption.value ? initialOption.value : null,
  isHover: false,
  loading: false,
  highlightIndex: -1
});

// 2.设置下拉框的宽度和父元素宽度相等
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

// 3. 支持搜索功能
const generateFilterOptions = async (searchValue: string) => {
  if (!props.filterable) return;
  // 自定义搜索方法
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filterOptions.value = props.filterMethod(searchValue);
  } else if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    // 远程搜索
    state.loading = true;
    try {
      filterOptions.value = await props.remoteMethod(searchValue);
    } catch (e) {
      console.error(e);
    } finally {
      state.loading = false;
    }
  } else {
    // 默认搜索
    filterOptions.value = props.options?.filter((item) => item.label.includes(searchValue));
  }
  state.highlightIndex = -1;
};

const debounceOnFilter = debounce(() => {
  generateFilterOptions(state.inputValue);
}, timeout.value);

// 4. 计算 placeholder
const filterPlaceholder = computed(() => {
  // 假如支持筛选功能
  if (props.filterable && state.selectedOption && isDropdownShow) {
    return state.selectedOption.label;
  }
  // 默认状态
  else {
    return props.placeholder;
  }
});

// 5.控制开关
const controlDropdown = (value: boolean) => {
  // 5.1 打开
  if (value) {
    // 如果时 filter 模式，先清空值然后重新过滤
    if (props.filterable) {
      state.inputValue = '';
      generateFilterOptions(state.inputValue);
    }
    tooltipRef.value.show();
  }
  // 5.2 关闭
  else {
    if (props.filterable) {
      state.inputValue = state.selectedOption ? state.selectedOption.label : '';
    }
    tooltipRef.value.hide();
    state.highlightIndex = -1;
  }
  isDropdownShow.value = value;
  emits('visible-change', value);
};
// 6.翻转状态
const toggleDropdown = () => {
  if (props.disabled) return;
  if (isDropdownShow.value) {
    controlDropdown(false);
  } else {
    controlDropdown(true);
  }
};
// 7.点击选择函数
const itemSelect = (e: SelectOption) => {
  if (e.disabled) return;
  state.inputValue = e.label;
  state.selectedOption = e;
  inputRef.value.ref.focus();
  emits('change', e.value);
  emits('update:modelValue', e.value);
};
// 8.支持一键清空
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
// 支持键盘操作
const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
      if (!isDropdownShow.value) controlDropdown(true);
      else {
        if (state.highlightIndex !== -1 && filterOptions.value[state.highlightIndex]) {
          itemSelect(filterOptions.value[state.highlightIndex]);
          controlDropdown(false);
        } else {
          controlDropdown(false);
        }
      }
      break;
    case 'Escape':
      if (isDropdownShow.value) controlDropdown(false);
      break;
    case 'ArrowUp':
      e.preventDefault();
      if (filterOptions.value.length > 0) {
        if (state.highlightIndex === -1 || state.highlightIndex === 0) {
          state.highlightIndex = filterOptions.value.length - 1;
        } else {
          state.highlightIndex--;
        }
      }
      break;
    case 'ArrowDown':
      e.preventDefault();
      if (filterOptions.value.length > 0) {
        if (state.highlightIndex === -1 || state.highlightIndex === props.options.length - 1) {
          state.highlightIndex = 0;
        } else {
          state.highlightIndex++;
        }
      }
  }
};
</script>

<style scoped></style>
