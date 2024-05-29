<script lang="ts" setup>
  import userStorage from '@/storage/UserStorage';
  import { useRouter } from 'vue-router';
  import Icon from '@/components/Icon.vue';

  const router = useRouter();

  function logoutHandler() {
    userStorage.delete();
    router.push('/auth/login');
  }
</script>

<template>
  <header class="flex justify-between items-center bg-sky-500 lg:shadow-lg lg:shadow-neutral-300 p-5">
    <div class="text-white text-2xl">
      <span class="font-bold">SYNC</span>
      <span>360</span>
    </div>
    <nav>
      <button @click="logoutHandler">
        <Icon class="text-white drop-shadow-md hover:text-red-400 active:scale-75" name="logout"/>
      </button>
    </nav>
  </header>
  <main class="w-full min-h-full bg-neutral-100 flex justify-center">
    <div class="w-full lg:w-8/12 xl:w-7/12 bg-gradient-to-b from-sky-500 to-white p-5 lg:from-neutral-100 lg:to-neutral-100">
      <slot />
    </div>
  </main>
</template>
