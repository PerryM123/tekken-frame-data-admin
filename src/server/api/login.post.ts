// TODO: なぜかエリアスでインポートするとエラーが発生
// import { backendApiUrl } from '@utils/runtimeConfiguration';
import { backendApiUrl, sercetApiKey } from '../../utils/runtimeConfig';
import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  console.log('========================================');
  const config = useRuntimeConfig();
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

    // TODO: 以下の１行目は仮です。loginInfo APIができたら差し替えが必要
    let testUserIdFromResponse = 111;
    event.context.session = {
      ...event.context.session,
      ...getUserInfoById(testUserIdFromResponse),
      isLoggedIn: true
    };

    console.log(
      'login222: event.context.session before return: ',
      event.context.session
    );
    return {
      ...getUserInfoById(testUserIdFromResponse),
      isLoggedIn: true
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
