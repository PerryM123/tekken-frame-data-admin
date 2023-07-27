export default defineNuxtRouteMiddleware((to, from) => {
  console.log('============================================');
  console.log('client-side middleware: auth');
  const { isLoggedIn } = useUserInfo();
  console.log('client-side middleware: isLoggedIn: ', isLoggedIn);
  if (!isLoggedIn.value) {
    return navigateTo('/login');
  }
  // TODO: sessionクッキーの有効期間が切れたらログアウトするかログインページへリダイレクトするか検討
});
