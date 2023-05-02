import { IErrorResponse } from '@interface/IErrorResponse';
// TODO: なぜかエリアスでインポートするとエラーが発生
// import { backendApiUrl } from '@utils/runtimeConfiguration';
import { backendApiUrl } from '../../utils/runtimeConfig';

type ILogOutResponse = {
  isSuccess: boolean;
};

export default defineEventHandler(async (event) => {
  try {
    const response: ILogOutResponse = await $fetch('/api/v1/logout', {
      method: 'GET',
      baseURL: backendApiUrl
    });
    return {
      ...response
    };
  } catch (error) {
    // TODO: serverログ必須
    console.log('catch error: ', error);
  }
  const errorResponse: IErrorResponse = {
    errorInfo: {
      message: 'ログアウトエラー',
      code: 'ERR_logout'
    }
  };
  return errorResponse;
});
