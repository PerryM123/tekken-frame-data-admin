import { IErrorResponse } from '@interface/IErrorResponse';
// TODO: なぜかエリアスでインポートするとエラーが発生
// import { backendApiUrl } from '@utils/runtimeConfiguration';
import { backendApiUrl, sercetApiKey } from '../../utils/runtimeConfig';

type ILogInResponse = {
  isSuccess: boolean;
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userName, password } = body;
  if (!userName || !password) {
    throw createError({
      statusCode: 400,
      message: 'パラメータが足りない'
    });
  }
  // TODO: fetchの代わりに$fetchも同じことできないか確認必須
  console.log('--test: sercetApiKey: ', sercetApiKey);
  const response = await fetch(`${backendApiUrl}/api/v1/login`, {
    method: 'POST',
    body: JSON.stringify({
      userName,
      password
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': sercetApiKey || ''
    }
  });
  const responseJson = await response.json();
  console.log('login: responseJson: ', responseJson);
  if (responseJson.code) {
    throw createError({
      statusCode: response.status,
      message: responseJson.message
    });
  }
  const cookieString = response.headers.get('Set-Cookie');
  // TODO: ライブラリあるかな。なければutil化しよう
  const [cookieName, cookieValue] =
    cookieString?.split(';')[0].split('=') || '';
  setCookie(event, cookieName, cookieValue, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + 1000 * 60 * 30)
  });

  return responseJson;
});
