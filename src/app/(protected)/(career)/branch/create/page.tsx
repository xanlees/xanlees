"use client";
import { Create } from "@/shadcn/components/crud";
import { BranchForm } from "../containers/form/form";
export default function BranchCreate(): JSX.Element {
  return (
    <Create>
      <div className="flex justify-center">
        <div className="flex flex-col border shadow-2xl rounded-2xl">
          <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">
            ຟອມສ້າງສາຂາຫ້ອງການ
          </div>
          <BranchForm type={"OFFICE"} />
        </div>
      </div>
    </Create>
  );
}
