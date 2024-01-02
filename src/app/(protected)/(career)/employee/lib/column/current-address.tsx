/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { Table } from "@/shadcn/components/table";

export function getCurrentAddress(personalAddressData: any) {
  return <Table.Column
    header="ທີ່ຢູ່ ປະຈຸບັນ"
    id="currentVillage"
    accessorKey="profileDetail.personalAddressId"
    enableSorting
    enableHiding
    cell={({ row }) => {
      const displayText = personalAddressData?.data.find(
        (item: { id: number }) => item?.id === row.original.profileDetail.personalAddressId,
      );
      return <div>{`${displayText?.currentVillage}, ${displayText?.currentDistrictDetail.districtName}, ${displayText?.currentDistrictDetail.provinceName}`}</div>;
    }} />;
}
