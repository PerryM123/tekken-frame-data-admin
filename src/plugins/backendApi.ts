import axios from 'axios';
export default defineNuxtPlugin((nuxtApp) => {
  const baseURL = nuxtApp.$config.backendApiUrl;
  const sercetApiKey = nuxtApp.$config.sercetApiKey;
  const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': sercetApiKey
    },
    timeout: 5000
  });
  return {
    provide: {
      api
    }
  };
});
