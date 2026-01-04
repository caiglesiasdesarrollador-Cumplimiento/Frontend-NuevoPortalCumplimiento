export interface IAuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
}

export interface IAuthInterceptorConfig {
  headerName: string;
  tokenPrefix: string;
  excludedUrls: string[];
  includedUrls?: string[];
}

export interface IAuthStorage {
  getToken(): string | null;
  setToken(token: string): void;
  removeToken(): void;
  isTokenExpired(): boolean;
}
