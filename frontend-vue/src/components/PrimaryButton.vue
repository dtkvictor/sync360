<script lang="ts" setup>  
  defineProps({
      disabled: {
          type: Boolean,
          default: false
      }
  });
</script>

<template>
  <button 
    class="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    :disabled="disabled"    
  >
      <slot></slot>
  </button>
</template>
