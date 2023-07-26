import { storeToRefs } from 'pinia';
import { useUserMeStore } from '~/store/userMe';

export default function useUserInfo() {
  const userMeStore = useUserMeStore();
  const { setDefaultState } = userMeStore;
  const { role } = storeToRefs(userMeStore);

  const isLoggedIn = computed(() => role?.value !== 'guest');
  const logout = () => {
    setDefaultState();
  };
  return { isLoggedIn, logout };
}
