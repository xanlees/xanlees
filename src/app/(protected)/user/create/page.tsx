"use client";
import React from "react";
import { UserForm } from "../components/form";
import { Create } from "@/shadcn/components/crud";

export default function UserCreate(): JSX.Element {
  return (
      <Create>
        <UserForm redirect="list" />
      </Create>
  );
}
