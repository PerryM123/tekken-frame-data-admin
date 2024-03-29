import { unsign } from 'cookie-signature';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const cookies = parseCookies(event);

  // セッションID取得
  const cookie = cookies[config.public.cookieName];
  if (cookie) {
    const unsignedSession = unsign(cookie, config.cookieSecret);
    if (unsignedSession) {
      const data = await useStorage<ISessionGetApi>().getItem(
        `redis:${unsignedSession}`
      );
      if (data) {
        return {
          ...data
        };
      }
    }
  }
  const returnData: ISessionGetApi = {
    isRedirect: true
  };
  return returnData;
});
