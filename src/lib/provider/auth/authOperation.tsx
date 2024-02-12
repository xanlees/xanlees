import { signIn, signOut } from "next-auth/react";
import { type Session } from "next-auth";
import { type User, type Credential } from "@/lib/provider/auth/interface";

export function getLogin(to: string) {
  return async({
    providerName,
    username,
    password,
  }: Credential,
  ) => {
    if (providerName !== undefined) {
      await signIn(providerName, { callbackUrl: (to !== "") ? to.toString() : "/", redirect: true });
      return {
        success: true,
      };
    }
    const signInResponse = await signIn("Credentials", {
      username,
      password,
      callbackUrl: (to !== "") ? to.toString() : "/",
      redirect: false,
    });
    if (signInResponse == null) {
      return { success: false };
    }
    const { ok, error } = signInResponse;
    if (ok) {
      return {
        success: true,
        redirectTo: "/",
      };
    }
    return {
      success: false,
      error: new Error(error?.toString()),
    };
  };
}
export function getLogout() {
  return async() => {
    await signOut({
      redirect: true,
      callbackUrl: "/login",
    });

    return {
      success: true,
    };
  };
}

export function getIdentity(data: Session | null) {
  return () => {
    if ((data?.user) != null) {
      const { user } = data;
      return {
        name: user.name,
        avatar: user.image,
      };
    }
    return null;
  };
}

export function getCheck(data: Session | null, status: string) {
  const second = 1000;
  const minute = 60;
  const hour = 60;
  const oneThirdDay = 8;

  const iat = (data?.user as User)?.iat;
  const currentTimeInSeconds = Math.floor(Date.now() / second);
  let isTokenExpired = false;
  if (currentTimeInSeconds - iat > (oneThirdDay * hour * minute)) {
    isTokenExpired = true;
  }
  const authenticated = (status !== "unauthenticated") && !isTokenExpired;

  return {
    authenticated,
    redirectTo: authenticated ? "/login" : undefined,
  };
}
