"use client";
import { Show } from "@/shadcn/components/crud";
import React from "react";
import { Card, CardHeader, CardTitle } from "@src/shadcn/elements";
import { type IPersonalAddress } from "@src/common/interface/interface";

export function AddressDetail({ personalAddressData }: { personalAddressData: IPersonalAddress[] }): JSX.Element {
  return (
    <Card className="shadow-xl pb-3 rounded-lg w-full bg-white dark:bg-gray-800 dark:text-white h-fit ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
          {"ທີ່ຢູ່"}
        </CardTitle>
      </CardHeader>
      <div className="px-4 py-2">
        {personalAddressData?.map((item) => {
          return (
            <Show.Row
              key={item.id}
              className="text-md text-gray-700 dark:text-gray-300"
              title={item?.status}
              content={`${item?.village}:${item?.district?.districtName}:${item?.district?.provinceName} - (ເຮຶອນເລກທີ${item?.houseNo})`}
            />
          );
        })}
      </div>
    </Card>
  );
}
