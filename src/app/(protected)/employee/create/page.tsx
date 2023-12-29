"use client";

import { Create } from "@/shadcn/components/crud";
import { EmployeeCreate } from "../components/employeeCreate";
import { CounterProvider } from "../components/context";

export default function UserCreate(): JSX.Element {
  return (
    <Create>
      <CounterProvider>
        <EmployeeCreate />
      </CounterProvider>
    </Create>
  );
}
