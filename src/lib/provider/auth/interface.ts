
export interface User {
  id: string
  name: string
  email: string
  groups: string[]
}

export interface UserResponse {
  pk: string
  username: string
  email: string
  groups: string[]
}

export interface Response {
  refresh: string
  access: string
  user: UserResponse
}

export interface Credential {
  providerName: string
  username: string
  password: string
}

export interface IRefreshToken {
  access: string
  refresh: string
  accessExpiration: string
}
export interface IToken {
  user: {
    accessToken: string
    refreshToken: string
    expires: string
  }
}

