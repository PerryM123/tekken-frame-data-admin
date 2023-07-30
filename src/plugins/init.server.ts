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

export default defineNuxtPlugin(async (nuxtApp) => {
  console.log('-----------------------init server');
  const config = useRuntimeConfig();
  console.log('config.public.cookieName: ', config.public.cookieName);
  const token = cookieFromRequestHeaders(config.public.cookieName);
  console.log('token: ', token);

  if (token) {
    const unsignedSessionId = unsign(token, config.cookieSecret);
    console.log('unsignedSessionId: ', unsignedSessionId);
    // const app = useNitroApp();
    // const returnValue = await app.session.get(
    //   config.sessionIdPrefix + unsignedSessionId
    // );
    // console.log('returnValue: ', returnValue);

    // const userMeStore = useUserMeStore();
    // const { setUserInfo } = userMeStore;
  }
});
