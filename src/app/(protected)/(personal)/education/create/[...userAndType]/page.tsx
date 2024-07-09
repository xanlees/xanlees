"use client";

import { Create } from "@src/shadcn/components/crud";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import { EducationCreateForm } from "../../containers/form/edit-create";

const breadcrumbs = [
  { label: "Employee", href: "/profile" },
  { label: "Create" },
];

export default function EmployeeCreate({ params }: { params?: { userAndType?: string[] } }): JSX.Element {
  const [profileId] = params?.userAndType ?? ["", ""];
  return (
    <Create
      title="ຟອມສ້າງຕຳແໜ່ງ"
      breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}
    >
      <EducationCreateForm profileId={Number(profileId)} />
    </Create>
  );
}
