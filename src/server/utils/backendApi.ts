import axios from 'axios';
import { backendApiUrl, sercetApiKey } from '../../utils/runtimeConfig';

type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK';

// TODO: backendApiはurlとmethodの引数でいいのかそれともAxiosRequestConfigのobjectにするか検討必須
export const backendApi = (url: string, method: Method) => {
  console.log('--test: backendApi');
  return axios.request({
    url: url,
    baseURL: backendApiUrl,
    method: method,
    headers: {
      'x-api-key': sercetApiKey
    }
  });
};
