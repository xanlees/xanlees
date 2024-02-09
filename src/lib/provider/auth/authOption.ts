/* eslint-disable @typescript-eslint/naming-convention */
import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { type Response, type User, type UserResponse } from "@/lib/provider/auth/interface";
import { CheckingAndRefreshToken } from "./refresh-token";

const second = 1000;
const minute = 60;
const hour = 60;
const oneThirdDay = 8;

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      id: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.API_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const data: Response = await res.json() as Response;
        const resUser = await fetch(`${process.env.API_URL}/user/${data.user?.pk}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const dataUser = await resUser.json() as UserResponse;
        if (res.ok && resUser.ok && ((data?.access) !== "")) {
          const user: User = {
            name: data.user.username,
            email: data.user.email,
            id: data.user?.pk,
            groups: dataUser.groups,
            accessToken: data.access,
            refreshToken: data?.refresh,
            iat: Math.floor(Date.now() / second),
          };
          return user;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: oneThirdDay * hour * minute,
  },
  secret: process.env.SECRET_KEY as string,
  callbacks: {
    session({ session, token }) {
      if (token?.user !== undefined) {
        session.user = token.user as User;
      }
      return session;
    },
    async jwt({ token, user }) {
      const refresh = await CheckingAndRefreshToken(token);
      if (refresh !== undefined) {
        console.log(refresh);
        (token.user as User).accessToken = refresh.accessToken;
        (token.user as User).refreshToken = refresh.refreshToken;
        (token.user as User).iat = refresh.iat;
      }
      if (user !== undefined && user !== null) {
        token.user = user;
      }
      return token;
    },
    signIn({ user }) {
      return user !== undefined;
    },
    redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};
