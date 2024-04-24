import { Show } from "@/shadcn/components/crud";
import React from "react";
import { Card, CardHeader, CardTitle } from "@src/shadcn/elements";
import { useTable } from "@refinedev/react-table";
import { getActionsButton } from "@src/common/containers/column/actionCard";
import { CardView } from "@src/shadcn/components/table/card-view";
import { type IAddress } from "../../../address/interface";

export function AddressDetail({ profileId }: { profileId: number }): JSX.Element {
  const { table } = useTableAddress(profileId);
  return (
    <Card className="shadow-xl pb-3 rounded-lg w-full bg-white dark:bg-gray-800 dark:text-white h-fit ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
          {"ທີ່ຢູ່"}
        </CardTitle>
      </CardHeader>
      <CardView table={table} className="w-96" showSearchBar={false} showPagination={false}>
        <CardView.Row<IAddress>
          header=""
          id="id"
          accessorKey="id"
          cell={({ row }) => {
            const rowData = row.original;
            const district = rowData.district ?? {};
            const village = rowData.village ?? "Unknown Year";
            const status = rowData.status ?? "Unknown Year";
            return (
              <>
                <label className=" -mx-44 text-md font-bold">{status}</label>
                <Show.Row
                  className=""
                  content={<div className="-mx-52">{`ບ້ານ${village ?? ""}, ${district?.districtName ?? ""}, ${district?.provinceName ?? ""}`}</div>}
                />
              </>
            );
          }}
        />
        {getActionsButton("address")}
      </CardView>
    </Card>
  );
}

const useTableAddress = (profileId: number) => {
  const table = useTable<IAddress>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "personal_address",
      filters: {
        initial: [
          { field: "profile", operator: "eq", value: profileId },
          { field: "expand", operator: "eq", value: "district" },
        ],
      },
    },
  });
  return { table };
};
