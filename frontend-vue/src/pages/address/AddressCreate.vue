<script lang="ts" setup>
    import DefaultLayout from '@/layouts/DefaultLayout.vue';
    import AddressForm from './partials/AddressForm.vue';
</script>
<template>
    <DefaultLayout>
        <div class="flex justify-center lg:h-full lg:items-center">                
            <AddressForm
                url="/address/create"
                method="post"
            />
        </div>
    </DefaultLayout>
</template>