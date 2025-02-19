<template>
  <div>
    <Select
      clearable
      v-model="SelectValue"
      :options="[
        { label: 'label1', value: 'value1' },
        { label: 'label2', value: 'value2' },
        { label: 'label3', value: 'value3', disabled: true }
      ]"
      :render-label="customSelectRender"
    ></Select>
    <Select
      clearable
      v-model="SelectValue2"
      placeholder="select"
      :options="[
        { label: 'label1', value: 'value1' },
        { label: 'label2', value: 'value2' },
        { label: 'label3', value: 'value3', disabled: true }
      ]"
      filterable
    ></Select>
  </div>
  <div>
    <Switch
      v-model="SwitchValue"
      active-text="ON"
      inactive-text="OFF"
      active-value="right"
      inactive-value="wrong"
    ></Switch>
    <span>{{ SwitchValue }}</span>
  </div>
  <div>
    <Input v-model="InputValue1" clearable></Input>
    <Input v-model="InputValue2" show-password></Input>
  </div>
  <div>
    <Tooltip
      content="Hello Tooltip by mx"
      placement="right"
      trigger="hover"
      ref="TooltipRef"
      :popperOptions="{ placement: 'right', strategy: 'fixed' }"
      transition="fade"
    >
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    </Tooltip>
  </div>
  <div>
    <Dropdown
      ref="DropdownRef"
      placement="bottom"
      trigger="hover"
      transition="fade"
      :menu-options="[
        { label: h('b', 'item1'), key: '1' },
        { label: 'item2', key: '2' },
        { label: 'item3', key: '3', divided: true },
        { label: 'item4', key: '4', disabled: true }
      ]"
    >
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    </Dropdown>
  </div>
  <!-- <div>
    <Message message="hello message" show-close></Message>
  </div> -->
  <div>
    <Button ref="buttonRef" @click="DropdownRef?.show">Test Button</Button>
    <Button plain @click="DropdownRef?.hide">Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle>MX</Button>
    <Button disabled>Disabled Button</Button><br /><br />
    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button><br /><br />
    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button><br /><br />
    <Button size="large">Large</Button>
    <Button size="small">Small</Button>
    <Button loading>Loading</Button>
    <Button icon="magnifying-glass">Icon</Button><br /><br />
  </div>
  <div>
    <Collapse :modelValue="openedValue" accordion>
      <CollapseItem name="1" title="Collapse title 1">
        <span>第一个CollapseItem内容</span>
      </CollapseItem>
      <CollapseItem name="2" title="Collapse title 2">
        <span>第二个CollapseItem内容</span>
      </CollapseItem>
      <CollapseItem name="3" title="Collapse title 3" disabled>
        <span>第三个CollapseItem内容</span>
      </CollapseItem>
    </Collapse>
  </div>
  <div>
    <Icon icon="star" rotation="90" type="primary"></Icon>
    <Icon icon="music" color="red"></Icon>
    <Icon icon="phone"></Icon>
  </div>
  <div>
    <Alert type="success" title="Success Alert"></Alert>
    <Alert type="info" title="Info Alert"></Alert>
    <Alert type="warning" title="Warning Alert" effect="dark"></Alert>
    <Alert type="danger" title="Error Alert" effect="dark"></Alert>
    <Alert type="info" title="Custom Text Alert" closeText="关闭"></Alert>
    <Alert type="info" title="UnClosable Alert" :closable="false" effect="dark"></Alert>
  </div>
</template>
<script setup lang="ts">
import { h, onMounted, ref } from 'vue';

import Button from './components/Button/Button.vue';
import Collapse from './components/Collapse/Collapse.vue';
import CollapseItem from './components/Collapse/CollapseItem.vue';
import Icon from './components/Icon/Icon.vue';
import Alert from './components/Alert/Alert.vue';
import Tooltip from './components/Tooltip/Tooltip.vue';
import Dropdown from './components/Dropdown/Dropdown.vue';
import { createMessage } from './components/Message/method';
import Input from './components/Input/Input.vue';
import Switch from './components/Switch/Switch.vue';
import Select from './components/Select/Select.vue';
import type { NameType } from './components/Collapse/types';
import type { DropdownInstance } from './components/Dropdown/types';
import type { SelectOption } from './components/Select/types';

const openedValue = ref<NameType[]>(['1']);
const DropdownRef = ref<DropdownInstance | null>(null);
const InputValue1 = ref('test1');
const InputValue2 = ref('test2');
const SwitchValue = ref('wrong');
const SelectValue = ref('value1');
const SelectValue2 = ref('');

const customSelectRender = (option: SelectOption) => {
  return h('b', option.label);
};
onMounted(() => {
  createMessage({ message: 'hello message test', duration: 0, showClose: true, type: 'info' });
  createMessage({ message: 'hello message test 1', duration: 0, showClose: true, type: 'success' });
  createMessage({ message: 'hello message test 2', duration: 0, showClose: true, type: 'danger' });
});
</script>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 1rem;
  border: green 1px solid;
}
/* header {
  line-height: 1.5;
}



@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
