"use client";

import { Create } from "@src/shadcn/components/crud";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import { EducationEditForm } from "../../containers/form/edit-form";
import { type FormAction } from "@refinedev/core";

const breadcrumbs = [
  { label: "Employee", href: "/profile" },
  { label: "Create" },
];

export default function EmployeeCreate({ params }: { params?: { userAndType?: string[] } }): JSX.Element {
  const [profileId, actionStr] = params?.userAndType ?? ["", ""];
  const action: FormAction = actionStr as FormAction;
  console.log("profileId", profileId);
  console.log("action", action);
  return (
    <Create
      title="ຟອມສ້າງຕຳແໜ່ງ"
      resource="profile"
      breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}
    >
      <EducationEditForm id={Number(0)} />
    </Create>
  );
}
