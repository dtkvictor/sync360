<script lang="ts" setup>
    import DefaultLayout from '@/layouts/DefaultLayout.vue';
    import ProfileForm from './partials/ProfileForm.vue';   
    import userStorage from '@/storage/UserStorage';
    import iziToast from 'izitoast';

    const profile = userStorage.getProfile();

    function onSuccess() {
        setTimeout(() => {
            iziToast.success({
                title: 'Atualização:',
                message: 'Os seus dados foram atualizados com êxito.'
            })
        }, 500);
    }

    function onError() {
        setTimeout(() => {
            iziToast.error({
                title: 'Error!',
                message: 'Ocorreu um erro durante a persistência dos dados, tente novamente mais tarde.'
            })
        }, 500);
    }

</script>
<template>
    <DefaultLayout>
        <div class="flex justify-center lg:h-full lg:items-center">                
            <ProfileForm 
                url="/profile/update"
                method="patch"
                :profile="profile"
                :on-success="onSuccess"
                :on-error="onError"
            />            
        </div>
    </DefaultLayout>
</template>