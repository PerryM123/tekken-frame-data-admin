<script setup lang="ts">
type ICharacterInfoApi = {
  data: ICharacterInfoData[];
};
type ICharacterInfoData = {
  name: string;
  is_complete: boolean;
};
const { $publicApi } = useNuxtApp();
const { data }: ICharacterInfoApi = await $publicApi.get(
  '/api/framedata/characters'
);
console.log('data: ', data);
</script>
<template>
  <div>
    <h2>Character Info</h2>
    <div v-for="(item, key) in data" :key="key" class="characterItem">
      <p><span class="characterName">Name:</span> {{ item.name }}</p>
      <p>
        <span class="characterName">Is Complete:</span>
        {{ Boolean(item.is_complete) }}
      </p>
    </div>
  </div>
</template>
<style scoped lang="scss">
a {
  color: #1b43ef;
}
.characterItem {
  border-top: 1px black solid;
}

.characterName {
  font-weight: bold;
}
</style>
