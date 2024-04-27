"use client";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import React from "react";
import { Edit } from "@/shadcn/components/crud";
import { AgentProfileEditForm } from "../../containers/form/editForm";

const breadcrumbs = [
  { label: "ຄົນຂາຍເລກ", href: "/agent" },
  { label: "Create" },
];

export default function ProfileEdit({ params }: { params: { id: number } }): JSX.Element {
  const id = Number(params.id ?? 0) ?? 0;
  return (
    <Edit title="ຟອມສ້າງພະນັກງານ" resource="profile" breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}>
      <div className="flex justify-center ">
        <div className="flex flex-col border rounded-2xl max-w-[700px]">
          <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">
          ຟອມສ້າງພະນັກງານ
          </div>
          <AgentProfileEditForm id={id}/>
        </div>
      </div>
    </Edit>
  );
}

