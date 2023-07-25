<script setup lang="ts">
import { useUserMeStore } from '~/store/userMe';
import { storeToRefs } from 'pinia';

const blankName = '';
const userName = ref(blankName);
const userMeStore = useUserMeStore();
const { setUserName, setUserId } = userMeStore;
const { name, id } = storeToRefs(userMeStore);

const changeNameClickHandler = () => {
  setUserName(userName.value);
  userName.value = blankName;
};
</script>
<template>
  <div>
    <p><span class="dataTitle">Current Name: </span>{{ name }}</p>
    <p><span class="dataTitle">Current User Id: </span>{{ id }}</p>
    <hr />
    <h3>Change Name</h3>
    <input
      v-model="userName"
      placeholder="Enter New Name Here..."
      type="text"
    />
    <button @click="changeNameClickHandler()">Update Name</button>
  </div>
</template>
<style scoped lang="scss">
.dataTitle {
  font-weight: bold;
}
</style>
