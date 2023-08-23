export default function useCurrentPage() {
  const url = useRequestURL();
  let isHomePage = computed(() => url.pathname === PAGE_URL.HOME);
  let isUserPage = computed(() => url.pathname === PAGE_URL.USER);
  let isCharacterInfoPage = computed(
    () => url.pathname === PAGE_URL.CHARACTER_INFO
  );
  let isVideoCallPage = computed(() => url.pathname === PAGE_URL.VIDEO_CALL);

  return {
    isHomePage,
    isUserPage,
    isCharacterInfoPage,
    isVideoCallPage
  };
}
