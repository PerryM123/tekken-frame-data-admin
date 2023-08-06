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
const userName = ref('perry');
const password = ref('123');
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
  <div class="flex justify-center">
    <div
      class="mt-10 w-[400px] rounded-lg border-2 border-solid border-[#dddddd] px-4 py-9"
    >
      <h1
        class="mb-4 text-center text-3xl leading-none tracking-tight text-gray-900"
      >
        ログイン画面
      </h1>
      <p v-if="errorMessage.length" class="errorText">*{{ errorMessage }}</p>
      <form @submit.prevent="logInHandler" class="mt-10">
        <input
          v-model="userName"
          type="text"
          placeholder="ユーザ名"
          autocomplete="true"
          required
          autofocus
          class="w-full rounded-lg bg-[#e7f1fd] px-4 py-3 focus:bg-white"
        />
        <input
          v-model="password"
          type="password"
          placeholder="パスワード"
          class="mt-2 w-full rounded-lg bg-[#e7f1fd] px-4 py-3 focus:bg-white"
        />
        <div>
          <button
            type="submit"
            class="mt-9 w-full rounded-lg bg-green-500 px-4 py-3 font-semibold text-white hover:bg-green-400 focus:bg-white"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
