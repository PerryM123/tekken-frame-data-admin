// TODO: なぜかエリアスでインポートするとエラーが発生
// import { backendApiUrl } from '@utils/runtimeConfiguration';
import {
  backendApiUrl,
  sercetApiKey
} from '../../../../../utils/runtimeConfig';

export default defineEventHandler(async (event) => {
  const characterId = event.context.params?.character_id;
  const method = event.node.req.method;
  const cookie = event.node.req.headers.cookie || '';
  console.log('cookie: ', cookie);
  if (!characterId) {
    throw createError({
      statusCode: 400,
      message: 'パラメータが足りない'
    });
  }

  // TODO: GETとPUTを実装
  // switch (method) {
  //   case 'GET':
  //     console.log('GET method');
  //     const response1 = await fetch(
  //       `${backendApiUrl}/api/v1/characters/${characterId}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       }
  //     );
  //     const returnResponse = await response1.json();
  //     console.log('response was: ', returnResponse);
  //     return await returnResponse;
  //   case 'PUT':
  //     console.log('PUT method');
  //     const body = await readBody(event);
  //     const { name } = body;
  //     const response2 = await fetch(
  //       `${backendApiUrl}/api/v1/characters/${characterId}`,
  //       {
  //         method: 'PUT',
  //         body: JSON.stringify({
  //           name
  //         }),
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Cookie: cookie,
  //           'x-api-key': sercetApiKey || ''
  //         },
  //         credentials: 'include'
  //       }
  //     );

  //   default:
  //     break;
  // }
});
