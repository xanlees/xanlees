"use client";

import React from "react";
import useSubmitService from "./service/submit";
import LoginForm from "./components/form";

export default function Login() {
  const onSubmit = useSubmitService();
  return <div className="p-10 mx-auto w-96">
    <LoginForm onSubmit={onSubmit } />
  </div>;
}

Login.layout = "auth";
