"use client";
import React from "react";
import { Create } from "@/shadcn/components/crud";
import { BranchCreateForm } from "../../branch/containers/form/form";

const ProfileCreate = () => {
  return (
    <Create title={"ຟອມສ້າງແມ່ຫວຍ"} resource="profile">
      <div className="flex justify-center">
        <div className="flex flex-col border shadow-2xl rounded-2xl">
          <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">
            ຟອມສ້າງແມ່ຫວຍ
          </div>
          <BranchCreateForm type={"LOTTERY"} />
        </div>
      </div>
    </Create>
  );
};

export default ProfileCreate;
