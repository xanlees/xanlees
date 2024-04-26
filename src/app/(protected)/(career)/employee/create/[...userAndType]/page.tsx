"use client";

import { Create } from "@src/shadcn/components/crud";
import { EmployeeForm } from "../../containers/form/createForm";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import { Card, CardHeader } from "@src/shadcn/elements";

const breadcrumbs = [
  { label: "Employee", href: "/profile" },
  { label: "Create" },
];

export default function EmployeeCreate({
  params,
}: {
  params?: { userAndType?: string[] }
}): JSX.Element {
  const [profileId, type, redirect] = params?.userAndType ?? ["", "", ""];
  return (
    <Create
      title="ຟອມສ້າງຕຳແໜ່ງ"
      resource="profile"
      breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}
    >
      <Card className="mx-auto mt-10 mb-20 rounded-md shadow-lg max-w-[900px]">
        <CardHeader>
          <span className="w-full py-4 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl ">
            ຟອມສ້າງພະນັກງານ
          </span>
        </CardHeader>
        <div className="p-5">
          <EmployeeForm redirect={redirect} type={type} profileId={profileId} />
        </div>
      </Card>
    </Create>
  );
}
