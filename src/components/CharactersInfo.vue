<script setup lang="ts">
import { Ref, ref } from 'vue';
type ICharacterInfoApi = {
  data: ICharacterInfoData[];
};
type ICharacterInfoData = {
  name: string;
  is_complete: boolean;
};
const { $publicApi } = useNuxtApp();
const pageDataRef: Ref = ref(null);
// TODO: もしAPI通信エラーなどが発生する場合、どこでcatchされるか確認必須
const { data }: ICharacterInfoApi = await $publicApi.get(
  '/api/framedata/characters'
);
pageDataRef.value = data;
console.log('pageDataRef: ', pageDataRef.value);
</script>
<template>
  <div v-for="(item, key) in pageDataRef" :key="key" class="characterItem">
    <p><span class="characterName">Name:</span> {{ item.name }}</p>
    <p>
      <span class="characterName">Is Complete:</span>
      {{ Boolean(item.is_complete) }}
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
