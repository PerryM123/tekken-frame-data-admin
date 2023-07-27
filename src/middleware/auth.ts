// TODO: できればaliasを適応したい
import { useUserMeStore } from '~/store/userMe';
import { storeToRefs } from 'pinia';

export default defineNuxtRouteMiddleware((to, from) => {
  console.log('============================================');
  console.log('client-side middleware: auth');
  const userMeStore = useUserMeStore();
  const { getUserInfo } = storeToRefs(userMeStore);

  console.log('getUserInfo.value.name: ', getUserInfo.value.name);
  console.log('getUserInfo.value.id: ', getUserInfo.value.id);
  console.log(
    'getUserInfo.value.accountCreatedDate: ',
    getUserInfo.value.accountCreatedDate
  );
  console.log('getUserInfo.value.birthDay: ', getUserInfo.value.birthDay);
  console.log('getUserInfo.value.birthMonth: ', getUserInfo.value.birthMonth);
  console.log('getUserInfo.value.birthYear: ', getUserInfo.value.birthYear);
  console.log('getUserInfo.value.email: ', getUserInfo.value.email);
  console.log('getUserInfo.value.phoneNumber: ', getUserInfo.value.phoneNumber);
  console.log('getUserInfo.value.role: ', getUserInfo.value.role);

  const { isLoggedIn } = useUserInfo();
  console.log('client-side middleware: isLoggedIn: ', isLoggedIn);
  if (!isLoggedIn.value) {
    return navigateTo('/login');
  }
});
