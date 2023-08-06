<script setup lang="ts">
import { useUserMeStore } from '~/store/userMe';
import { storeToRefs } from 'pinia';

const defaultConstants = {
  blankName: '',
  blankNumber: null
} as const;
const userName: Ref<string> = ref(defaultConstants.blankName);
const userId: Ref<number | null> = ref(defaultConstants.blankNumber);
const isIdError: Ref<boolean> = ref(false);
const userMeStore = useUserMeStore();
const { setUserName, setUserId } = userMeStore;
const { name, id } = storeToRefs(userMeStore);

const changeNameClickHandler = () => {
  setUserName(userName.value);
  userName.value = defaultConstants.blankName;
};

const changeIdClickHandler = () => {
  isIdError.value = false;
  let convertedId = Number(userId.value);
  if (convertedId) {
    setUserId(convertedId);
    userId.value = defaultConstants.blankNumber;
  } else {
    isIdError.value = true;
  }
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
    <hr />
    <h3>Change ID</h3>
    <template v-if="isIdError">
      <p class="error">ERROR! 数字を入力してください。</p>
    </template>
    <input v-model="userId" placeholder="Enter New ID Here..." type="text" />
    <button @click="changeIdClickHandler()">Update ID</button>
  </div>
</template>
<style scoped lang="scss">
.dataTitle {
  font-weight: bold;
}
.error {
  color: red;
  font-weight: bold;
}
</style>
