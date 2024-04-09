import { Show } from "@/shadcn/components/crud";
import React from "react";
import { Card, CardHeader, CardTitle } from "@src/shadcn/elements";
import { type IAddress } from "@personal";

export function AddressDetail({ personalAddressData }: { personalAddressData: IAddress[] }): JSX.Element {
  return (
    <Card className="w-full pb-3 bg-white rounded-lg shadow-xl dark:bg-gray-800 dark:text-white h-fit ">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
          {"ທີ່ຢູ່"}
        </CardTitle>
      </CardHeader>
      <div className="px-4 py-2">
        {personalAddressData?.map((item) => {
          return (
            <Show.Row
              key={item?.id}
              className="text-gray-700 text-md dark:text-gray-300"
              title={item?.status ?? ""}
              content={`ບ້ານ${item?.village ?? ""}, ${item?.district?.districtName ?? ""}, ${item?.district?.provinceName ?? ""}`}
            />
          );
        })}
      </div>
    </Card>
  );
}
