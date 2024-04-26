"use client";

import React from "react";
import { Edit } from "@/shadcn/components/crud";
import { WorkTimeSettingsEditForm } from "../../containers/editForm";
import { useOne } from "@refinedev/core";
import { type IWorkTimeSettings } from "../../interface";

export default function WorkTimeSettingsEdit({ params }: { params: { id: number } }): JSX.Element {
  const { data } = useOne<IWorkTimeSettings>({
    resource: "branch",
    id: Number(params.id ?? 0),
  });
  const branchId = Number(data?.data?.branch) ?? 0;
  return (
    <Edit>
      <div className="flex justify-center">
        <div className="flex flex-col border rounded-2xl">
          <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">
            ຟອມແກ້ໄຂຂໍ້ມູນໂມງເຂົ້າ-ອອກວຽກ
          </div>
          <WorkTimeSettingsEditForm branchId={branchId} />
        </div>
      </div>
    </Edit>
  );
}
