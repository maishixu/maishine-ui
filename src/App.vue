<template>
  <div>
    <Form :model="model" :rules="formrules" ref="formRef">
      <FormItem label="input-label-1" prop="email">
        <template #label="{ label }">
          <b>{{ label }}</b>
        </template>
        <Input v-model="model.email"></Input>
      </FormItem>
      <FormItem label="input-label-2" prop="password">
        <Input v-model="model.password"></Input>
      </FormItem>
    </Form>
    <Button @click.prevent="validate">全部验证</Button>
    <Button @click.prevent="clearValidate">清空验证</Button>
    <Button @click.prevent="resetFields">重置所有</Button>
  </div>
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
    <Select
      clearable
      v-model="SelectValue3"
      placeholder="远程搜索"
      filterable
      remote
      :remote-method="remoteFilter"
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
    <Button circle @click="createNotificationButton">MX</Button>
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
    <Icon icon="star" rotation="90" type="danger"></Icon>
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
  <Switch v-model="test" size="small" />
</template>
<script setup lang="ts">
import { h, onMounted, reactive, ref } from 'vue';

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
import Form from './components/Form/Form.vue';
import FormItem from './components/Form/FormItem.vue';
import type { NameType } from './components/Collapse/types';
import type { DropdownInstance } from './components/Dropdown/types';
import type { SelectOption } from './components/Select/types';
import type { FormRules } from './components/Form/types';
import { createNotification } from './components/Notification/method';
// let message1 = {};
// const destroyMessage = () => {
//   closeAll();
// };
// const closeOneMessage = () => {
//   message1.close();
// };
const test = ref(false)
const model = reactive({
  email: '11',
  password: '',
  test: ''
});
const formrules: FormRules = {
  email: [
    {
      type: 'string', // 这里确保是 RuleType 中定义的类型
      required: true,
      trigger: 'blur'
    }
  ],
  password: [
    {
      type: 'string',
      required: true,
      trigger: 'blur'
    },
    {
      // 自定义校验规则
      validator: (rule, value) => value === model.email,
      trigger: 'blur',
      message: '两次密码不一致'
    }
  ],
  test: [
    {
      type: 'string',
      required: true,
      min: 3,
      max: 5
    }
  ]
};
const formRef = ref();
const validate = async () => {
  try {
    await formRef.value.validate();
    console.log('passed!');
  } catch (e) {
    console.log('the error', e);
  }
};
const clearValidate = () => {
  formRef.value.clearValidate();
};
const resetFields = () => {
  formRef.value.resetFields();
};
const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
];
const remoteFilter = (value: string): Promise<SelectOption[]> => {
  return new Promise((resolve) => {
    if (value) {
      setTimeout(() => {
        const options = states
          .filter((item) => {
            return item.toLowerCase().includes(value.toLowerCase());
          })
          .map((label) => {
            return { label: label, value: label };
          });
        resolve(options);
      }, 500);
    } else {
      resolve([]);
    }
  });
};
const openedValue = ref<NameType[]>(['1']);
const DropdownRef = ref<DropdownInstance | null>(null);
const InputValue1 = ref('test1');
const InputValue2 = ref('test2');
const SwitchValue = ref('wrong');
const SelectValue = ref('value1');
const SelectValue2 = ref('');
const SelectValue3 = ref('');
const customSelectRender = (option: SelectOption) => {
  return h('b', option.label);
};
const createNotificationButton = () => {
  createNotification({
    message: 'Hello notification',
    title: 'title 1 notification',
    duration: 3000
  });
};
onMounted(() => {
  createMessage({
    message: 'hello message test',
    duration: 0,
    showClose: true,
    type: 'info'
  });
  createMessage({ message: 'hello message test 1', duration: 0, showClose: true, type: 'success' });
  createMessage({ message: 'hello message test 2', duration: 0, showClose: true, type: 'danger' });
  createNotification({
    message: 'Hello notification',
    title: 'title 1 notification',
    duration: 0
  });
  createNotification({ message: h('b', 'Hello '), title: 'title 1 notification', duration: 0 });
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
