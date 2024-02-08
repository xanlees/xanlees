import { type JWT } from "next-auth/jwt";
import { type IRefreshToken, type IToken } from "./interface";

const second = 1000;
const minute = 60;

export async function refreshAccessToken(token: IToken) {
  try {
    const refreshToken = token.user.refreshToken;
    const res = await fetch(`${process.env.API_URL}/auth/token/refresh`, {
      method: "POST",
      body: JSON.stringify({ refresh: refreshToken }),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: { "Content-Type": "application/json" },
    });
    const data: IRefreshToken = await res.json() as IRefreshToken;
    if (res.ok && data?.access !== undefined) {
      const accessToken = data.access;
      const refreshToken = data.refresh;
      const iat = Math.floor(Date.now() / second);
      const exp = Math.floor(new Date(data.accessExpiration).getTime() / second);
      return { accessToken, refreshToken, iat, exp };
    }
  } catch (error) {
    console.error("Failed to refresh token:", error);
  }
}

export async function CheckingAndRefreshToken(token: JWT) {
  const tokenUser = token?.user;
  if (tokenUser !== undefined && tokenUser !== null) {
    const currentTimeInSeconds = Math.floor(Date.now() / second);
    const { refreshToken } = (token as unknown as IToken).user;
    const { exp: tokenExpInSeconds } = token;
    if (typeof tokenExpInSeconds === "number" && tokenExpInSeconds - currentTimeInSeconds < minute && (refreshToken.length > 0)) {
      return await refreshAccessToken(token as unknown as IToken);
    }
  }
}
