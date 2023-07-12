<template>
  <Head>
    <Title>Characters Info</Title>
  </Head>

  <div>
    <h2>Character Info</h2>
    <ClientOnly>
      <template #fallback>
        <img src="loading.gif" />
      </template>
      <CharactersInfo />
    </ClientOnly>
  </div>
</template>
