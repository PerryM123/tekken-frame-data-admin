<script setup lang="ts">
import { ref } from "vue";

interface Props {
  name: string;
  age: number;
  quote?: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: "defaultName",
});
const userName = ref("");
const password = ref("");
const errorMessage = ref("");
const errorInfo = {
  isUserNameEmpty: ref(false),
  isPasswordEmpty: ref(false),
  isIncorrectPassword: ref(false),
};

const resetErrorInfo = () => {
  errorInfo.isUserNameEmpty.value = false;
  errorInfo.isPasswordEmpty.value = false;
  errorInfo.isIncorrectPassword.value = false;
  errorMessage.value = "";
};

const logInHandler = async () => {
  resetErrorInfo();
  if (userName.value.length === 0) {
    errorInfo.isUserNameEmpty.value = true;
  }
  if (password.value.length === 0) {
    errorInfo.isPasswordEmpty.value = true;
  }

  if (!errorInfo.isUserNameEmpty.value && !errorInfo.isPasswordEmpty.value) {
    console.log("submit ok!!!");
    try {
      // TODO: 仮のAPI
      // const {data, pending, error, refresh} = await useFetch("/api/test/{id}")
      const { data, pending, error, refresh } = await useFetch("/api/login/", {
        method: "POST",
        body: { country: "Japan", isJapanese: true },
      });

      console.log("try");
    } catch (e) {
      console.log("try");
    }
  }
  setErrorText();
};

const setErrorText = () => {
  if (errorInfo.isUserNameEmpty.value && errorInfo.isPasswordEmpty.value) {
    errorMessage.value = "Usernameとpasswordは入力必須";
  } else if (errorInfo.isUserNameEmpty.value) {
    errorMessage.value = "Usernameは入力必須";
  } else if (errorInfo.isPasswordEmpty.value) {
    errorMessage.value = "Passwordは入力必須";
  } else if (errorInfo.isIncorrectPassword.value) {
    errorMessage.value = "パスワードは一致していません！";
  }
};
</script>
<template>
  <div class="loginArea">
    <div class="loginInfo">
      <h1>Admin Login</h1>
      <p v-if="errorMessage.length" class="errorText">*{{ errorMessage }}</p>
      <p class="inputTitle">User Name</p>
      <input
        :class="{ errorState: errorInfo.isUserNameEmpty.value }"
        v-model="userName"
        type="text"
      />
      <p class="inputTitle">Password</p>
      <input
        :class="{ errorState: errorInfo.isPasswordEmpty.value }"
        v-model="password"
        type="password"
      />
      <div>
        <button class="loginButton" @click="logInHandler()">Login</button>
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
  padding: 30px 30px;
  box-sizing: border-box;
  width: 250px;
}

.inputTitle {
  margin-bottom: 5px;
  font-weight: bold;
}

.errorText {
  color: red;
}

.errorState {
  border: 2px solid red;
}
</style>
