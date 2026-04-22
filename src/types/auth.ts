export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  expiresInSeconds: number;
}

export interface AuthorityDto {
  authority: string;
}

export interface AuthMeResponse {
  username: string;
  roles: Array<string | AuthorityDto>;
}

export interface AuthenticatedUser {
  username: string;
  roles: string[];
}
