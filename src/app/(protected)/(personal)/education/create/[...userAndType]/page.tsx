"use client";

import { Create } from "@src/shadcn/components/crud";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import { EducationEditForm } from "../../containers/form/edit-form";

const breadcrumbs = [
  { label: "Employee", href: "/profile" },
  { label: "Create" },
];

export default function EmployeeCreate({ params }: { params?: { userAndType?: string[] } }): JSX.Element {
  const [profileId] = params?.userAndType ?? ["", ""];
  return (
    <Create
      title="ຟອມສ້າງຕຳແໜ່ງ"
      resource="profile"
      breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}
    >
      <EducationEditForm id={Number(profileId)}/>
    </Create>
  );
}
