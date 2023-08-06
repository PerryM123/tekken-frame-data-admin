export default defineEventHandler(async (event) => {
  const body = await readBody<{
    token: string;
  }>(event);

  // TODO: エアーハンドリング
  await useStorage().removeItem(`redis:${body.token}`, {});
  const returnObj: ISessionDeleteApi = {
    isSuccess: true
  };
  return returnObj;
});
