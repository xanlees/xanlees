"use client";

import { Create } from "@/shadcn/components/crud";
import { EmployeeCreate } from "../components/employeeCreate";
import { CounterProvider } from "../components/counterContext";

export default function UserCreate(): JSX.Element {
  return (
    <Create>
      <CounterProvider>
        <EmployeeCreate />
      </CounterProvider>
    </Create>
  );
}
