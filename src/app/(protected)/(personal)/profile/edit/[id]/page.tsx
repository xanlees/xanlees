"use client";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import React from "react";
import { Edit } from "@/shadcn/components/crud";
import { ProfileEditForm } from "../../containers/form/editForm";

const breadcrumbs = [
  { label: "ຂໍ້ມູນສ່ວນບຸກຄົນ", href: "/my-profile" },
];

export default function ProfileEdit({ params }: { params: { id: number } }): JSX.Element {
  return (
    <Edit title="ຟອມສ້າງພະນັກງານ" resource="profile" breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}>
      <div className="flex justify-center ">
        <div className="flex flex-col border rounded-2xl max-w-[700px]">
          <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">
          ຟອມສ້າງພະນັກງານ
          </div>
          <ProfileEditForm />
        </div>
      </div>
    </Edit>
  );
}

