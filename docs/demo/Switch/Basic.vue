<template>
  <Switch v-model="test" />
</template>
<script setup>
import { ref } from 'vue';
import Switch from '@/components/Switch/Switch.vue';
const test = ref(false);
</script>
