export type UserCreds = {
  email: string;
  token: string;
};

export type UserData = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type User = UserData & UserCreds;
