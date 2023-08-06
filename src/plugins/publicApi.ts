import axios from 'axios';
export default defineNuxtPlugin((nuxtApp) => {
  const baseURL = nuxtApp.$config.public.publicApiUrl;
  const sercetApiKey = nuxtApp.$config.sercetApiKey;
  const publicApi = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': sercetApiKey
    },
    timeout: 5000
  });
  return {
    provide: {
      publicApi
    }
  };
});
