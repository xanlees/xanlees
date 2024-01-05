/* eslint-disable @typescript-eslint/naming-convention */
import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { type IToken, type Response, type User, type UserResponse } from "@/lib/provider/auth/interface";
import { refreshAccessToken } from "./refresh-token";

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
          };

          return { ...user, accessToken: data.access, refreshToken: data?.refresh };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET_KEY as string,
  callbacks: {
    session({ session, token }) {
      if (token?.user !== undefined) {
        session.user = token.user as User;
      }
      return { ...session, accessToken: token.accessToken, refreshToken: token.refreshToken };
    },
    async jwt({ token, user, account }) {
      const tokenUser = token?.user;
      if (tokenUser !== undefined && tokenUser !== null) {
        const second = 1000;
        const minute = 60;
        const currentTimeInSeconds = Math.floor(Date.now() / second);
        const { expires, refreshToken } = (token as unknown as IToken).user;
        const tokenExpInSeconds = Math.floor(new Date(expires).getTime() / second);
        if (tokenExpInSeconds - currentTimeInSeconds < minute && (refreshToken.length > 0)) {
          await refreshAccessToken(token as unknown as IToken);
        }
      }
      if (user !== undefined && user !== null) {
        token.user = user;
        token.accessToken = account?.accessToken;
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
