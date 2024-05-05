"use client";

import { Authenticated } from "@refinedev/core";
import { NavigateToResource } from "@refinedev/nextjs-router/app";
import { getUserSession } from "@src/common/lib/getSession";

export default function Home(): JSX.Element {
  const user = getUserSession()?.user;
  let userProfileResource = "my-profile";
  if (user?.groups && user.groups.length > 0) {
    const userGroup = user.groups[0];
    if (userGroup === "admin") {
      userProfileResource = "user-profile";
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
