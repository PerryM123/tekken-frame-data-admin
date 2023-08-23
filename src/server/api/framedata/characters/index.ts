import axios, { AxiosResponse } from 'axios';
// TODO: aliasを適応
import { backendApi } from '~/server/utils/backendApi';
import {
  ICharacterInfoListApi,
  ICharacterInfoApi,
  ICharacterInfoData
} from 'interface/ICharacterInfo';
import { BACKEND_API_URL } from '~/utils/constants';

export default defineEventHandler(async (event) => {
  try {
    const response = await backendApi<ICharacterInfoApi[]>(
      BACKEND_API_URL.CHARACTERS,
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
      throw createError({
        statusCode: error.response?.status,
        statusMessage: error.message,
        data: {
          errorCode: 'ERR_CHAR_GET_1'
        }
      });
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: 'An unexpected error occurred',
        data: {
          errorCode: 'ERR_CHAR_GET_2'
        }
      });
    }
  }
});
