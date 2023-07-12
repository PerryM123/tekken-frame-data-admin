import axios from 'axios';
// TODO: aliasを適応
import { backendApi } from '~/server/utils/backendApi';

export default defineEventHandler(async (event) => {
  console.log('--test: /api/framedata/characters/index.ts');
  try {
    const response = await backendApi('/api/v1/characters', 'GET');
    console.log('--test: response.data: ', response.data);
    return response.data;
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
