<script lang="ts" setup>
    import GuestLayout from '@/layouts/GuestLayout.vue';
    import InputText from '@/components/InputText.vue';
    import InputError from '@/components/InputError.vue';
    import InputLabel from '@/components/InputLabel.vue';
    import PrimaryButton from '@/components/PrimaryButton.vue';
    import FormContainer from '@/components/FormContainer.vue';

    import LoginValidator from '@/validator/auth/LoginValidator';
    import userStorage from '@/storage/UserStorage';
    import { useRouter } from 'vue-router';
    import iziToast from 'izitoast';
    import FormRequest from '@/service/FormRequest';
    
    const router = useRouter();
    const form = new FormRequest(new LoginValidator(), {
        email: '',
        password: '',
    });

    function submitHandler(event:SubmitEvent): void {        
        event.submitter?.setAttribute('disabled', 'true');
        form.submit({
            url: '/auth/login',
            method: 'post',
            onSuccess(response) {
                userStorage.setUser(response.data)
                router.push('/');
            },
            onError(error) {                
                if(error.response && error.response.status == 401) {
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
    <FormContainer class="mt-[-15%]" title="Login" :submitHandler="submitHandler">
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
        <div>
            <InputLabel for="password" content="Senha"/>                    
            <InputText 
                v-model.lazy="form.data.password"
                type="password" 
                name="password" 
                id="password" 
                placeholder="••••••••" 
                required="true"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            <InputError :content="form.errors.password"/>
        </div>
        <div class="flex items-center justify-between">
            <div class="flex items-start">
                <div class="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300">
                </div>
                <div class="ml-3 text-sm">
                    <label for="remember" class="text-gray-500">lembre me</label>
                </div>
            </div>
            <a href="/auth/recover-password" class="text-sm font-medium text-primary-600 hover:underline">Esqueceu seu senha?</a>
        </div>
        <PrimaryButton type="submit" class="flex justify-center items-center gap-2">                    
            <span>Login</span>
        </PrimaryButton>
        <p class="text-sm font-light text-gray-500">
            Não tem uma conta ainda? <router-link to="/auth/register" class="font-medium text-primary-600 hover:underline">Registrar</router-link>
        </p>
    </FormContainer>
  </GuestLayout>
</template>
