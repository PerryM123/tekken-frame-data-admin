<!-- Question: You don't need to import components in vue3?? -->
<template>
  <div>
    <Login />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  // Question: What is the point of this?
  name: 'IndexPage',
})
</script>
