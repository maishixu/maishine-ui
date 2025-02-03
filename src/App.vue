<template>
  <div>
    <Button ref="buttonRef">Test Button</Button>
    <Button plain>Plain Button</Button>
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
    <Button size="small">Small</Button><br /><br />

    <Collapse v-model="openedValue" accordion>
      <CollapseItem name="1">
        <template #title><h1>具名插槽标题</h1></template>
        <h1>第一个CollapseItem内容</h1>
      </CollapseItem>
      <CollapseItem name="2" title="普通标题">
        <h2>第二个CollapseItem内容</h2>
      </CollapseItem>
    </Collapse>
    <CollapseItem name="3" disabled title="禁用下拉框">
      <h3>第三个CollapseItem内容</h3>
    </CollapseItem>
    {{ openedValue }}
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Button from './components/Button/Button.vue';
import Collapse from './components/Collapse/Collapse.vue';
import CollapseItem from './components/Collapse/CollapseItem.vue';
import type { NameType } from './components/Collapse/types';

const openedValue = ref<NameType[]>(['1', '2']);
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
