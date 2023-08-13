<script setup lang="ts">
const { logout, isLoggedIn } = useUserInfo();
const config = useRuntimeConfig();

const logOutClickHandler = async () => {
  const { $publicApi } = useNuxtApp();
  const { data } = await $publicApi.post('/api/logout');
  // client側のクッキーを削除
  useCookie(config.public.cookieName).value = null;
  logout();
};
</script>
<template>
  <nav
    class="fixed top-0 z-20 flex w-full items-center justify-between bg-white p-3 shadow-xl md:fixed"
  >
    <img src="/logo.png" width="60" class="hover:opacity-80" />
    <ul class="flex justify-between">
      <template v-if="isLoggedIn">
        <li @click="logOutClickHandler()">
          <div class="p-3 font-bold hover:cursor-pointer hover:text-green-500">
            ✋Log Out
          </div>
        </li>
      </template>
      <template v-else>
        <li>
          <NuxtLink :to="`${PAGE_URL.LOGIN}`">
            <div
              class="p-3 font-bold hover:cursor-pointer hover:text-green-500"
            >
              👍Login
            </div>
          </NuxtLink>
        </li>
      </template>
    </ul>
  </nav>
</template>
