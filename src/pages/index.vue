<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUserMeStore } from '~/store/userMe';
const userMeStore = useUserMeStore();
const { name } = storeToRefs(userMeStore);
definePageMeta({
  middleware: ['auth-perry']
});
</script>
<template>
  <Head>
    <Title>Home</Title>
  </Head>
  <AdminPanel />
  <div class="mt-[100px] px-5 md:ml-[230px] md:mt-[120px] md:px-0">
    <h2
      class="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl"
    >
      Welcome, {{ name }}
    </h2>
  </div>
</template>
