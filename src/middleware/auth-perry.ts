import { useUserMeStore } from '~/store/userMe';

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log(
    `[${
      process.server ? 'server' : 'client'
    }]client-side middleware: auth-perry`
  );
  const config = useRuntimeConfig();
  const cookie = useCookie(config.public.cookieName);

  const { $publicApi } = useNuxtApp();
  // TODO: ページ移動の時、たまに2回連続呼び出しされる、、、原因調査は必須
  const { data } = await $publicApi.get<ISessionGetApi>(
    '/api/session',
    process.server
      ? {
          headers: { cookie: `${config.public.cookieName}=${cookie.value}` }
        }
      : {}
  );

  if (data.isRedirect) {
    return navigateTo('/login');
  }
  const userMeStore = useUserMeStore();
  const { setUserInfo } = userMeStore;
  setUserInfo(data);
});
