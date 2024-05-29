<script lang="ts" setup>
    import DefaultLayout from '@/layouts/DefaultLayout.vue';
    import ProfileForm from './partials/ProfileForm.vue';
    import iziToast from 'izitoast';

    function onSuccess() {
        setTimeout(() => {
            iziToast.success({
                title: 'Sucesso!',
                message: 'Os seus dados foram criados com êxito.'
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
                url="/profile/create"
                method="post"    
                :reset-on-success="true"
                :on-success="onSuccess"
                :on-error="onError"
            />
        </div>
    </DefaultLayout>
</template>