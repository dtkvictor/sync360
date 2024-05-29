<script lang="ts" setup>
  defineProps({
    class: String,    
    name: String,
  });
</script>

<template>
  <span :class="'material-icons ' + $props.class" translate="no">{{ name }}</span>
</template>
