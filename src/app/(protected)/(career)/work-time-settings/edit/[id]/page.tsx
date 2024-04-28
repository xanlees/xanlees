"use client";

import React from "react";
import { Edit } from "@/shadcn/components/crud";
import { WorkTimeSettingsEditForm } from "../../containers/editForm";

export default function WorkTimeSettingsEdit({ params }: { params: { id: number } }): JSX.Element {
  return (
    <Edit>
      <div className="flex justify-center">
        <div className="flex flex-col border rounded-2xl">
          <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">
            ຟອມແກ້ໄຂຂໍ້ມູນໂມງເຂົ້າ-ອອກວຽກ
          </div>
          <WorkTimeSettingsEditForm branchId={Number(params.id ?? 0)} />
        </div>
      </div>
    </Edit>
  );
}
