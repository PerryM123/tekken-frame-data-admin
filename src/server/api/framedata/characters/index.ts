import axios from 'axios';
// TODO: aliasを適応
import { backendApi } from '~/server/utils/backendApi';
import { ICharacterInfoData } from 'interface/ICharacterInfo';

export default defineEventHandler(async (event) => {
  console.log('--test: /api/framedata/characters/index.ts');
  try {
    // TODO: 変数型が必須
    const response = await backendApi('/api/v1/characters', 'GET');
    console.log('--test: response.data: ', response.data);
    const characterInfoData: ICharacterInfoData = {
      // TODO: 変数型が必須
      ...response.data.map((item: any) => {
        return {
          name: item.name,
          isComplete: item.is_complete
        };
      })
    };
    return {
      ...characterInfoData
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
  // TODO: デフォルトreturnは必須
});
