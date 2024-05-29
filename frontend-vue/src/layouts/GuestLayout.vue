<template>
  <div class="flex flex-col w-full h-full bg-gradient-to-br from-sky-500 to-sky-200">
    <header class="flex justify-start items-center bg-transparent p-5">
      <div class="text-white text-2xl">
        <span class="font-bold">SYNC</span>
        <span>360</span>
      </div>    
    </header>

    <main class="w-full min-h-[75%] bg-transparent flex justify-center items-center">
    <slot></slot>
    </main>
  </div>
</template>
