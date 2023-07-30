import Redis from 'ioredis';
import RedisSession from '~/utils/redis-session.js';
const config = useRuntimeConfig();

export default async (_nitroApp: Nitro) => {
  // 起動モード表示
  console.log('--------------------------------------', _nitroApp);
  if (process.env.NODE_ENV === 'production') {
    console.log('=> Production mode starting');
  } else {
    console.log('=> Debug mode starting');
  }

  // セッション管理用のRedisクライアント作成
  const redis = new Redis(config.redisUrl);
  const redisSession = new RedisSession({
    client: redis,
    ttl: config.sessionExpires
  });
  _nitroApp.session = redisSession;
};