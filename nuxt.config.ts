const MINUTES = 0.5;
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/devtools',
    '@pinia/nuxt',
    '@sidebase/nuxt-session'
    // '@sidebase/nuxt-auth'
  ],
  // auth: {
  //   provider: {
  //     type: 'authjs'
  //   }
  // },

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
    redisUrl: process.env.SESSION_REDIS_URL || '',
    sessionExpires: 60 * MINUTES,
    sessionIdPrefix: 'SESSION_ID_PREFIX' || 'redisPrefix',
    // SSR＆CSR側
    public: {
      publicApiUrl: process.env.PUBLIC_API_URL || '',
      // TODO: 勝手に見れる可能性があるか確認必須
      skywayApiKey: process.env.SKY_WAY_API_KEY || ''
    }
  },

  nitro: {
    plugins: ['~/server/index.ts']
  },
  devtools: {
    enabled: true
  }
});
