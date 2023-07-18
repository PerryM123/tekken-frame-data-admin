import { IErrorResponse } from '@interface/IErrorResponse';
// TODO: なぜかエリアスでインポートするとエラーが発生
// import { backendApiUrl } from '@utils/runtimeConfiguration';
import { backendApiUrl } from '../../utils/runtimeConfig';

type ILogOutResponse = {
  isSuccess: boolean;
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  deleteCookie(event, config.cookieName, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  });
  return {
    userInfo: null
  };
});
