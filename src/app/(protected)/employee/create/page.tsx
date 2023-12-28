"use client";

import { Create } from "@/shadcn/components/crud";
import { EmployeeCreate } from "../components/employeeCreate";

export default function UserCreate(): JSX.Element {
  return (
    <Create>
      <EmployeeCreate/>
    </Create>
  );
}
