import { useUserMeStore } from '~/store/userMe';

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('============================================');
  console.log(`client-side middleware: auth-perry`);
  const { $publicApi } = useNuxtApp();
  const { data } = await $publicApi.get('/api/session-perry');
  if (data.redirect) {
    return navigateTo('/login');
  }
  const userMeStore = useUserMeStore();
  const { setUserInfo } = userMeStore;
  setUserInfo(data);
});
