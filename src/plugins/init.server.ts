import { unsign } from 'cookie-signature';
import { useUserMeStore } from '~/store/userMe';

function cookieFromRequestHeaders(key: string) {
  const headers = useRequestHeaders(['cookie']);
  if ('cookie' in headers) {
    const cookie = headers.cookie
      ?.split(';')
      .find((c) => c.trim().startsWith(`${key}=`));
    if (cookie) {
      return cookie.split('=')[1];
    }
  }
  return '';
}

const getRoleType = (role?: number) => {
  if (role === ROLE_TYPE.ADMIN) return ROLE_TYPE.ADMIN;
  if (role === ROLE_TYPE.USER) return ROLE_TYPE.USER;
  return ROLE_TYPE.GUEST;
};

export default defineNuxtPlugin(async (nuxtApp) => {
  console.log(`[${process.server ? 'server' : 'client'}] init.server`);
  const config = useRuntimeConfig();
  const token = cookieFromRequestHeaders(config.public.cookieName);
  if (token.length) {
    const { data: userMeData } = await useFetch<ISessionGetApi>(
      '/api/session',
      {
        method: 'get'
      }
    );
    // TODO: piniaエラー対応必須
    const userMe = useUserMeStore(nuxtApp.$pinia);
    const { setUserInfo } = userMe;
    let role = getRoleType(userMeData.value?.role);
    setUserInfo({
      name: userMeData.value?.name,
      id: userMeData.value?.id,
      email: userMeData.value?.email,
      role
    });
  }
});
