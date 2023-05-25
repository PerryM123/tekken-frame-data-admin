// plugins/api.ts

interface IApi {
  baseURL: string;
}

declare module 'axios' {
  interface NuxtApp {
    $api: IApi;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  /** an object containing all repositories we need to expose */
  const modules: IApi = {
    baseURL: nuxtApp.$config.public.API_BASE_URL
  };

  return {
    provide: {
      api1: modules
    }
  };
});
