<script lang="ts" setup>
    import GuestLayout from '@/layouts/GuestLayout.vue';
    import InputText from '@/components/InputText.vue';
    import InputError from '@/components/InputError.vue';
    import InputLabel from '@/components/InputLabel.vue';
    import PrimaryButton from '@/components/PrimaryButton.vue';
    import FormContainer from '@/components/FormContainer.vue';
    
    import RegisterValidator from '@/validator/auth/RegisterValidator';
    import userStorage from '@/storage/UserStorage';
    import { useRouter } from 'vue-router';
    import FormRequest from '@/service/FormRequest';

    import { ref } from 'vue';

    const router = useRouter();
    const isSendCode = ref(false);

    const form = new FormRequest(new RegisterValidator(), {
        email: '',
        password: '',
        password_confirmation: ''
    });

    function submitHandler(event:SubmitEvent): void {        
        event.submitter?.setAttribute('disabled', 'true');
        form.submit({
          url: '/auth/register',
          method: 'post',
          onRequest() {
            isSendCode.value = true;
          },
          onSuccess(response) {
            userStorage.setUser(response.data)
            router.push('/');
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
    <FormContainer class="mt-[-15%]" title="Registrar" :submitHandler="submitHandler">
      <div>
        <InputLabel for="email" content="Email"/>                    
        <InputText v-model.lazy="form.data.email" type="email" name="email" id="email" placeholder="seu@email.com" required=""/>
        <InputError :content="form.errors.email"/>
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
      <PrimaryButton type="submit" class="flex justify-center items-center gap-2" :disabled="isSendCode">
            <div class="flex justify-center items-center gap-2" v-if="isSendCode">
                <Spinner />                        
                <span>Registrando...</span>
            </div>
            <span v-else>Registrar</span>
        </PrimaryButton>
      <p class="text-sm font-light text-gray-500">                
        Já possui uma conta? <router-link to="/auth/login" class="font-medium text-primary-600 hover:underline">Login</router-link>
      </p>
    </FormContainer>
  </GuestLayout>
</template>
