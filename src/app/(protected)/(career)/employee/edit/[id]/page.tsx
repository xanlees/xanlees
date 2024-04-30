"use client";

import React from "react";
import { Edit } from "@/shadcn/components/crud";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import { EmployeeEditForm } from "../../containers/form/editForm";
import { useEmployeeEdit } from "../../hook/useEmployeeForm";
import { type IEmployeeExpand } from "../../interface";

export default function useEmployeeForm({ params }: { params: { id: number } }): JSX.Element {
  const employeeID = Number(params?.id);
  const employeeData = useEmployeeEdit<IEmployeeExpand>({ id: employeeID }).data;
  const profileId = employeeData?.[0]?.profileId ?? 0;
  const type = employeeData?.[0]?.branchId?.type ?? 0;
  const url = type === "OFFICE" ? "profile" : "agent";
  const redirectTo = `/${url}/show/${profileId}`;
  const breadcrumbs = [{ label: "ກັບຄືນ", href: `/profile/show/${profileId}` }];
  return (
    <Edit
      title="ຕໍາແໜ່ງ"
      showButtonShow={false}
      breadcrumb={<BreadcrumbItems breadcrumbs={breadcrumbs} />}
    >
      <div className="flex justify-center rounded-full">
        <div className="flex flex-col border rounded-2xl  w-72 sm:w-[710px]">
          <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">
            ຟອມຂໍ້ມູນຕໍາແໜ່ງ
          </div>
          <EmployeeEditForm id={employeeID} redirectTo={redirectTo} />
        </div>
      </div>
    </Edit>
  );
}
