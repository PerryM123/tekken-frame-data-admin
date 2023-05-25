// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: 3001
  },
  // rootDir: './src',
  // components: ['~/src/components'],
  // dir: {
  //   pages: './src/pages',
  //   plugins: './src/plugins'
  // },
  srcDir: './src',
  runtimeConfig: {
    // SSR側のみ
    backendApiUrl: process.env.BACKEND_API_URL || '',
    sercetApiKey: process.env.SECRET_API_KEY || '',
    // SSR＆CSR側
    public: {
      publicApiUrl: process.env.PUBLIC_API_URL || ''
    }
  }
});
