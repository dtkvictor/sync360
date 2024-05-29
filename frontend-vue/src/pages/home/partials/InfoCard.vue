<script lang="ts" setup>
    import Icon from '@/components/Icon.vue';
    
    defineProps({
        title: String,
        routeEdit: String
    });
</script>
<template>
    <div class="flex flex-col w-full shadow bg-white rounded p-3 mb-5">
        <div class="flex justify-between mt-1">
            <p class="font-bold">{{ title }}</p>
            <router-link :to="routeEdit ?? ''">
                <Icon name="edit"/>
            </router-link>
        </div>
        <hr>
        <div class="ps-3 flex flex-col mt-1">
            <slot></slot>
        </div>
    </div>
</template>