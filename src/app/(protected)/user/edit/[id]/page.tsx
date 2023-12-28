"use client";

import { Edit } from "@/shadcn/components/crud";
import { UserForm } from "../../components/form";

export default function UserCreate(): JSX.Element {
  return (
    <Edit>
      <UserForm redirect="edit" />
    </Edit>
  );
}
