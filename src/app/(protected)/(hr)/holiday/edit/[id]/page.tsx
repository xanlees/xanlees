"use client";

import React from "react";

import { Edit } from "@/shadcn/components/crud";

import { HolidayForm } from "../../container/form/form";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";
import { BranchHolidayFormEdit } from "../../container/form/formbranch";

const holidaycrumbs = [
  { label: "ວັນພັກ", href: "/holiday" },
  { label: "ຟອມແກ້ໄຂວັນພັກ" },
];

export default function HolidayEdit({ params }: { params: { id: string } }): JSX.Element {
  const id = params?.id ? parseInt(params.id, 10) : 0;
  return (
    <Edit title="ຟອມແກ້ໄຂວັນພັກ" resource="holiday" breadcrumb={<BreadcrumbItems breadcrumbs={holidaycrumbs}/>}>
      <div className="flex justify-center ">
        <div className="flex flex-col border rounded-2xl shadow-2xl ">
          <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">ຟອມແກ້ໄຂວັນພັກ</div>
          <HolidayForm id={id}/>
          <BranchHolidayFormEdit id={id}/>
        </div>
      </div>
    </Edit>
  );
}
