"use client";

import { Create } from "@src/shadcn/components/crud";
import { EmployeeForm } from "../../containers/form";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";

const breadcrumbs = [
  { label: "Employee", href: "/profile" },
  { label: "Create" },
];

export default function EmployeeCreate({ params }: { params: { id: number } }): JSX.Element {
  return (
    <Create resource="profile" breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}>
      <EmployeeForm redirect="list" {...params} />
    </Create>
  );
}

