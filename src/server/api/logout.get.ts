// TODO: alias利用は必須
import { IErrorResponse } from '~/src/interface/IErrorResponse';

type ILogOutResponse = {
  isSuccess: boolean;
};

export default defineEventHandler(async (event) => {
  try {
    const response: ILogOutResponse = await $fetch(
      // TODO: envを利用
      'http://localhost:8000/api/v1/logout'
    );
    return {
      ...response
    };
  } catch (error) {
    // TODO: serverログ必須
  }
  const errorResponse: IErrorResponse = {
    errorInfo: {
      message: 'ログアウトエラー',
      code: 'ERR_logout'
    }
  };
  return errorResponse;
});
