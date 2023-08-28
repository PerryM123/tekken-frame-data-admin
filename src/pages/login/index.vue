<template>
  <Head>
    <Title>Login</Title>
  </Head>
  <LoginArea />
</template>
<script lang="ts" setup>
definePageMeta({
  middleware: ['login-page-redirect']
});
</script>
