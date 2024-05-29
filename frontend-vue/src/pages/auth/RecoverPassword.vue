<script lang="ts" setup>
    import GuestLayout from '@/layouts/GuestLayout.vue';
    import InputText from '@/components/InputText.vue';
    import InputError from '@/components/InputError.vue';
    import InputLabel from '@/components/InputLabel.vue';
    import PrimaryButton from '@/components/PrimaryButton.vue';
    import FormContainer from '@/components/FormContainer.vue';
    import Spinner from '@/components/Spinner.vue';

    import { useRouter } from 'vue-router';
    import iziToast from 'izitoast';
    import FormRequest from '@/service/FormRequest';
    import RecoverPasswordValidator from '@/validator/auth/RecoverPasswordValidator';
    import { ref } from 'vue';

    const router = useRouter();
    const form = new FormRequest(new RecoverPasswordValidator(), {
        email: '',        
    });
    const isSendCode = ref(false);

    function submitHandler(event:SubmitEvent): void {        
        event.submitter?.setAttribute('disabled', 'true');
        form.submit({
            url: '/auth/recover-password',
            method: 'post',
            onRequest() {
                isSendCode.value = true;
            },
            onSuccess() {
                router.push('/auth/update-password');
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
                isSendCode.value = false;
            }
        });        
    }
</script>

<template>
  <GuestLayout>      
    <FormContainer class="mt-[-15%]" title="Recuperar" :submitHandler="submitHandler">
        <div class="rounded bg-yellow-100 w-full p-3 shadow">            
            Após solicitar a recuperação de senha, um código será enviado para o seu e-mail, caso este seja válido.        
        </div>
        <div>
            <InputLabel for="email" content="Email"/>                    
            <InputText 
                v-model.lazy="form.data.email" 
                type="email" 
                name="email" 
                id="email" 
                placeholder="seu@email.com" 
                required="true"                        
            />
            <InputError :content="form.errors.email" />
        </div>
        <PrimaryButton type="submit" class="flex justify-center items-center gap-2" :disabled="isSendCode">
            <div class="flex justify-center items-center gap-2" v-if="isSendCode">
                <Spinner />                        
                <span>Enviando...</span>
            </div>
            <span v-else>Receber código</span>
        </PrimaryButton>                
    </FormContainer>    
  </GuestLayout>
</template>
