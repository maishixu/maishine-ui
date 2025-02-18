<template>
  <Switch v-model="test" activeValue="right" inactiveValue="wrong" />
  <h6>model-value: {{ test }}</h6>
</template>
<script setup>
import { ref } from 'vue';
import Switch from '@/components/Switch/Switch.vue';
const test = ref('right');
</script>
