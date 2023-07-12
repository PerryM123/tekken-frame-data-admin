import axios from 'axios';
export default defineNuxtPlugin((nuxtApp) => {
  const baseURL = nuxtApp.$config.backendApiUrl;
  const sercetApiKey = nuxtApp.$config.sercetApiKey;
  console.log('--test: axios.ts: baseURL: ', baseURL);
  console.log('--test: axios.ts: sercetApiKey: ', sercetApiKey);
  const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': sercetApiKey
    },
    timeout: 5000
  });
  console.log('--test: axios.ts: api: ', api);
  return {
    provide: {
      api
    }
  };
});
