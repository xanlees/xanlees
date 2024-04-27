"use client";

import { Authenticated } from "@refinedev/core";
import { NavigateToResource } from "@refinedev/nextjs-router/app";
export default function Home(): JSX.Element {
  return (
    <Authenticated
      key="dashboard"
      redirectOnFail="/"
      appendCurrentPathToQuery={false}>
      <NavigateToResource resource="user-profile" />
    </Authenticated>
  );
}
