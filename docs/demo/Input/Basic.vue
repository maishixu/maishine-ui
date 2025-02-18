<template>
  <Input v-model="test" placeholder="基础文本框，请输入" />
  <span>input 输入框的值：{{ test }}</span>
</template>
<script setup>
import { ref } from 'vue';
import Input from '@/components/Input/Input.vue';
const test = ref('');
</script>
