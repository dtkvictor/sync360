<script lang="ts" setup>
    import GuestLayout from '@/layouts/GuestLayout.vue';
    import InputText from '@/components/InputText.vue';
    import InputError from '@/components/InputError.vue';
    import InputLabel from '@/components/InputLabel.vue';
    import PrimaryButton from '@/components/PrimaryButton.vue';
    import FormContainer from '@/components/FormContainer.vue';
    import Spinner from '@/components/Spinner.vue';
    import Modal from '@/components/Modal.vue';

    import { useRouter } from 'vue-router';
    import iziToast from 'izitoast';
    import FormRequest from '@/service/FormRequest';
    import VerifyEmailValidator from '@/validator/auth/VerifyEmailValidator';
    import { ref } from 'vue';
    import axios from '@/service/axios';
    import userStorage from '@/storage/UserStorage';

    const router = useRouter();

    const form = new FormRequest(new VerifyEmailValidator(), {
        code: '',
    });

    const isSendCode = ref(false);
    const isVerifyCode = ref(false);


    function sendCode() {
        isSendCode.value = true;
        axios.post('/auth/send-email-verification-code')
        .then(() => {
            iziToast.success({
                title: 'Sucesso!',
                message: 'O código de verificação enviado com sucesso.'
            });
        })
        .catch(() => {
            iziToast.error({
                title: 'Error!',
                message: 'Não foi possível enviar o código de verificação, tente novamente mais tarde.'
            })
        })
        .finally(() => {
            isSendCode.value = false;
        })
    }

    function submitHandler(event:SubmitEvent): void {        
        event.submitter?.setAttribute('disabled', 'true');
        form.submit({
            url: '/auth/verify-email',
            method: 'post',
            onRequest() {
                isVerifyCode.value = true;
            },
            onSuccess() {
                const user = userStorage.getUser();
                if(user) {
                    user.email_verified_at = true;
                    userStorage.setUser(user);
                }                
                router.push( { name: 'home.index' } );
            },
            onError(error) {
                if(error.response && error.response.status == 500) {
                    iziToast.error({
                        title: 'Error de comunicação.',
                        message: 'Ocorreu uma falha durente a comunicação com nossos servidores, tente novamente mais tarde.'
                    });
                }
            },
            onFinally() {                
                event.submitter?.removeAttribute('disabled');
                isVerifyCode.value = false;
            }
        });        
    }
</script>

<template>
  <GuestLayout>      
    <Modal :show="isSendCode" >
        <div class="flex justify-center items-center p-3 gap-1">
            <Spinner class="w-4 h-4" />        
            <span>Enviando...</span>                
        </div>
    </Modal>
    <FormContainer class="mt-[-15%]" title="Verificar email" :submitHandler="submitHandler">
        <div class="rounded bg-yellow-100 w-full p-3 shadow">            
            Informe o código de segurança que foi enviado para seu email.
        </div>
        <div class="pb-3">
            <InputLabel for="code" content="Código de segurança"/>                    
            <InputText 
                v-model.lazy="form.data.code"
                type="string"  
                id="code" 
                placeholder="********" 
                required="true"                        
            />
            <InputError :content="form.errors.code"/>
        </div>      

        <a class="underline cursor-pointer" @click="sendCode">Receber código</a>
        <PrimaryButton type="submit" class="flex justify-center items-center gap-2 mt-0" :disabled="isVerifyCode">
            <div class="flex justify-center items-center gap-2" v-if="isVerifyCode">
                <Spinner />                        
                <span>Verificando...</span>
            </div>
            <span v-else>Verificar email</span>
        </PrimaryButton>                
    </FormContainer>    
  </GuestLayout>
</template>
