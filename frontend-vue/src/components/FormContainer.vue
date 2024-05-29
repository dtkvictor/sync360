<script lang="ts" setup>
    const props = defineProps({
        title: String,
        submitHandler: Function,
        class: String,
    });
</script>

<template>
    <div :class="'w-[95%] bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 '+props.class">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div class="flex justify-between">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    {{ title }}
                </h1>
                <slot name="header"></slot>                
            </div>
            <form class="space-y-4 md:space-y-6" @submit.prevent="(event) => submitHandler ? submitHandler(event) : false">
                <slot></slot>
            </form>
        </div>
    </div>
</template>