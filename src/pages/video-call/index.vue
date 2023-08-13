<script setup lang="ts">
definePageMeta({
  middleware: ['auth-perry']
});
</script>
<template>
  <Head>
    <Title>ビデオ通話</Title>
  </Head>
  <AdminPanel />
  <div class="ml-[230px] mt-[120px]">
    <h2
      class="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl"
    >
      ビデオ通話
    </h2>
    <VideoCall />
  </div>
</template>
