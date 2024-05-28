"use client";

import React from "react";

import { Edit } from "@/shadcn/components/crud";

import { HolidayForm } from "../../container/form";

export default function HolidayEdit({ params }: { params: { id: string } }): JSX.Element {
  const id = params?.id ? parseInt(params.id, 10) : 0;
  return (
    <Edit title="ວັນພັກ" resource="holiday">
      <div className="flex justify-center ">
        <div className="flex flex-col border rounded-2xl max-w-[700px]">
          <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">ຟອມວັນພັກ</div>
          <HolidayForm id={id}/>
        </div>
      </div>
    </Edit>
  );
}
