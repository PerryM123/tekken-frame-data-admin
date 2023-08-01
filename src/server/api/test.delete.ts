export default defineEventHandler(async (event) => {
  const body = await readBody<{
    token: string;
  }>(event);

  await useStorage().removeItem(`redis:${body.token}`, {});
  return 'Data is set man111';
});
