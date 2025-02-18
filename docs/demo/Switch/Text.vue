<template>
  <Switch v-model="test" activeText="on" inactiveText="off" />
</template>
<script setup>
import { ref } from 'vue';
import Switch from '@/components/Switch/Switch.vue';
const test = ref(false);
</script>
