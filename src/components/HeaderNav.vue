<script setup lang="ts">
// TODO: storeができたら以下の１行を削除
const isLoggedIn = true;

const logOutClickHandler = () => {
  console.log('--test: logOutClickHandler clicked');
};
</script>
<template>
  <nav class="">
    <ul>
      <li class="headerLink">
        <NuxtLink to="/"> Home </NuxtLink>
      </li>
      <li class="headerLink">
        <NuxtLink to="/user"> User </NuxtLink>
      </li>
      <li class="headerLink">
        <NuxtLink to="/login"> Login </NuxtLink>
      </li>
      <li class="headerLink">
        <NuxtLink to="/character-info"> Character Info </NuxtLink>
      </li>
      <template v-if="isLoggedIn">
        <li @click="logOutClickHandler()" class="headerLink">✋Log Out</li>
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
