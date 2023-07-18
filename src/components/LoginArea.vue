<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  name?: string;
  age?: number;
  quote?: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: 'defaultName'
});
const userName = ref('');
const password = ref('');
const errorMessage = ref('');
const errorInfo = {
  isUserNameEmpty: ref(false),
  isPasswordEmpty: ref(false),
  isIncorrectPassword: ref(false)
};

const resetErrorInfo = () => {
  errorInfo.isUserNameEmpty.value = false;
  errorInfo.isPasswordEmpty.value = false;
  errorInfo.isIncorrectPassword.value = false;
  errorMessage.value = '';
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
    console.log('submit ok!!!');
    // TODO: composibleに変更
    try {
      const { data, pending, error, refresh } = await useFetch('/api/login', {
        method: 'POST',
        body: { userName, password }
      });
    } catch (e) {
      console.log('e: ', e);
    }
  }
  setErrorText();
};

const updateHandler = async () => {
  console.log('---test: updateHandler');
  const { data, pending, error, refresh } = await useFetch(
    '/api/framedata/characters/newNameAGAIN',
    {
      method: 'PUT',
      body: { name: 'destiny2' },
      credentials: 'include'
    }
  );
};

const setErrorText = () => {
  if (errorInfo.isUserNameEmpty.value && errorInfo.isPasswordEmpty.value) {
    errorMessage.value = 'Usernameとpasswordは入力必須';
  } else if (errorInfo.isUserNameEmpty.value) {
    errorMessage.value = 'Usernameは入力必須';
  } else if (errorInfo.isPasswordEmpty.value) {
    errorMessage.value = 'Passwordは入力必須';
  } else if (errorInfo.isIncorrectPassword.value) {
    errorMessage.value = 'パスワードは一致していません！';
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
        v-model="userName"
        :class="{ errorState: errorInfo.isUserNameEmpty.value }"
        type="text"
      />
      <p class="inputTitle">Password</p>
      <input
        v-model="password"
        :class="{ errorState: errorInfo.isPasswordEmpty.value }"
        type="password"
      />
      <div>
        <button class="loginButton" @click="logInHandler()">Login</button>
      </div>
      <div class="putTest">
        <button class="loginButton" @click="updateHandler()">Put</button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.putTest {
  margin-top: 10px;
}
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
