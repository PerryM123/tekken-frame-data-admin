// import { IErrorResponse } from '@interface/IErrorResponse';
// TODO: なぜかエリアスでインポートするとエラーが発生
// import { backendApiUrl } from '@utils/runtimeConfiguration';
import { unsign } from 'cookie-signature';

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const config = useRuntimeConfig();
  const app = useNitroApp();
  // セッションID取得
  const cookie = cookies[config.public.cookieName];
  if (!cookie) {
    return {
      redirect: true
    };
  }
  const unsignedSessionId = unsign(cookie, config.cookieSecret);
  console.log('unsignedSessionId: ', unsignedSessionId);
  const returnValue = await app.session.get(
    config.sessionIdPrefix + unsignedSessionId
  );

  return {
    ...returnValue
  };
});
