<script lang="ts" setup>
    import { useRouter } from 'vue-router';
    import { ref, Ref } from 'vue';
    import iziToast from 'izitoast';
    import FormRequest from '@/service/FormRequest';
    import userStorage from '@/storage/UserStorage';
    import DeleteAccountValidator from '@/validator/DeleteAccountValidator';
    import DangerButton from '@/components/DangerButton.vue';
    import InputText from '@/components/InputText.vue';
    import Icon from '@/components/Icon.vue';
    import Modal from '@/components/Modal.vue';
    

    const router = useRouter();

    const form = new FormRequest(new DeleteAccountValidator(), {
        password: '',
    });

    let modalDeleteAccount:Ref<boolean> = ref(false);

    function showModalDeleteAccount() {
        modalDeleteAccount.value = true;
    }

    function closeModalDeleteAccount() {
        modalDeleteAccount.value = false;
    }

    function submitHandler(event: SubmitEvent) {
        event.submitter?.setAttribute('disabled', 'true');

        form.submit({
            url: '/user/delete',
            method: 'delete',
            onSuccess() {
                setTimeout(() => {
                    iziToast.success({
                        title: 'Conta excluida',
                        message: 'A sua conta foi excluida com sucesso.'
                    })
                }, 1000);
                userStorage.delete();
                router.push('/auth/login');
            },
            onError() {                
                iziToast.error({
                    title: 'Sem autorização.',
                    message: 'Não foi possível deletar essa conta, verifique seus dados e tente novamente.'
                });                
            },
            onFinally() {
                event.submitter?.removeAttribute('disabled')
            }
        });
    }
  
</script>

<template>
    <Modal :show="modalDeleteAccount">
        <div class="bg-neutral-200 flex justify-between items-center p-3">
            <span>Excluir Conta</span>        
            <Icon name="close" class="cursor-pointer" @click="closeModalDeleteAccount"/>
        </div>
        <div class="w-full bg-white p-3">
            <div class="rounded bg-red-500 text-red-100 p-3 flex flex-col">
                <div class="flex items-center gap-1">
                    <Icon name="warning"/>
                    <strong>Ação Irreversível</strong>
                </div>          
                <hr>
                <p class="p-3">
                    Por favor, esteja ciente de que a ação que você está prestes a realizar não pode ser <strong>desfeita</strong>.
                    Deseja mesmo continuar?
                </p>
            </div>
        </div>
        <div class="w-full bg-white px-3 pb-3">
            <form class="w-full flex gap-1" @submit.prevent="(event: Event) => submitHandler(event as SubmitEvent)">
                <InputText v-model.lazy="form.data.password" type="password" placeholder="Sua senha..." class="w-[80%]"/>        
                <DangerButton style="width: 100px;">
                    Excluir
                </DangerButton>
            </form>
        </div>
    </Modal>
    <div class="py-5">
        <DangerButton @click="showModalDeleteAccount">Deleter conta</DangerButton>
    </div>    
</template>