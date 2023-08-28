export const PUBLIC_API_URL = {
  SESSION: '/api/session',
  CHARACTERS: '/api/framedata/characters',
  LOGIN: '/api/login',
  LOGOUT: '/api/logout'
} as const;

export const BACKEND_API_URL = {
  LOGIN: '/api/v1/login',
  CHARACTERS: '/api/v1/characters',
  ME: '/api/v1/me'
} as const;

export const PAGE_URL = {
  HOME: '/',
  USER: '/user',
  CHARACTER_INFO: '/character-info',
  VIDEO_CALL: '/video-call',
  LOGIN: '/login'
} as const;

export const ROLE_TYPE = {
  ADMIN: 0,
  USER: 1,
  GUEST: 2
} as const;

export const ROLE_TITLES = {
  ADMIN: '管理者',
  USER: 'ユーザ',
  GUEST: 'ゲスト'
} as const;
