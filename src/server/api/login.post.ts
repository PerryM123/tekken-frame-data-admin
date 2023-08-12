// TODO: なぜかエリアスでインポートするとエラーが発生
// import { backendApiUrl } from '@utils/runtimeConfiguration';
import { sign, unsign } from 'cookie-signature';
import { backendApiUrl, sercetApiKey } from '../../utils/runtimeConfig';
import type { H3Event } from 'h3';
import { uuid } from 'uuidv4';
import { IUserInfo } from 'interface/IUserInfo';

interface ILoginApi {
  isSuccess?: boolean;
  userId?: number;
  statusCode?: number;
  message?: string;
}

interface IUserMeApi {
  userId: number;
  name: string;
  email: string;
  roleId: number;
}

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig();
  const sessionId = uuid();
  const signedSessionId = sign(sessionId, config.cookieSecret);
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

  try {
    const loginData = await $fetch<ILoginApi>(`${backendApiUrl}/api/v1/login`, {
      method: 'POST',
      body: {
        userName,
        password
      },
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': sercetApiKey || ''
      }
    });

    if (loginData.statusCode) {
      throw createError({
        statusCode: loginData.statusCode,
        message: loginData.message
      });
    }

    const userMeData = await $fetch<IUserMeApi>(
      `${backendApiUrl}/api/v1/me/${loginData.userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': sercetApiKey || ''
        }
      }
    );
    console.log('userMeData: ', userMeData);

    // redisセッション作成
    // TODO: Nitroにて他のNitro APIを叩くのは大丈夫かな、、、
    const data = await $fetch<ISessionPostApi>('/api/session', {
      method: 'POST',
      body: {
        id: userMeData.userId,
        email: userMeData.email,
        name: userMeData.name,
        role: userMeData.roleId,
        token: sessionId
      }
    });

    let userInfo: IUserInfo = {
      id: userMeData.userId,
      email: userMeData.email,
      name: userMeData.name,
      role: userMeData.roleId
    };

    // clientクッキー作成
    setCookie(event, config.public.cookieName, signedSessionId, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + config.sessionExpires * 1000)
    });

    return {
      ...userInfo
    };
  } catch (error) {
    console.error(error);
    event.context.session = {
      ...event.context.session,
      isLoggedIn: false
    };

    throw createError({
      statusCode: 400,
      message: 'Bad Request'
    });
  }
});
