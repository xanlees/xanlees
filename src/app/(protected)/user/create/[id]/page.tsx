"use client";
import React from "react";
import { Create } from "@/shadcn/components/crud";
import { UserForm } from "../../containers/form";
import { Card, CardHeader } from "@src/shadcn/elements";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";

const breadcrumbs = [
  { label: "ຜູ້ໃຊ້ລະບົບ", href: "/user" },
  { label: "Create" },
];

export default function UserCreate({ params }: { params: { id: number } }): JSX.Element {
  const profile = Number(params.id);
  return (
    <Create
      title="ຟອມບັນຈຸຕຳແໜ່ງ"
      resource="profile"
      breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}
    >
      <Card className="mx-auto mb-20 rounded-md shadow-lg max-w-[900px]">
        <CardHeader>
          <span className="w-full py-4 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl ">
            ຟອມຕໍາແໜ່ງ
          </span>
        </CardHeader>
        <div className="p-5">
          <UserForm navigates={"profile"} profile={profile ?? 0} />
        </div>
      </Card>
    </Create>
  );
}
