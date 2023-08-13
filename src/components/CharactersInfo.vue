<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCharacterInfoStore } from '~/store/characterInfo';
import { Ref, ref } from 'vue';
import { ICharacterInfoData } from '~/interface/ICharacterInfo';

const { $publicApi } = useNuxtApp();
const characterInfoStore = useCharacterInfoStore();
const { setCharacterInfo, setIsLoaded } = characterInfoStore;
const { characterInfo, isLoaded } = storeToRefs(characterInfoStore);
if (!isLoaded.value) {
  // TODO: もしAPI通信エラーなどが発生する場合、どこでcatchされるか確認必須
  const response = await $publicApi.get<ICharacterInfoData[]>(
    '/api/framedata/characters'
  );
  setCharacterInfo(response.data);
  setIsLoaded(true);
}
</script>
<template>
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
<style scoped lang="scss">
.characterItem {
  border-top: 1px black solid;
}

.characterName {
  font-weight: bold;
}
</style>
