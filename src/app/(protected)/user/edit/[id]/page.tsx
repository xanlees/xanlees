"use client";

import React from "react";
import { Edit } from "@/shadcn/components/crud";
import { UserForm } from "../../containers/form";

export default function UserEdit(): JSX.Element {
  return (
    <Edit>
      <div className="flex justify-center">
        <div className="flex flex-col border rounded-2xl">
          <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">
            ຟອມແກ້ໄຂຂໍ້ມູນບັນຊີເຂົ້າລະບົບ
          </div>
          <UserForm navigates={"profile"} id={0} redirect={""} />
        </div>
      </div>
    </Edit>
  );
}
