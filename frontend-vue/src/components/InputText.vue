<script lang="ts" setup>
  
  const model = defineModel({
    type: String,
    required: true
  });

</script>
  
<template>
  <input 
      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
      v-model="model"
  >
</template>

<style scoped></style>
