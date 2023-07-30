// import { IErrorResponse } from '@interface/IErrorResponse';
// TODO: なぜかエリアスでインポートするとエラーが発生
// import { backendApiUrl } from '@utils/runtimeConfiguration';
import { backendApiUrl } from '../../utils/runtimeConfig';

export default defineEventHandler(async (event) => {
  console.log('========================');

  const cookies = parseCookies(event);
  console.log('cookies: ', cookies);
  const config = useRuntimeConfig();
  const app = useNitroApp();
  // セッションID取得
  const cookie = cookies[config.public.cookieName];

  console.log('cookie name: ', config.public.cookieName);
  console.log('cookie info: ', cookie);
  // app.session.get(config.sessionIdPrefix + sessionId);
  if (!cookie) {
    // TODO: redirect to login
  }

  return {
    userInfo: null
  };
});
