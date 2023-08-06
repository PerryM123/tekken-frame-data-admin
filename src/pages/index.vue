<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUserMeStore } from '~/store/userMe';
const userMeStore = useUserMeStore();
const { name } = storeToRefs(userMeStore);
</script>
<template>
  <Head>
    <Title>Home</Title>
  </Head>
  <AdminPanel />
  <div class="ml-[230px] mt-[120px]">
    <h2>Welcome, {{ name }}</h2>
  </div>
</template>
