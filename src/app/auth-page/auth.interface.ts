export interface IAuth {
  username: string;
  password: string;
}

export interface IAuthRes {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  user_id: string;
}
