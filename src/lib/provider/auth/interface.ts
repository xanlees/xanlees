import { type JWT } from "next-auth/jwt";

export interface User {
  id: string
  name: string
  email: string
  groups: string[]
  accessToken: string
  refreshToken: string
}

export interface UserResponse {
  pk: string
  username: string
  email: string
  groups: string[]
}

export interface Response {
  accessExpiration: any
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
export interface IToken extends JWT {
  user: {
    accessToken: string
    refreshToken: string
    expires: string
  } & User
}

