export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('============================================');
  console.log('client-side middleware: auth-perry');
  const { isLoggedIn } = useUserInfo();
  console.log('client-side middleware: isLoggedIn: ', isLoggedIn);
  if (!isLoggedIn.value) {
    return navigateTo('/login');
  }
  const app = useNitroApp();
  await app.session.get();

  const { data } = await $publicApi.get('/api/session-perry');
  console.log('session-perry data: ', data);

  // return navigateTo('/login');

  // TODO: sessionクッキーの有効期間が切れたらログアウトするかログインページへリダイレクトするか検討
});
