"use client";

import React from "react";
import { Edit } from "@/shadcn/components/crud";
import { UserForm } from "../../containers/form";

export default function UserCreate(): JSX.Element {
  return (
    <Edit>
      <UserForm redirect="edit" />
    </Edit>
  );
}
