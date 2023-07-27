import { storeToRefs } from 'pinia';
import { PAGE_URL } from '~/utils/constants';
import { useUserMeStore } from '~/store/userMe';

export default function useUserInfo() {
  const userMeStore = useUserMeStore();
  const { setDefaultState } = userMeStore;
  const { role } = storeToRefs(userMeStore);

  const isLoggedIn = computed(() => role?.value !== 'guest');
  const logout = () => {
    setDefaultState();
    useRouter().push(PAGE_URL.HOME);
  };
  return { isLoggedIn, logout };
}
