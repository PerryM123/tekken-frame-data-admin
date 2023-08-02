interface ISessionGetApi {
  // TODO: 全部オプショナルでいいのかな
  id?: number;
  email?: string;
  name?: string;
  role?: number;
  isRedirect?: boolean;
}
