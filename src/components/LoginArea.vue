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
const { session } = await useSession();
console.log('client side: session.value: ', session.value);
// TODO: 以下のaaを削除
// const userName = ref<string>('aa');
// const password = ref<string>('aa');
const userName = ref<string>('perry');
const password = ref<string>('123');
const errorMessage = ref<string>('');
const errorInfo = {
  isUserNameEmpty: ref<boolean>(false),
  isPasswordEmpty: ref<boolean>(false),
  isIncorrectPassword: ref<boolean>(false)
};
const isLoading = ref<boolean>(false);

const resetErrorInfo = () => {
  errorInfo.isUserNameEmpty.value = false;
  errorInfo.isPasswordEmpty.value = false;
  errorInfo.isIncorrectPassword.value = false;
  errorMessage.value = '';
};

const logInHandler = async () => {
  console.log('---test: logInHandler: CLICKED!!!');
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

      const { data } = await useFetch('/api/login', {
        method: 'POST',
        body: { userName, password }
      });
      console.log('the data is: ', data.value);
      if (data.value) {
        const userInfoResponse: IUserInfo = {
          name: data.value?.name,
          id: data.value?.id,
          accountCreatedDate: data.value?.accountCreatedDate,
          birthDay: data.value?.birthDay,
          birthMonth: data.value?.birthMonth,
          birthYear: data.value?.birthYear,
          email: data.value?.email,
          phoneNumber: data.value?.phoneNumber,
          role: data.value?.role
        };
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
  <div class="loginArea">
    <template v-if="!isLoading">
      <div class="loginInfo">
        <h1>Admin Login</h1>
        <p v-if="errorMessage.length" class="errorText">*{{ errorMessage }}</p>
        <p class="inputTitle">User Name</p>
        <form @submit="logInHandler">
          <input
            v-model="userName"
            @input="onTextChange"
            :class="{ errorState: errorInfo.isUserNameEmpty.value }"
            type="text"
          />
          <p class="inputTitle">Password</p>
          <input
            v-model="password"
            @input="onTextChange"
            :class="{ errorState: errorInfo.isPasswordEmpty.value }"
            type="password"
          />
          <div>
            <button class="loginButton" type="submit">Login</button>
          </div>
        </form>
      </div>
    </template>
    <template v-else>
      <img src="/loading.gif" />
    </template>
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
