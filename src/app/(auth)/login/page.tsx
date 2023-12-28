/* eslint-disable @typescript-eslint/naming-convention */
"use client";

import React from "react";
import useSubmitService from "./service/submit";
import LoginFormTemplate from "@/app/(auth)/login/templates/base";

export default function Login() {
  const onSubmit = useSubmitService();

  return <LoginFormTemplate onSubmit={onSubmit}/>;
}

Login.layout = "auth";
