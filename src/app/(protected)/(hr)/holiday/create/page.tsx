"use client";

import React from "react";

import { Create } from "@/shadcn/components/crud";

import { HolidayForm } from "../container/form/form";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";

const holidaycrumbs = [
  { label: "ວັນພັກ", href: "/holiday" },
  { label: "ສ້າງວັນພັກ" },
];

export default function HolidayCreate(): JSX.Element {
  return (
    <Create title="ຟອມສ້າງວັນພັກ" resource="holiday" breadcrumb={<BreadcrumbItems breadcrumbs={holidaycrumbs}/>}>
      <div className="flex justify-center">
        <div className="flex flex-col border shadow-2xl rounded-2xl ">
          <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">
          ຟອມສ້າງວັນພັກ
          </div>
          <HolidayForm />
        </div>
      </div>
    </Create>
  );
}
