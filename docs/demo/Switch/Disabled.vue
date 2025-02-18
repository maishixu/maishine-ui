<template>
  正常：<Switch v-model="test" /> <br />
  禁用：<Switch v-model="test2" disabled />
</template>
<script setup>
import { ref } from 'vue';
import Switch from '@/components/Switch/Switch.vue';
const test = ref(true);
const test2 = ref(false);
</script>
