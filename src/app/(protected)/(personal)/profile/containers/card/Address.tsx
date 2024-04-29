import { Show } from "@/shadcn/components/crud";
import React, { type ReactNode } from "react";
import { Card, CardHeader, CardTitle } from "@src/shadcn/elements";
import { useTable } from "@refinedev/react-table";
import { getActionsButton } from "@src/common/containers/column/actionCard";
import { CardView } from "@src/shadcn/components/table/card-view";
import { type IAddress } from "../../../address/interface";

export function AddressDetail({ profileId }: { profileId: number }): JSX.Element {
  const { table } = useCardAddress(profileId);
  const addressData = table.options.data ?? [];
  if (addressData.length === 0) {
    return <CardLayout ><div>ບໍ່ມີຂໍ້ມູນ</div></CardLayout>;
  }
  return (
    <CardLayout >
      <CardView table={table} className="w-80 m-2 flex-col" showSearchBar={false} showPagination={false}>
        <CardView.Row<IAddress>
          header=""
          id="id"
          accessorKey="id"
          cell={({ row }) => {
            const rowData = row.original;
            const district = rowData.district ?? {};
            const village = rowData.village ?? "";
            const status = rowData.status ?? "";
            return (
              <div className="flex -mx-40">
                <Show.Row
                  className=""
                  title={status}
                  content={<div className="w-[250px]">{`ບ້ານ${village ?? ""}, ${district?.districtName ?? ""}, ${district?.provinceName ?? ""}`}</div>}
                />
              </div>
            );
          }}
        />
        {getActionsButton("address")}
      </CardView>
    </CardLayout>
  );
}

function CardLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <Card className="shadow-xl pb-2 rounded-lg bg-white dark:bg-gray-800 dark:text-white h-fit w-80 ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
          {"ທີ່ຢູ່"}
        </CardTitle>
      </CardHeader>
      {children}
    </Card>

  );
}
const useCardAddress = (profileId: number) => {
  const table = useTable<IAddress>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      errorNotification: false,
      resource: "personal_address",
      filters: {
        permanent: [
          { field: "profile", operator: "eq", value: profileId },
          { field: "expand", operator: "eq", value: "district" },
        ],
      },
    },
  });
  return { table };
};
