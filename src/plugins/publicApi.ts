import axios from 'axios';
export default defineNuxtPlugin((nuxtApp) => {
  const baseURL = nuxtApp.$config.public.publicApiUrl;
  console.log('--test: publicApi.ts: baseURL: ', baseURL);
  const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 5000
  });
  return {
    provide: {
      publicApi: api
    }
  };
});
