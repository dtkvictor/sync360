<script lang="ts" setup>
  defineProps({
    content: String
  });
</script>

<template>
  <small class="text-red-500">{{ content }}</small>
</template>
