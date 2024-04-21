"use client";

import { Create } from "@src/shadcn/components/crud";
import { EmployeeForm } from "../../containers/form";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";

const breadcrumbs = [
  { label: "Employee", href: "/profile" },
  { label: "Create" },
];

export default function EmployeeCreate({
  params,
}: {
  params?: { userAndType?: string[] }
}): JSX.Element {
  const [profileId, type] = params?.userAndType ?? ["", ""];
  return (
    <Create
      title="ຟອມບັນຈຸຕຳແໜ່ງ"
      resource="profile"
      breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}
    >
      <div className="flex justify-center w-full">
        <EmployeeForm redirect="list" type={type} profileId={profileId} />
      </div>
    </Create>
  );
}
