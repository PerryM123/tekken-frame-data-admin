const ONE_MINUTE = 60;
const MINUTES = 5;
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // '@nuxt/devtools',
    '@pinia/nuxt'
  ],

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
    redisUrl: process.env.SESSION_REDIS_URL || '',
    sessionExpires: 60 * MINUTES,
    sessionIdPrefix: process.env.SESSION_ID_PREFIX || 'redisPrefix_',
    // SSR＆CSR側
    public: {
      publicApiUrl: process.env.PUBLIC_API_URL || '',
      // TODO: 勝手に見れる可能性があるか確認必須
      skywayApiKey: process.env.SKY_WAY_API_KEY || '',
      cookieName: 'perry-session'
    }
  },

  nitro: {
    // plugins: ['~/server/index.ts']
    storage: {
      redis: {
        driver: 'redis',
        port: process.env.SESSION_REDIS_PORT,
        host: process.env.SESSION_REDIS_HOST,
        ttl: ONE_MINUTE * 5 // 5分
      }
    }
  },
  devtools: {
    enabled: true
  }
});
