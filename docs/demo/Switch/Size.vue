<template>
  <div class="switch-size-container">
    <Switch v-model="test1" size="large" />
    <Switch v-model="test2" />
    <Switch v-model="test3" size="small" />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import Switch from '@/components/Switch/Switch.vue';
const test1 = ref(false);
const test2 = ref(false);
const test3 = ref(false);
</script>
<style scoped>
.switch-size-container {
  display: flex;
  align-items: center;
  .mx-switch {
    margin-right: 10px;
  }
}
</style>
