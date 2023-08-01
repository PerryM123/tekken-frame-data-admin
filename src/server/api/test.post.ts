export default defineEventHandler(async (event) => {
  const body = await readBody<{
    token: string;
  }>(event);

  // TODO: 自分でredis:テキストを入れるの危険だからcomposableを作成
  await useStorage().setItem(`redis:${body.token}`, {});
  return 'Data is set man111';
});
