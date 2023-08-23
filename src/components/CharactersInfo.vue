<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCharacterInfoStore } from '~/store/characterInfo';
import { ref } from 'vue';
import { ICharacterInfoData } from '~/interface/ICharacterInfo';
import { PUBLIC_API_URL } from '~/utils/constants';
import axios from 'axios';

const { $publicApi } = useNuxtApp();
const characterInfoStore = useCharacterInfoStore();
const { setCharacterInfo, setIsLoaded } = characterInfoStore;
const { characterInfo, isLoaded } = storeToRefs(characterInfoStore);
const isError = ref(false);
const errorMessage = ref('');
if (!isLoaded.value) {
  try {
    const response = await $publicApi.get<ICharacterInfoData[]>(
      PUBLIC_API_URL.CHARACTERS
    );
    setCharacterInfo(response.data);
    setIsLoaded(true);
  } catch (error) {
    isError.value = true;
    if (axios.isAxiosError(error)) {
      errorMessage.value = `キャラクタ情報取得できませんでした (${error.response?.data?.data?.errorCode})`;
    }
  }
}
</script>
<template>
  <template v-if="isError">
    <div>{{ errorMessage }}</div>
  </template>
  <template v-else>
    <div v-for="(item, key) in characterInfo" :key="key" class="characterItem">
      <p><span class="characterName">Name:</span> {{ item.name }}</p>
      <p>
        <span class="characterName">Is Complete:</span>
        {{ Boolean(item.isComplete) }}
      </p>
      <p>
        <span class="characterName">description:</span> {{ item.description }}
      </p>
    </div>
  </template>
</template>
<style scoped lang="scss">
.characterItem {
  border-top: 1px black solid;
}

.characterName {
  font-weight: bold;
}
</style>
