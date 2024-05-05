"use client";
import { Create } from "@/shadcn/components/crud";

import { BranchCreateForm } from "../containers/form";

export default function BranchCreate(): JSX.Element {
  return (
    <Create>
      <div className="flex justify-center">
        <div className="flex flex-col border shadow-2xl rounded-2xl w-[700px]">
          <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">
            ຟອມສ້າງສາຂາຫ້ອງການ
          </div>
          <BranchCreateForm type={"OFFICE"} />
        </div>
      </div>
    </Create>
  );
}
