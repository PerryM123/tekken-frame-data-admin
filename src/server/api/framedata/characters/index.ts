import axios, { AxiosResponse } from 'axios';
// TODO: aliasを適応
import { backendApi } from '~/server/utils/backendApi';
import {
  ICharacterInfoListApi,
  ICharacterInfoApi,
  ICharacterInfoData
} from 'interface/ICharacterInfo';

export default defineEventHandler(async (event) => {
  try {
    const response = await backendApi<ICharacterInfoApi[]>(
      // TODO: backendのURLのconstantが必要
      '/api/v1/characters',
      'GET'
    );
    const characterInfoData: ICharacterInfoData[] = [
      ...response.data.map((item: ICharacterInfoApi) => {
        return {
          name: item.name,
          isComplete: item.is_completed,
          description: item.description
        };
      })
    ];
    return [...characterInfoData];
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
