<template>
  <div
    class="fixed bottom-0 z-10 h-16 w-full bg-gray-800 shadow-xl md:h-screen md:w-48"
  >
    <div
      class="content-center justify-between text-left md:fixed md:left-0 md:top-10 md:mt-12 md:w-48 md:content-start"
    >
      <ul
        class="list-reset flex flex-row px-1 py-0 text-center md:flex-col md:px-2 md:py-3 md:text-left"
      >
        <li class="mr-3 flex-1">
          <NuxtLink
            :class="styleCurrentPage(isHomePage)"
            :to="`${PAGE_URL.HOME}`"
          >
            Home
          </NuxtLink>
        </li>
        <li class="mr-3 flex-1">
          <NuxtLink
            :class="styleCurrentPage(isUserPage)"
            :to="`${PAGE_URL.USER}`"
          >
            User
          </NuxtLink>
        </li>
        <li class="mr-3 flex-1">
          <NuxtLink
            :class="styleCurrentPage(isCharacterInfoPage)"
            :to="`${PAGE_URL.CHARACTER_INFO}`"
          >
            Character Info
          </NuxtLink>
        </li>
        <li class="mr-3 flex-1">
          <NuxtLink
            :class="styleCurrentPage(isVideoCallPage)"
            :to="`${PAGE_URL.VIDEO_CALL}`"
          >
            ビデオ通話
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import useCurrentPage from '~/composables/useCurrentPage';

const styleCurrentPage = (isCurrentPage: boolean) => {
  return `${generalStyle} ${isCurrentPage ? 'border-pink-500 text-white' : ''}`;
};
const { isHomePage, isUserPage, isCharacterInfoPage, isVideoCallPage } =
  useCurrentPage();
const generalStyle =
  'block border-b-2 border-gray-800 py-1 pl-1 align-middle text-white no-underline hover:border-green-500 hover:text-white md:py-3';
</script>
<style scoped lang="scss"></style>
