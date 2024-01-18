"use client";

import { Create } from "@src/shadcn/components/crud";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import { ApplicationForm } from "../../components/form";

const breadcrumbs = [
  { label: "Employee", href: "/employee" },
  { label: "Create" },
];

export default function ApplicationCreate({ params }: { params: { id: number } }): JSX.Element {
  return (
    <Create resource="employee" breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs}/>}>
      <ApplicationForm redirect="list" {...params} />
    </Create>
  );
}
