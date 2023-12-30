"use client";

import { Create } from "@/shadcn/components/crud";
import { UserForm } from "../components/form";

export default function UserCreate(): JSX.Element {
  return (
    <Create>
      <UserForm redirect="list" />
    </Create>
  );
}
