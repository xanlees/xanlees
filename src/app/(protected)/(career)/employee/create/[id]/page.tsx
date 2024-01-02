"use client";

import { Create } from "@src/shadcn/components/crud";
import { EmployeeForm } from "../../components/form";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";

const breadcrumbs = [
  { label: "Employee", href: "/employee" },
  { label: "Create" },
];

export default function EmployeeCreate({ params }: { params: { id: number } }): JSX.Element {
  return (
    <Create resource="employee" breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs}/>}>
      <EmployeeForm redirect="edit" {...params} />
    </Create>
  );
}
