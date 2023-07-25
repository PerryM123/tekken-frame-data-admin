// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/devtools', '@pinia/nuxt'],
  devServer: {
    port: 3001
  },

  srcDir: './src',

  // TODO: alias: https://nuxt.com/docs/api/configuration/nuxt-config#alias
  // TODO: faviconを設定
  runtimeConfig: {
    // SSR側のみ
    backendApiUrl: process.env.BACKEND_API_URL || '',
    sercetApiKey: process.env.SECRET_API_KEY || '',
    cookieSecret: process.env.COOKIE_SECRET || '',
    cookieName: 'nuxt-perry-session',
    // SSR＆CSR側
    public: {
      publicApiUrl: process.env.PUBLIC_API_URL || ''
    }
  },

  devtools: {
    enabled: true
  }
});
