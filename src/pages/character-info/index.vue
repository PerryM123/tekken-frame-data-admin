<template>
  <Head>
    <Title>Characters Info</Title>
  </Head>
  <AdminPanel />
  <div class="mt-[100px] px-5 md:ml-[230px] md:mt-[120px] md:px-0">
    <h2
      class="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl"
    >
      Character Info
    </h2>
    <ClientOnly>
      <template #fallback>
        <img src="loading.gif" />
      </template>
      <CharactersInfo />
    </ClientOnly>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  middleware: ['auth-perry']
});
</script>
