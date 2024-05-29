<script lang="ts" setup>
    import AddressValidator from '@/validator/AddressValidator';
    import userStorage from '@/storage/UserStorage';    
    import { useRouter } from 'vue-router';
    import FormRequest from '@/service/FormRequest';

    import InputText from '@/components/InputText.vue';
    import InputError from '@/components/InputError.vue';
    import InputLabel from '@/components/InputLabel.vue';
    import PrimaryButton from '@/components/PrimaryButton.vue';
    import Icon from '@/components/Icon.vue';

    const router = useRouter();

    const props = defineProps({
        url: {
            type: String,
            required: true,
        },
        method: {
            type: String,
            required: true,
            default: 'post'
        },
        address: {
            type: Object,
            required: false,            
            default: {                                                
                state: '',
                city: '',
                neighborhood: '',
                street: '',                
            }
        },
        resetOnSuccess: Boolean,
        onSuccess: Function,
        onError: Function,
    })

    const form = new FormRequest(new AddressValidator(), {...props.address});

    function submitHandler(event:SubmitEvent): void {        
        event.submitter?.setAttribute('disabled', 'true');               

        form.setData('_method', props.method);     
        form.submit({
            url: props.url,
            method: props.method,
            onSuccess(response) {
                if(props.onSuccess) props.onSuccess(); 
                userStorage.setAddress(response.data)
                router.push('/');
            },
            onError() {
                if(props.onError) props.onError();
            },
            onFinally() {
                event.submitter?.removeAttribute('disabled');
            },
        });

        if(props.resetOnSuccess) {
            form.resetData();            
        }
    }
</script>

<template>  
    <div class="w-full bg-white rounded-lg md:shadow md:mt-0 sm:max-w-xl xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div class="flex justify-between items-center">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Endereço
                </h1>
                <router-link to="/" class="p-1 rounded border flex items-center active:scale-75">
                    <Icon name="arrow_back" />
                </router-link>
            </div>
            <form class="space-y-4 md:space-y-6" @submit.prevent="(event) => submitHandler(event as SubmitEvent)">                                          
                <div>
                    <InputLabel for="states" content="Estado"/>                    
                    <InputText 
                        v-model.lazy="form.data.state" 
                        type="text"                         
                        required="true"                        
                    />
                    <InputError :content="form.errors.state" />
                </div>                                
                <div>
                    <InputLabel for="city" content="Cidade"/>                    
                    <InputText 
                        v-model.lazy="form.data.city" 
                        type="text"                                          
                        required="true"                        
                    />
                    <InputError :content="form.errors.city" />
                </div>                                                
                <div>
                    <InputLabel for="neighborhood" content="Bairro"/>
                    <InputText 
                        v-model.lazy="form.data.neighborhood" 
                        type="text"                                  
                        required="true"                        
                    />
                    <InputError :content="form.errors.neighborhood" />
                </div>                                
                <div>
                    <InputLabel for="street" content="Rua"/>                    
                    <InputText 
                        v-model.lazy="form.data.street" 
                        type="text"                                          
                        required="true"                        
                    />
                    <InputError :content="form.errors.street" />
                </div>            

                <PrimaryButton type="submit" class="flex justify-center items-center gap-2">                    
                    <span>Salvar</span>
                </PrimaryButton>                
            </form>
        </div>
    </div>
</template>
