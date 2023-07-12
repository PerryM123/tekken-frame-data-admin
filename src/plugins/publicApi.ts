import axios from 'axios';
export default defineNuxtPlugin((nuxtApp) => {
  const baseURL = nuxtApp.$config.public.publicApiUrl;
  const sercetApiKey = nuxtApp.$config.sercetApiKey;
  console.log('--test: publicApi.ts: baseURL: ', baseURL);
  console.log('--test: publicApi.ts: sercetApiKey: ', sercetApiKey);
  const publicApi = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': sercetApiKey
    },
    timeout: 5000
  });
  console.log('--test: publicApi.ts: api: ', publicApi);
  return {
    provide: {
      publicApi
    }
  };
});
