<template>
  <div>
    <Tooltip
      content="Hello Tooltip by mx"
      placement="right"
      trigger="hover"
      ref="TooltipRef"
      :popperOptions="{ placement: 'bottom', strategy: 'fixed' }"
      transition="fade"
      :open-delay="1000"
      :close-delay="1000"
      >Tooltip
      <template #content>
        <h2>Tooltip custom</h2>
      </template>
    </Tooltip>
  </div>
  <div>
    <Button ref="buttonRef" @click="TooltipRef?.show">Test Button</Button>
    <Button plain @click="TooltipRef?.hide">Plain Button</Button>
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
import { ref } from 'vue';
import Button from './components/Button/Button.vue';
import Collapse from './components/Collapse/Collapse.vue';
import CollapseItem from './components/Collapse/CollapseItem.vue';
import Icon from './components/Icon/Icon.vue';
import Alert from './components/Alert/Alert.vue';
import Tooltip from './components/Tooltip/Tooltip.vue';

import type { NameType } from './components/Collapse/types';
import type { TooltipInstance } from './components/Tooltip/types';

const openedValue = ref<NameType[]>(['1']);
const TooltipRef = ref<TooltipInstance | null>(null);
</script>

<style scoped>
/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
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
