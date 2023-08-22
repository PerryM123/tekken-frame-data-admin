<script setup lang="ts">
import { useUserMeStore } from '~/store/userMe';
import { ref } from 'vue';
import { IUserInfo } from 'interface/IUserInfo';

interface Props {
  name?: string;
  age?: number;
  quote?: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: 'defaultName'
});
const { $publicApi } = useNuxtApp();
const userName = ref<string>('');
const password = ref<string>('');
const errorMessage = ref<string>('');
const errorInfo = {
  isUserNameEmpty: ref<boolean>(false),
  isPasswordEmpty: ref<boolean>(false),
  isIncorrectPassword: ref<boolean>(false)
};
const isLoading = ref<boolean>(false);
const isRedirectingAfterLogin = ref<boolean>(false);

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
    try {
      isLoading.value = true;
      // TODO: 仮のコードです。動作確認が終わり次第、以下のsleep関数を削除
      const sleep = (ms: number) => {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      };
      await sleep(1000);

      const { data } = await $publicApi.post<IUserInfo>('/api/login', {
        userName: userName.value,
        password: password.value
      });
      console.log('the data: ', data);
      if (data) {
        const userInfoResponse: IUserInfo = {
          name: data?.name,
          id: data?.id,
          email: data?.email,
          role: data?.role
        };
        isRedirectingAfterLogin.value = true;
        const userMeStore = useUserMeStore();
        const { setUserInfo } = userMeStore;
        setUserInfo(userInfoResponse);
        const redirectTo = useRoute().redirectedFrom?.path || PAGE_URL.USER;
        useRouter().push(redirectTo);
      } else {
        errorMessage.value = '認証できませんでした';
      }
    } catch (e) {
      console.log('e: ', e);
    }
    isLoading.value = false;
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

const onTextChange = () => {
  resetErrorInfo();
};
</script>
<template>
  <div class="mt-[120px]">
    <div class="flex justify-center px-10">
      <img v-if="isLoading || isRedirectingAfterLogin" src="loading.gif" />
      <div
        v-else
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
              class="mt-9 w-full rounded-lg bg-green-500 px-4 py-3 font-semibold text-white hover:bg-green-400"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
