<script setup lang="ts">
definePageMeta({
  // TODO: 以下のコメントアウトを外すとhydrateの問題が発生
  // middleware: ['auth-perry']
});
</script>
<template>
  <h2>ユーザ情報</h2>
  <Head>
    <Title>User</Title>
  </Head>
  <User />
</template>
