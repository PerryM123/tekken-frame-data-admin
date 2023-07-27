<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
});
</script>
<template>
  <Head>
    <Title>ビデオ通話</Title>
  </Head>
  <h2>ビデオ通話</h2>
  <VideoCall />
</template>
