import { IErrorResponse } from '@interface/IErrorResponse';
// TODO: なぜかエリアスでインポートするとエラーが発生
// import { backendApiUrl } from '@utils/runtimeConfiguration';
import { backendApiUrl } from '../../utils/runtimeConfig';

type ILogInResponse = {
  isSuccess: boolean;
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userName, password } = body;
  try {
    const response: ILogInResponse = await $fetch('/api/v1/login', {
      method: 'POST',
      body: {
        userName,
        password
      },
      baseURL: backendApiUrl
    });
    return {
      ...response
    };
  } catch (error) {
    // TODO: serverログ必須
    // TODO: 401エラーもcatchしてしまうので修正必須
  }
  const errorResponse: IErrorResponse = {
    errorInfo: {
      message: 'ログインエラー',
      code: 'ERR_logout'
    }
  };
  return errorResponse;
});
