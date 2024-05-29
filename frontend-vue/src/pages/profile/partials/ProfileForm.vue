<script lang="ts" setup>
    import { unPhoneMask } from 'util-mask';
    import ProfileValidator from '@/validator/ProfileValidator';
    import userStorage from '@/storage/UserStorage';    
    import { useRouter } from 'vue-router';

    import FormRequest from '@/service/FormRequest';
    import InputError from '@/components/InputError.vue';
    import InputImage from '@/components/InputImage.vue';
    import InputLabel from '@/components/InputLabel.vue';
    import InputText from '@/components/InputText.vue';
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
        profile: {
            type: Object,
            required: false,
            default: {                
                picture: '',                
                name: '',
                birth_date: '',
                gender: '',
                cell_number: '',
                about_me: '',
            }
        },
        resetOnSuccess: Boolean,
        onSuccess: Function,
        onError: Function,
    });

    const form = new FormRequest(new ProfileValidator(), {...props.profile});

    function submitHandler(event:SubmitEvent): void {        
        event.submitter?.setAttribute('disabled', 'true');                    
        form.setData('cell_number', unPhoneMask(form.data.cell_number));
        form.setData('_method', props.method);

        form.submit({
            url: props.url,
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onSuccess(response) {
                if(props.onSuccess) props.onSuccess();
                userStorage.setProfile(response.data);            
                router.push('/');
            },
            onError(error) {
                console.log(error);
                if(props.onError) props.onError();
            },
            onFinally() {
                event.submitter?.removeAttribute('disabled');
            },
        });
    }    
</script>

<template>  
    <div class="w-full bg-white rounded-lg md:shadow md:mt-0 sm:max-w-xl xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div class="flex justify-between items-center">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Perfil
                </h1>
                <router-link to="/" class="p-1 rounded border flex items-center active:scale-75">
                    <Icon name="arrow_back" />
                </router-link>
            </div>
            <form class="space-y-4 md:space-y-6" @submit.prevent="(event) => submitHandler(event as SubmitEvent)">
                <div>
                    <InputLabel for="picture" content="Foto"/>                    
                    <InputImage 
                        img-class="w-24 h-24"
                        name="picture"
                        :default=form.data.picture                    
                        @binary-file="(event:any) => form.data.picture = event"
                    />
                    <InputError :content="form.errors.picture" />
                </div>
                <div>
                    <InputLabel for="name" content="Nome"/>                    
                    <InputText 
                        v-model.lazy="form.data.name" 
                        type="text" 
                        name="name" 
                        id="name"                         
                        required="true"                        
                    />
                    <InputError :content="form.errors.name" />
                </div>
                <div>
                    <InputLabel for="birth_date" content="Data de Nasc"/>                    
                    <InputText 
                        v-model.lazy="form.data.birth_date"
                        type="date" 
                        name="birth_date" 
                        id="birth_date"                         
                        required="true"            
                    />
                    <InputError :content="form.errors.birth_date"/>
                </div>                
                <div>
                    <InputLabel for="gender" content="Gênero"/>                    
                    <select v-model.lazy="form.data.gender" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                        <option value="male">Masculino</option>
                        <option value="famale">Feminino</option>
                        <option value="other">Outro</option>
                    </select>                    
                    <InputError :content="form.errors.birth_date"/>
                </div>                
                <div>
                    <InputLabel for="cell_number" content="Número de celular:"/>
                    <InputText 
                        v-utilMask:phoneMask
                        v-model.lazy="form.data.cell_number"
                        type="text"                                                 
                        required="true"            
                        autocomplete="tel-national"
                    />
                    <InputError :content="form.errors.cell_number"/>
                </div>                
                <div>
                    <InputLabel for="about_me" content="Sobre mim"/>                    
                    <textarea v-model.lazy="form.data.about_me" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" ></textarea>
                    <InputError :content="form.errors.about_me"/>
                </div>                
                <PrimaryButton type="submit" class="flex justify-center items-center gap-2">                    
                    <span>Salvar</span>
                </PrimaryButton>                
            </form>
        </div>
    </div>
</template>
