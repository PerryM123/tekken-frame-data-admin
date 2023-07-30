// TODO: なぜかエリアスでインポートするとエラーが発生
// import { backendApiUrl } from '@utils/runtimeConfiguration';
import { sign, unsign } from 'cookie-signature';
import { backendApiUrl, sercetApiKey } from '../../utils/runtimeConfig';
import type { H3Event } from 'h3';
import Redis from 'ioredis';
import { uuid } from 'uuidv4';

// uuidv4();
// const uuidv4 = require('uuid').v4;

export default defineEventHandler(async (event: H3Event) => {
  console.log('========================================');
  const config = useRuntimeConfig();
  const app = useNitroApp();
  const sessionId = uuid();
  console.log('--app: ', app);
  console.log('--app.session: ', app.session);
  console.log('--config.cookieSecret: ', config.cookieSecret);

  const signedSessionId = sign(sessionId, config.cookieSecret);
  const unsignedSessionId = unsign(signedSessionId, config.cookieSecret);
  console.log('--sessionId: ', sessionId);
  console.log('--signedSessionId: ', signedSessionId);
  console.log('--unsignedSessionId: ', unsignedSessionId);
  // クッキー作成
  setCookie(event, config.public.cookieName, signedSessionId, {
    httpOnly: true,
    path: '/',
    // sameSite: 'strict',
    // secure: process.env.NODE_ENV === 'production',
    secure: true,
    expires: new Date(Date.now() + config.sessionExpires * 1000)
  });

  // セッション作成
  await app.session.set(config.sessionIdPrefix + sessionId, {
    id: 'userWithPassword.id',
    email: 'userWithPassword.email',
    name: 'userWithPassword.name',
    role: 'userWithPassword.role'
  });
  // console.log('--config.redisUrl: ', config.redisUrl);
  // const redis = new Redis(config.redisUrl);
  // const count = await redis.incr('counter');
  // const stern = await redis.incr('stern');
  // const stern2 = await redis.get('stern');
  // const result = await redis.hget('hash-key', 'key').then(function (value) {
  //   console.log('value', value);
  // });
  // console.log('--count: ', count);
  // console.log('--stern: ', stern);
  // console.log('--stern2: ', stern2);
  // console.log('--result: ', result);
  // console.log('--sessionId is: ', sessionId);
  // redis.quit();

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
