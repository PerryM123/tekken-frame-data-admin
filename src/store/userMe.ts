import { IUserInfo } from '~/interface/IUserInfo';
import { acceptHMRUpdate, defineStore } from 'pinia';

const defaultStore: IUserInfo = {
  // TODO: 以下のstringに半角スペースを入れないと「Uncaught (in promise) TypeError: Cannot set properties of undefined (setting 'nodeValue')」のエラーが発生してしまう
  // 参考記事URL: https://zenn.dev/taro137/articles/124780f3d91be4#:~:text=%E3%81%93%E3%81%AE%E3%82%88%E3%81%86%E3%81%AB%E6%9B%B8%E3%81%84%E3%81%A6%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E4%B8%8A%E3%81%A7%E5%80%A4%E3%82%92%E5%A4%89%E6%9B%B4%E3%81%97%E3%82%88%E3%81%86%E3%81%A8%E3%81%99%E3%82%8B%E3%81%A8%E3%82%A8%E3%83%A9%E3%83%BC%E3%82%92%E5%90%90%E3%81%8F%E3%80%82
  name: ' ',
  // TODO: undefinedでいいのかな。確認必須！
  id: undefined,
  accountCreatedDate: undefined,
  birthDay: undefined,
  birthMonth: undefined,
  birthYear: undefined,
  email: '',
  phoneNumber: '',
  role: ROLE_TYPE.GUEST
} as const;

export const useUserMeStore = defineStore({
  id: 'user-me-store',
  state: () => {
    return {
      ...defaultStore
    } as IUserInfo;
  },
  actions: {
    setUserName(name: string) {
      this.name = name;
    },
    setUserId(id: number) {
      this.id = id;
    },
    setUserInfo(userInfo: IUserInfo) {
      this.name = userInfo.name;
      this.id = userInfo.id;
      this.accountCreatedDate = userInfo.accountCreatedDate;
      this.birthDay = userInfo.birthDay;
      this.birthMonth = userInfo.birthMonth;
      this.birthYear = userInfo.birthYear;
      this.email = userInfo.email;
      this.phoneNumber = userInfo.phoneNumber;
      this.role = userInfo.role;
    },
    setDefaultState() {
      // TODO: もっと賢い方法ないか確認
      this.name = defaultStore.name;
      this.id = defaultStore.id;
      this.accountCreatedDate = defaultStore.accountCreatedDate;
      this.birthDay = defaultStore.birthDay;
      this.birthMonth = defaultStore.birthMonth;
      this.birthYear = defaultStore.birthYear;
      this.email = defaultStore.email;
      this.phoneNumber = defaultStore.phoneNumber;
      this.role = defaultStore.role;
    }
  },
  getters: {
    getUserName: (state) => state.name,
    getUserId: (state) => state.id,
    getUserInfo: (state) => state
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserMeStore, import.meta.hot));
}
