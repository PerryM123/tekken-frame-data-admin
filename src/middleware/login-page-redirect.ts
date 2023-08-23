import { PUBLIC_API_URL } from '~/utils/constants';
import { useUserMeStore } from '~/store/userMe';

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log(
    `[${
      process.server ? 'server' : 'client'
    }]client-side middleware: login-page-redirect`
  );
  const config = useRuntimeConfig();
  const cookie = useCookie(config.public.cookieName);

  const { $publicApi } = useNuxtApp();
  // TODO: ページ移動の時、たまに2回連続呼び出しされる、、、原因調査は必須
  console.log(
    `[${
      process.server ? 'server' : 'client'
    }]BEFORE login-page-redirect: api/session`
  );
  // TODO: api/sessionが二回送信、、、
  const { data } = await $publicApi.get<ISessionGetApi>(
    PUBLIC_API_URL.SESSION,
    process.server
      ? {
          headers: { cookie: `${config.public.cookieName}=${cookie.value}` }
        }
      : {}
  );

  if (!data.isRedirect) {
    return navigateTo('/');
  }
});
