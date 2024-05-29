<script lang="ts" setup>
    import GuestLayout from '@/layouts/GuestLayout.vue';
    import InputText from '@/components/InputText.vue';
    import InputError from '@/components/InputError.vue';
    import InputLabel from '@/components/InputLabel.vue';
    import PrimaryButton from '@/components/PrimaryButton.vue';
    import FormContainer from '@/components/FormContainer.vue';

    import { useRouter } from 'vue-router';
    import iziToast from 'izitoast';
    import FormRequest from '@/service/FormRequest';
    import UpdatePasswordValidator from '@/validator/auth/UpdatePasswordValidator';
import Icon from '@/components/Icon.vue';

    const router = useRouter();
    const form = new FormRequest(new UpdatePasswordValidator(), {
        email: '',        
    });

    function submitHandler(event:SubmitEvent): void {        
        event.submitter?.setAttribute('disabled', 'true');
        form.submit({
            url: '/auth/update-password',
            method: 'patch',
            onSuccess() {                
                router.push('/auth/login');
            },
            onError(error) {                
                if(error.response && error.response.status == 500) {
                    iziToast.error({
                        title: 'Falha na autenticação.',
                        message: 'Não foi possível realizar a autenticação, verifique seus dados e tente novamente.'
                    });
                }
            },
            onFinally() {
                event.submitter?.removeAttribute('disabled');
            }
        });        
    }
</script>

<template>
  <GuestLayout>
    <FormContainer class="mt-[-15%]" title="Recuperar" :submitHandler="submitHandler">
        <template v-slot:header>
            <router-link to="/auth/login">
                <Icon name="login"/>
            </router-link>
        </template>
        <div>
            <InputLabel for="code" content="Código"/>
            <InputText v-model.lazy="form.data.code" type="text" placeholder="••••••••" required=""/>
            <InputError :content="form.errors.code"/>
        </div>
        <div>
            <InputLabel for="password" content="Senha"/>
            <InputText v-model.lazy="form.data.password" type="password" name="password" id="password" placeholder="••••••••" required=""/>
            <InputError :content="form.errors.password"/>
        </div>
        <div>
            <InputLabel for="password_confirmation" content="Confirmar Senha"/>
            <InputText v-model.lazy="form.data.password_confirmation" type="password" name="password_confirmation" id="password_confirmation" placeholder="••••••••" required=""/>
            <InputError :content="form.errors.password_confirmation"/>
        </div>
        <PrimaryButton type="submit" class="flex justify-center items-center gap-2">                    
            <span>Redefinir Senha</span>
        </PrimaryButton>        
    </FormContainer>
  </GuestLayout>
</template>
