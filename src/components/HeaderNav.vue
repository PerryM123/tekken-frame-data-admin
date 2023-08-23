<template>
  <nav
    class="fixed top-0 z-20 flex w-full items-center justify-between bg-white p-3 shadow-xl md:fixed"
  >
    <img src="/logo.png" width="60" class="hover:opacity-80" />
    <ul class="flex justify-between">
      <template v-if="isLoggedIn">
        <li @click="logOutClickHandler()" class="hidden md:block">
          <div class="p-3 font-bold hover:cursor-pointer hover:text-green-500">
            ✋Log Out
          </div>
        </li>
        <li class="block md:hidden">
          <div
            class="block p-3 font-bold hover:cursor-pointer hover:text-green-500 md:hidden"
            @click="toggleMenu()"
          >
            Menu
          </div>
          <nav
            class="transition-right fixed bottom-0 right-0 top-[85px] w-[300px] bg-gray-800 p-[20px] text-white duration-500 ease-in-out"
            :class="isMenuOpen ? '' : 'right-[-300px]'"
          >
            <ul class="text-center">
              <li>
                <NuxtLink
                  class="block border-b-2 border-gray-800 py-1 pl-1 align-middle text-white no-underline hover:border-green-500 hover:text-white md:py-3"
                  :to="`${PAGE_URL.HOME}`"
                  @click="toggleMenu()"
                >
                  Home
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  class="block border-b-2 border-gray-800 py-1 pl-1 align-middle text-white no-underline hover:border-green-500 hover:text-white md:py-3"
                  :to="`${PAGE_URL.USER}`"
                  @click="toggleMenu()"
                >
                  User
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  class="block border-b-2 border-gray-800 py-1 pl-1 align-middle text-white no-underline hover:border-green-500 hover:text-white md:py-3"
                  :to="`${PAGE_URL.CHARACTER_INFO}`"
                  @click="toggleMenu()"
                >
                  Character Info
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  class="block border-b-2 border-gray-800 py-1 pl-1 align-middle text-white no-underline hover:border-green-500 hover:text-white md:py-3"
                  :to="`${PAGE_URL.VIDEO_CALL}`"
                  @click="toggleMenu()"
                >
                  ビデオ通話
                </NuxtLink>
              </li>
              <li
                class="block border-b-2 border-gray-800 py-1 pl-1 align-middle text-white no-underline hover:border-green-500 hover:text-white md:py-3"
                @click="logOutClickHandler()"
              >
                Log Out
              </li>
            </ul>
          </nav>
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
<script setup lang="ts">
import { PUBLIC_API_URL } from '~/utils/constants';

const { logout, isLoggedIn } = useUserInfo();
const config = useRuntimeConfig();
const isMenuOpen = ref(false);

const logOutClickHandler = async () => {
  const { $publicApi } = useNuxtApp();
  const { data } = await $publicApi.post(PUBLIC_API_URL.LOGOUT);
  // client側のクッキーを削除
  useCookie(config.public.cookieName).value = null;
  // ログアウト処理を行う
  logout();
  navigateTo(PAGE_URL.LOGIN);
  if (isMenuOpen) {
    toggleMenu();
  }
};
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>
