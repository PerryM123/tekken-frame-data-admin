<script setup lang="ts">
// const { $api } = useNuxtApp();
// const { $api1 } = useNuxtApp();
const { $api2 } = useNuxtApp();
const { $hoge, $msg } = useNuxtApp();
const { $config } = useNuxtApp();
// console.log('$api1: ', $api1);
// console.log('$api2: ', $api2);
const { data } = await $api2.get('/api/v1/characters/Jin-copy1');
console.log('data: ', data);
</script>

<template>
  <LoginArea />
</template>
