<template>
  <Input v-model="test" disabled />
</template>
<script setup>
import { ref } from 'vue';
import Input from '@/components/Input/Input.vue';
const test = ref('Disable input text');
</script>
