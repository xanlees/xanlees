"use client";

import React from "react";
import { Edit } from "@/shadcn/components/crud";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import { EmployeeEditForm } from "../../containers/form/editForm";
import { useOne } from "@refinedev/core";

export default function EmployeeEdit({ params }: { params: { id: number } }): JSX.Element {
  const { data } = useOne<{ profileId: number }>({
    resource: "education",
    id: Number(params.id ?? 0),
  });
  const profileId = data?.data?.profileId ?? 0;
  const breadcrumbs = [{ label: "ກັບຄືນ", href: `/profile/show/${profileId}` }];
  return (
    <Edit
      title="ການສຶກສາ"
      showButtonShow={false}
      breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}
    >
      <div className="flex justify-center rounded-full">
        <div className="flex flex-col border rounded-2xl  w-72 sm:w-[710px]">
          <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">
            ຟອມຂໍ້ມູນຕໍາແໜ່ງ
          </div>
          <EmployeeEditForm id={Number(params.id ?? 0)} />
        </div>
      </div>
    </Edit>
  );
}
