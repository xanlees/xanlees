"use client";
import React from "react";
import { Create } from "@/shadcn/components/crud";
import { UserForm } from "../../containers/form";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";

const breadcrumbs = [
  { label: "ຜູ້ໃຊ້ລະບົບ", href: "/user" },
];

export default function UserCreate({ params }: { params: { id: number } }): JSX.Element {
  const profile = Number(params.id) ?? 1;
  return (
    <Create
      title="ຟອມຜູ້ໃຊ້ລະບົບ"
      resource="profile"
      breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}
    >
      <div className="flex justify-center">
        <div className="flex flex-col border shadow-2xl rounded-2xl">
          <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">
          ຟອມຜູ້ໃຊ້ລະບົບ
          </div>
          <UserForm navigates={"profile"} profile={profile} />
        </div>
      </div>
    </Create>
  );
}
