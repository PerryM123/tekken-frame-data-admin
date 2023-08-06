import { useUserMeStore } from '~/store/userMe';

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log(
    `[${
      process.server ? 'server' : 'client'
    }]client-side middleware: auth-perry`
  );
  const { $publicApi } = useNuxtApp();
  const { data } = await $publicApi.get<ISessionGetApi>('/api/session');

  if (data.isRedirect) {
    return navigateTo('/login');
  }
  const userMeStore = useUserMeStore();
  const { setUserInfo } = userMeStore;
  setUserInfo(data);
});