// TODO: なぜかエリアスでインポートするとエラーが発生
// import { backendApiUrl } from '@utils/runtimeConfiguration';
import { backendApiUrl, sercetApiKey } from '../../utils/runtimeConfig';
import cookieSignature from 'cookie-signature';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const cookieInfo = getCookie(event, config.cookieName);
  // const unsignedSession = cookieSignature.unsign(
  //   config.cookieName,
  //   config.cookieSecret
  // );
  console.log('========================================');
  console.log('--test: login.post: config.cookieName: ', config.cookieName);
  console.log('--test: login.post: cookieInfo: ', cookieInfo);
  console.log('--test: login.post: config.cookieSecret: ', config.cookieSecret);
  // console.log('--test: login.poZst: unsignedSession: ', unsignedSession);
  const body = await readBody<{
    userName: string;
    password: string;
  }>(event);
  const { userName, password } = body;
  console.log('--test: login.post: userName: ', userName);
  console.log('--test: login.post: password: ', password);
  if (!userName || !password) {
    throw createError({
      statusCode: 400,
      message: 'パラメータが足りない'
    });
  }
  // TODO: fetchの代わりに$fetchも同じことできないか確認必須
  console.log('--test: login.post: backendApiUrl: ', backendApiUrl);
  console.log('--test: login.post: sercetApiKey: ', sercetApiKey);
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

    console.log('--test: login.post: config: ', config);
    console.log(
      '--test: login.post: config.cookieRememberMeExpires: ',
      config.cookieRememberMeExpires
    );
    console.log(
      '--test: login.post: config.cookieExpires: ',
      config.cookieExpires
    );

    const rememberMe = false;
    const maxAgeSeconds = {
      normal: 60,
      rememberMe: 120
    };

    const theValue = 'I love you';
    const signedSession = cookieSignature.sign(theValue, config.cookieSecret);

    setCookie(event, config.cookieName, signedSession, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: rememberMe ? maxAgeSeconds.rememberMe : maxAgeSeconds.normal
    });

    return {
      ...data,
      userInfo: 'testme'
    };
  } catch (error) {
    // return {
    //   isSuccess: false,
    //   statusCode: 'data.status',
    //   message: 'data.message'
    // };

    throw createError({
      statusCode: 401,
      message: 'Bad credentials'
    });
  }
});
