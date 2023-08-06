<template>
  <Head>
    <Title>Characters Info</Title>
  </Head>
  <AdminPanel />
  <div class="ml-[230px] mt-[120px]">
    <h2>Character Info</h2>
    <ClientOnly>
      <template #fallback>
        <img src="loading.gif" />
      </template>
      <CharactersInfo />
    </ClientOnly>
  </div>
</template>
