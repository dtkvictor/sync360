<script setup lang="ts">
  const props = defineProps({
    class: String
  });
</script>
<template>
  <div :class="`border-gray-300 w-3 h-3 animate-spin rounded-full border-2 border-t-blue-600 ${props.class}`"></div>
</template>