export default defineEventHandler(async (event) => {
  const body = await readBody<{
    id: string;
    email: string;
    name: string;
    role: string;
    token: string;
  }>(event);
  const { id, email, name, role, token } = body;

  // TODO: エラーハンドリング検討必須
  // TODO: 自分でredis:テキストを入れるの危険だからcomposableを作成
  await useStorage().setItem(`redis:${token}`, {
    id,
    email,
    name,
    role
  });
  const returnObj: ISessionPostApi = {
    isSuccess: true
  };

  return returnObj;
});
