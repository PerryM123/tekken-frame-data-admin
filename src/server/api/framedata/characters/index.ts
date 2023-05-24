// TODO: なぜかエリアスでインポートするとエラーが発生
// import { backendApiUrl } from '@utils/runtimeConfiguration';
import { backendApiUrl } from '../../../../utils/runtimeConfig';

export default defineEventHandler(async (event) => {
  const response = await fetch(`${backendApiUrl}/api/v1/characters`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  // TODO: responseToRetureの型が分からないから怪しい、、修正必須
  const responseToReturn = await response.json();
  return responseToReturn.map((item: any) => {
    return item;
  });
});
