import { unsign } from 'cookie-signature';

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const config = useRuntimeConfig();
  const app = useNitroApp();
  // セッションID取得
  const cookie = cookies[config.public.cookieName];
  if (cookie) {
    const unsignedSession = unsign(cookie, config.cookieSecret);
    if (unsignedSession) {
      // セッション破棄
      const data = await useStorage<ISessionGetApi>().removeItem(
        `redis:${unsignedSession}`
      );
    }
  }

  // クッキー破棄
  deleteCookie(event, config.public.cookieName, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  });

  return {
    userInfo: null
  };
});
