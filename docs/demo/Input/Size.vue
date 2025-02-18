<template>
  <div class="size-holder">
    <Input v-model="test1" placeholder="大的 Input" size="large"> </Input>
    <Input v-model="test2" placeholder="默认的 Input"> </Input>
    <Input v-model="test3" placeholder="小的 Input" size="small"> </Input>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import Input from '@/components/Input/Input.vue';
const test1 = ref('');
const test2 = ref('');
const test3 = ref('');
</script>
<style scoped>
.size-holder {
  display: flex;
  align-items: center;
}
</style>
