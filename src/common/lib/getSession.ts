import { useSession } from "next-auth/react";

interface ISession {
  user?: {
    name?: string | null | undefined
    email?: string | null | undefined
    id?: number | null | undefined
    groups?: string[] | null | undefined
    accessToken?: string | null | undefined
    refreshToken?: string | null | undefined
    iat?: number | null | undefined
  }
  expires?: string | null | undefined
}

export function getUserSession(): ISession | null {
  const { data } = useSession();
  return data;
}
