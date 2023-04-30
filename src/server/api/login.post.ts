import { IErrorResponse } from '~/src/interface/IErrorResponse';

type ILogInResponse = {
  isSuccess: boolean;
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userName, password } = body;
  try {
    const response: ILogInResponse = await $fetch(
      // TODO: envを利用
      'http://localhost:8000/api/v1/login',
      {
        method: 'POST',
        body: {
          userName,
          password
        }
      }
    );
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
