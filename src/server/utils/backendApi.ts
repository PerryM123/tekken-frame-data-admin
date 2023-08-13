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
export const backendApi = <T>(url: string, method: Method) => {
  return axios.request<T>({
    url: url,
    baseURL: backendApiUrl,
    method: method,
    headers: {
      'x-api-key': sercetApiKey
    }
  });
};
