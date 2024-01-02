"use client";

import React from "react";
import { EmployeeForm } from "../components/form";
import { Create } from "@/shadcn/components/crud";

export default function EmployeeCreate(): JSX.Element {
  return (
    <Create>
      <EmployeeForm redirect="list" />
    </Create>
  );
}
