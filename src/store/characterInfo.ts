import { ICharacterInfoData } from 'interface/ICharacterInfo';
import { acceptHMRUpdate, defineStore } from 'pinia';

// TODO: 分かりやすい変数名に変更
interface ICharacterInfo {
  characterInfo: ICharacterInfoData[];
  isLoaded: boolean;
}

const defaultStore: ICharacterInfo = {
  characterInfo: [],
  isLoaded: false
};

export const useCharacterInfoStore = defineStore({
  id: 'character-info-store',
  state: () => {
    return defaultStore as ICharacterInfo;
  },
  actions: {
    setCharacterInfo(characterInfo: ICharacterInfoData[]) {
      this.characterInfo = characterInfo;
    },
    setIsLoaded(isLoaded: boolean) {
      this.isLoaded = isLoaded;
    }
  },
  getters: {
    getCharacterInfo: (state) => state
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useCharacterInfoStore, import.meta.hot)
  );
}
