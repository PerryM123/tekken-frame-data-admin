<script setup lang="ts">
definePageMeta({
  middleware: ['auth-perry']
});
</script>
<template>
  <h2>ユーザ情報</h2>
  <Head>
    <Title>User</Title>
  </Head>
  <User />
</template>
