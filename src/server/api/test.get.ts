export default defineEventHandler(async (event) => {
  const data = await useStorage().getItem('redis:perry');
  return data;
});
