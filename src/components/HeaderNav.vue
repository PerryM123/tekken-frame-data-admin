<script>
export default {
  name: 'HeaderNav',
  data() {
    return {};
  }
};
</script>
<template>
  <nav class="">
    <ul>
      <li>
        <NuxtLink to="/"> Home </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/user"> User </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/login"> Login </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
<style scoped lang="scss">
a {
  color: #1b43ef;
}
</style>
