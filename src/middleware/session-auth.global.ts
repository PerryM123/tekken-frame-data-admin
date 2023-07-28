import { useUserMeStore } from '~/store/userMe';

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('============================================');
  console.log('--session-auth.global');
});
