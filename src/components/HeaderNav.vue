<script setup lang="ts">
const { remove } = await useSession();
const { logout, isLoggedIn } = useUserInfo();
const logOutClickHandler = () => {
  remove();
  logout();
};
</script>
<template>
  <nav>
    <ul>
      <li class="headerLink">
        <NuxtLink :to="`${PAGE_URL.HOME}`"> Home </NuxtLink>
      </li>
      <li class="headerLink">
        <NuxtLink :to="`${PAGE_URL.USER}`"> User </NuxtLink>
      </li>
      <li class="headerLink">
        <NuxtLink :to="`${PAGE_URL.CHARACTER_INFO}`"> Character Info </NuxtLink>
      </li>
      <li class="headerLink">
        <NuxtLink :to="`${PAGE_URL.VIDEO_CALL}`"> ビデオ通話 </NuxtLink>
      </li>
      <template v-if="isLoggedIn">
        <li @click="logOutClickHandler()" class="headerLink">✋Log Out</li>
      </template>
      <template v-else>
        <li class="headerLink">
          <NuxtLink :to="`${PAGE_URL.LOGIN}`"> 👍Login </NuxtLink>
        </li>
      </template>
    </ul>
  </nav>
</template>
<style scoped lang="scss">
.headerLink,
a {
  color: #1b43ef;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
}
</style>
