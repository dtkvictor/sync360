<script lang="ts" setup>
  import DefaultLayout from '@/layouts/DefaultLayout.vue';
  import InfoCard from './partials/InfoCard.vue';
  import userStorage from '@/storage/UserStorage';
  import { ref } from 'vue';
  import { phoneMask } from 'util-mask';
  import DeleteAccount from './partials/DeleteAccount.vue';

  const user = ref(userStorage.getUser());
  const profile = ref(userStorage.getProfile());
  const address = ref(userStorage.getAddress());

  function genderToPortuguese(gender: string) {
    const genders: Record<string, string> = {
      male: 'Masculino',
      famale: 'Feminino',
      other: 'Outro'
    }
    return genders[gender];
  }

  function dateToBrazil(date: string) {
    const pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
    const result = pattern.exec(date);

    if(result) {
      const day = result[3];
      const month = result[2];
      const year = result[1];
      return `${day}/${month}/${year}`;
    }

    return date;
  } 

</script>

<template>
  <DefaultLayout>
    <div class="bg-transparent lg:bg-white flex flex-col lg:flex-row justify-center lg:justify-start items-center lg:items-end rounded-t shadow-none lg:shadow mb-5 lg:p-3">
      <div class="flex justify-center items-center">
          <img :src="profile?.picture" class="w-36 h-36 rounded-full lg:rounded-none bg-white">
      </div>
      <div class="flex flex-col lg:ms-3">
        <h1 class="text-lg text-center lg:text-start text-white lg:text-neutral-900">{{ profile?.name }}</h1>
        <p class="text-center lg:text-start text-white lg:text-neutral-900">{{ user?.email }}</p>
      </div>
    </div>    
    
    <InfoCard title="Sobre mim" route-edit="/profile/update">
      <p>{{ profile?.about_me }}</p>
    </InfoCard>

    <InfoCard title="Informações" route-edit="/profile/update">
        <span><strong>Data Nasc:</strong> {{ dateToBrazil(profile?.birth_date ?? '') }}</span>
        <span><strong>Gênero:</strong> {{ genderToPortuguese(profile?.gender ?? '') }}</span>
        <span><strong>Telefone:</strong> {{ phoneMask(profile?.cell_number) }}</span>        
    </InfoCard>
    
    <InfoCard title="Endereço" route-edit="/address/update">
        <span><strong>Estado:</strong> {{ address?.state}}</span>
        <span><strong>Cidade:</strong> {{ address?.city }}</span>
        <span><strong>Bairro:</strong> {{ address?.neighborhood }}</span>
        <span><strong>Rua:</strong> {{ address?.street }}</span>        
    </InfoCard>
      
    <DeleteAccount></DeleteAccount>
  </DefaultLayout>
</template>
