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
  // TODO: エラーハンドリングのやり方はnitro docsに記載されてないからIssueを投稿する必要ある
  // その他:
  //    - 同じ問題: https://stackoverflow.com/questions/76586293/how-to-handle-connection-errors-when-using-usestorage-with-redis-in-nuxt-3
  //    - Nitro Issues: https://github.com/unjs/nitro/issues
  //    - docs: https://nitro.unjs.io/guide/storage
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
