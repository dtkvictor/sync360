<script lang="ts" setup>
    import DefaultLayout from '@/layouts/DefaultLayout.vue';
    import AddressForm from './partials/AddressForm.vue';
    import userStorage from '@/storage/UserStorage';
    
</script>
<template>
    <DefaultLayout>
        <div class="flex justify-center lg:h-full lg:items-center">                
            <AddressForm 
                :address="userStorage.getAddress()"
                url="/address/update"
                method="patch"
            />
        </div>
    </DefaultLayout>
</template>