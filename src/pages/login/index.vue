<script setup lang="ts">
// TODO: pluginsの使い道が固まったら以下のコードのコメントアウトを外す
// import { useNuxtApp } from '#app';
const { $axios } = useNuxtApp();
const { data } = await $axios.get('/api/framedata/characters');
console.log('data: ', data);
</script>
<template>
  <LoginArea />
</template>
