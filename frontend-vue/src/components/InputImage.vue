<template>                                   
    <div>
        <label :for="name" class="flex flex-wrap justify-center items-center mb-1">
            <img :src="getImage" alt="picture" :class="['cursor-pointer shadow flex justify-center items-center border', getImgCssClass]">
        </label>
        <input type="file" :name="name" :id="name" class="file" @change="loadFile" accept="image/png, image/jpeg">
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

    const props = defineProps({
        name: String,
        default: String,
        imgClass: String
    });

    const getImage = computed(() => {
        if(url.value === null || url.value === '') return props.default;
        return url.value as string;
    });

    const getImgCssClass = computed(() => {
        return props.imgClass ?? 'w-20 h-20 rounded-full';
    });

    const emits = defineEmits(['binaryFile', 'clearImage']);
    const url = ref<string|ArrayBuffer|null>(null);

    function loadFile(event: Event) {
        let file = (event.target as HTMLInputElement).files;
        if(file) {
            let fileReader = new FileReader();
            fileReader.onload = (event) => {    
                if(event.target)  {
                    url.value = event.target.result;
                }                   
            }
            fileReader.readAsDataURL(file[0]);
            emits('binaryFile', file[0]);
            emits('clearImage', clearImage);
        }
    }

    function clearImage() {
        url.value = null;
    }
</script>