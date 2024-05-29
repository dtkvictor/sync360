<script lang="ts" setup>

    defineProps({
    content: {
      type: String,
      required: false,      
      default: '',
    },
    for: {
      type: String,
      required: false,      
      default: '',
    },
    class: {
      type: String,
      required: false,      
      default: '',
    },
    style: {
      type: String,
      required: false,
      default: '',
    }
  });

</script>

<template>
  <label 
    :for="$props.for" 
    :class="'block mb-2 text-sm font-medium text-gray-900 ' + $props.class"
    :style="style"
    >{{ content }}
  </label>
</template>
