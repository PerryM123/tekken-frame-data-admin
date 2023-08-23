const ONE_MINUTE = 60;
const ONE_DAY = 1440 * ONE_MINUTE;
const MINUTES = 5;
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
    redisUrl: process.env.SESSION_REDIS_URL || '',
    sessionExpires: ONE_DAY,
    sessionIdPrefix: process.env.SESSION_ID_PREFIX || 'redisPrefix_',
    // SSR＆CSR側
    public: {
      publicApiUrl: process.env.PUBLIC_API_URL || '',
      skywayApiKey: process.env.SKY_WAY_API_KEY || '',
      cookieName: 'perry-session'
    }
  },

  nitro: {
    storage: {
      redis: {
        driver: 'redis',
        port: process.env.SESSION_REDIS_PORT,
        host: process.env.SESSION_REDIS_HOST,
        ttl: ONE_DAY
      }
    }
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  devtools: {
    enabled: false
  }
});
