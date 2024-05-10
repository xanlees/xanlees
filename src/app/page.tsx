"use client";

import { Authenticated } from "@refinedev/core";
import { NavigateToResource } from "@refinedev/nextjs-router/app";
import { getUserSession } from "@src/common/lib/getSession";

export default function Home(): JSX.Element {
  const user = getUserSession()?.user;
  const userGroup = user?.groups?.[0];
  let userProfileResource = "";
  if (user?.groups && user.groups.length > 0) {
    if (userGroup === "admin") {
      userProfileResource = "user-profile";
    }
    if (userGroup === "staff") {
      userProfileResource = "my-profile";
    }
    if (userGroup === "user") {
      userProfileResource = "my-profile";
    }
  }
  return (
    <Authenticated
      key="dashboard"
      redirectOnFail="/"
      appendCurrentPathToQuery={false}>
      <NavigateToResource resource={userProfileResource} />
    </Authenticated>
  );
}
