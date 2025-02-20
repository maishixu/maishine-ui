<template>
  <Select v-model="test" placeholder="基础选择器，请选择" :options="options"></Select>
  <div>
    <span>v-model:{{ test }}</span>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import Select from '@/components/Select/Select.vue';
const test = ref('');
const options = [
  { label: 'Option1', value: '1' },
  { label: 'Option2', value: '2' },
  { label: 'Option3', value: '3' },
  { label: 'Option4', value: '4', disabled: true }
];
</script>
