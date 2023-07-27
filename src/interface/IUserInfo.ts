export interface IUserInfo {
  // TODO: オプショナル変数型で大丈夫かな
  name?: string;
  id?: number;
  accountCreatedDate?: string;
  birthDay?: number;
  birthMonth?: number;
  birthYear?: number;
  email?: string;
  phoneNumber?: string;
  role?: 'user' | 'admin' | 'guest';
}
