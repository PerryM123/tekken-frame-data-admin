// TODO: alias利用は必須
import { IErrorResponse } from '~/src/interface/IErrorResponse';

type ILogOutResponse = {
  isSuccess: boolean;
};

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const backendApiUrl = runtimeConfig.backendApiUrl;
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
