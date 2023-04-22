<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  name: string;
  age: number;
  quote?: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: 'defaultName'
});
const userName = ref('');
const password = ref('');
const errorInfo = {
  isUserNameEmpty: ref(false),
  isPasswordEmpty: ref(false),
  isIncorrectPassword: ref(false)
};

const resetErrorInfo = () => {
  errorInfo.isUserNameEmpty.value = false;
  errorInfo.isPasswordEmpty.value = false;
  errorInfo.isIncorrectPassword.value = false;
};

const logInHandler = () => {
  resetErrorInfo();
  console.log('logInHandler!!!');
  if (userName.value.length === 0) {
    errorInfo.isUserNameEmpty.value = true;
  }
  if (password.value.length === 0) {
    errorInfo.isPasswordEmpty.value = true;
  }

  if (!errorInfo.isUserNameEmpty.value && !errorInfo.isPasswordEmpty.value) {
    console.log('submit ok!!!');
  }
};
</script>
<template>
  <div class="">
    <!-- TODO: 以下のdivは動作確認用なので動作確認終わったら削除必須 -->
    <div>
      <h2>Props</h2>
      <p>name: {{ props.name }}</p>
      <p>age: {{ props.age }}</p>
      <p>quote: {{ props.quote }}</p>
      <h2>ref variables</h2>
      <p>userName: {{ userName }}</p>
      <p>password: {{ password }}</p>
      <p>errorInfo.isUserNameEmpty: {{ errorInfo.isUserNameEmpty }}</p>
      <p>errorInfo.isPasswordEmpty: {{ errorInfo.isPasswordEmpty }}</p>
    </div>
    <div class="loginArea">
      <div class="loginInfo">
        <h1>Admin Login</h1>
        <p class="inputTitle">User Name</p>
        <input v-model="userName" type="text" />
        <p class="inputTitle">Password</p>
        <input v-model="password" type="password" />
        <div>
          <button class="loginButton" @click="logInHandler()">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.loginArea {
  display: flex;
  justify-content: center;
}

.loginInfo {
  border: 2px solid;
  border-radius: 10px;
  padding: 30px 120px;
}

.inputTitle {
  margin-bottom: 5px;
  font-weight: bold;
}
</style>
