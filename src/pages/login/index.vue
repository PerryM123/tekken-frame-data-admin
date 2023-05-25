<script setup lang="ts">
// const { $api } = useNuxtApp();
// const { $api1 } = useNuxtApp();
const { $api2, $publicApi } = useNuxtApp();
const { $hoge, $msg } = useNuxtApp();
const { $config } = useNuxtApp();
// console.log('$api1: ', $api1);
// console.log('$api2: ', $api2);
const { data } = await $publicApi.get('/api/framedata/characters');
console.log('data: ', data);
</script>

<template>
  <LoginArea />
</template>
