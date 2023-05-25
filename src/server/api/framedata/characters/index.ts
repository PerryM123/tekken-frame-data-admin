// TODO: なぜかエリアスでインポートするとエラーが発生
// import { backendApiUrl } from '@utils/runtimeConfiguration';
import { backendApiUrl } from '../../../../utils/runtimeConfig';

export default defineEventHandler(async (event) => {
  const { $api2 } = useNuxtApp();
  const response = await $api2.get(`${backendApiUrl}/api/v1/characters`);
  // TODO: responseToRetureの型が分からないから怪しい、、修正必須
  console.log(
    '/api/framedata/charactersのdefineEventHandler: response: ',
    response
  );
  const responseToReturn = await response.json();
  return responseToReturn.map((item: any) => {
    return item;
  });
});
