<script>
export default {
  name: 'HeaderNav',
  data() {
    return {};
  }
};
</script>
<template>
  <nav class="flex items-center justify-between p-3 shadow-xl">
    <img src="/logo.png" width="60" class="hover:opacity-80" />
    <ul class="flex justify-between">
      <li>
        <NuxtLink to="/" class="p-3 font-bold hover:text-green-500">
          Home
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/user" class="p-3 font-bold hover:text-green-500">
          User
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/login" class="p-3 font-bold hover:text-green-500">
          Login
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/character-info"
          class="p-3 font-bold hover:text-green-500"
        >
          Character Info
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
