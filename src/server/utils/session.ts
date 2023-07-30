import type { H3Event } from 'h3';

export const getUserInfoById = (userId: number): IUserInfo => {
  // TODO: ログイン情報APIを呼び出し、情報を取得
  let sampleLoginInfoResponse: IUserInfo = {
    name: 'John Doe',
    id: 112233,
    accountCreatedDate: '2022/11/12',
    birthDay: 12,
    birthMonth: 25,
    birthYear: 1991,
    email: 'johndoe@gmail.com',
    phoneNumber: '09011111111',
    role: 'user'
  };
  return {
    ...sampleLoginInfoResponse
  };
};
