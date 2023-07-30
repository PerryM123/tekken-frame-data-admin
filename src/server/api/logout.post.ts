// import { IErrorResponse } from '@interface/IErrorResponse';
// TODO: なぜかエリアスでインポートするとエラーが発生
// import { backendApiUrl } from '@utils/runtimeConfiguration';
import { backendApiUrl } from '../../utils/runtimeConfig';
import { unsign } from 'cookie-signature';

type ILogOutResponse = {
  isSuccess: boolean;
};

export default defineEventHandler(async (event) => {
  console.log('-----------------');
  console.log('logout.post.ts: ', event.node.req.headers.cookie);
  const cookies = parseCookies(event);
  console.log('cookies: ', cookies);
  const config = useRuntimeConfig();
  const app = useNitroApp();
  // セッションID取得
  const cookie = cookies[config.public.cookieName];
  console.log('cookie before: ', cookie);
  if (cookie) {
    const unsignedSession = unsign(cookie, config.cookieSecret);
    console.log('unsignedSession: ', unsignedSession);
    if (unsignedSession) {
      // セッション破棄
      await app.session.destroy(config.sessionIdPrefix + unsignedSession);
    }
  }

  // クッキー破棄
  deleteCookie(event, config.public.cookieName, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  });

  console.log('cookie after: ', cookie);

  return {
    userInfo: null
  };
});
