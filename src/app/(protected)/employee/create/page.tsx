"use client";

import { Create } from "@/shadcn/components/crud";
import { EmployeeForm } from "../components/form";

export default function UserCreate(): JSX.Element {
  return (
    <Create>
      <EmployeeForm redirect="edit" />
    </Create>
  );
}
