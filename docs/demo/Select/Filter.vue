<template>
  <Select
    v-model="test"
    placeholder="可以过滤的选择器，请输入"
    :options="options2"
    filterable
  ></Select>
</template>
<script setup>
import { ref } from 'vue';
import Select from '@/components/Select/Select.vue';
const test = ref('');
const options2 = [
  { label: 'hello', value: '1' },
  { label: 'world', value: '2' },
  { label: 'testing', value: '3' },
  { label: 'happy', value: '4', disabled: true }
];
</script>
