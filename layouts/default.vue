<template>
  <div>
    <HeaderNav />
    <Nuxt />
  </div>
</template>

<script>
// TODO: 以下の1行目をエリアスに変更
import HeaderNav from '../components/HeaderNav.vue'
export default {
  name: 'Default',
  components: {
    HeaderNav,
  },
}
</script>
