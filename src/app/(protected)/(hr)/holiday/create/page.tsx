"use client";

import React from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";

import { Create } from "@/shadcn/components/crud";
import { HolidayForm } from "../container/form/form";
import { BranchHolidayForm } from "../container/form/formbranch";
import { BreadcrumbItems } from "@src/shadcn/components/breadcrumb/items";

const holidaycrumbs = [
  { label: "ວັນພັກ", href: "/holiday" },
  { label: "ຟອມສ້າງວັນພັກ" },
];

export default function HolidayCreate(): JSX.Element {
  return (
    <Create title="ວັນພັກ" resource="holiday" breadcrumb={<BreadcrumbItems breadcrumbs={holidaycrumbs}/>}>
      <div className="flex justify-center">
        <div className="flex flex-col border shadow-2xl rounded-2xl w-[700px]">
          <div className="w-full p-5 text-2xl font-bold text-center text-white bg-blue-500 border rounded-t-2xl">
            ຟອມສ້າງວັນພັກ
          </div>
          <HolidayForm />
          <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            <AccordionItem value="item-1">
              <AccordionTrigger className="italic text-blue-500 underline m-2" >
                ກຳນົດວັນພັກສະເພາະສາຂາ, ກົດທີ່ນີ້
              </AccordionTrigger>
              <AccordionContent>
                <BranchHolidayForm />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </Create>
  );
}
