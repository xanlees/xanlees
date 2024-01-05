import { type IRefreshToken, type IToken } from "./interface";

export async function refreshAccessToken(token: IToken) {
  try {
    const refreshToken = token.user.refreshToken;
    const res = await fetch(`${process.env.API_URL}/auth/token/refresh/`, {
      method: "POST",
      body: JSON.stringify({ refresh: refreshToken }),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: { "Content-Type": "application/json" },
    });
    const data: IRefreshToken = await res.json() as IRefreshToken;
    console.log("Refresh token response:", data);
    if (res.ok && data?.access !== undefined) {
      token.user.accessToken = data.access;
      token.user.refreshToken = data.refresh;
      token.user.expires = data.accessExpiration;
    } else {
      console.error("Refresh token not available.");
    }
  } catch (error) {
    console.error("Failed to refresh token:", error);
  }
}
