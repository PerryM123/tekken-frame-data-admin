// TODO: なぜかエリアスでインポートするとエラーが発生
// import { backendApiUrl } from '@utils/runtimeConfiguration';
import { sign, unsign } from 'cookie-signature';
import { backendApiUrl, sercetApiKey } from '../../utils/runtimeConfig';
import type { H3Event } from 'h3';
import { uuid } from 'uuidv4';
import { IUserInfo } from 'interface/IUserInfo';

export default defineEventHandler(async (event: H3Event) => {
  console.log('========================================');
  const config = useRuntimeConfig();
  const app = useNitroApp();
  const sessionId = uuid();
  const signedSessionId = sign(sessionId, config.cookieSecret);
  // クッキー作成
  setCookie(event, config.public.cookieName, signedSessionId, {
    httpOnly: true,
    path: '/',
    // sameSite: 'strict',
    // secure: process.env.NODE_ENV === 'production',
    secure: true,
    expires: new Date(Date.now() + config.sessionExpires * 1000)
  });

  const body = await readBody<{
    userName: string;
    password: string;
  }>(event);
  const { userName, password } = body;
  if (!userName || !password) {
    throw createError({
      statusCode: 400,
      message: 'パラメータが足りない'
    });
  }
  // TODO: fetchの代わりに$fetchも同じことできないか確認必須
  // TODO: any変数型を削除
  try {
    const data: any = await $fetch(`${backendApiUrl}/api/v1/login`, {
      method: 'POST',
      // TODO: rememberMeを追加
      body: {
        userName,
        password
      },
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': sercetApiKey || ''
      }
    });

    if (data.code) {
      throw createError({
        statusCode: data.status,
        message: data.message
      });
    }

    const userMeData: any = await $fetch(
      `${backendApiUrl}/api/v1/me/${data.userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': sercetApiKey || ''
        }
      }
    );
    console.log('userMeData: ', userMeData);

    // セッション作成
    await app.session.set(config.sessionIdPrefix + sessionId, {
      id: userMeData.id,
      email: userMeData.email,
      name: userMeData.name,
      role: userMeData.roleId
    });

    let userInfo: IUserInfo = {
      id: userMeData.id,
      email: userMeData.email,
      name: userMeData.name,
      role: userMeData.roleId
    };

    return {
      ...userInfo
    };
  } catch (error) {
    console.error('--test: error: ', error);
    // return {
    //   isSuccess: false,
    //   statusCode: 'data.status',
    //   message: 'data.message'
    // };

    event.context.session = {
      ...event.context.session,
      isLoggedIn: false
    };

    throw createError({
      statusCode: 401,
      message: 'Bad credentials'
    });
  }
});
