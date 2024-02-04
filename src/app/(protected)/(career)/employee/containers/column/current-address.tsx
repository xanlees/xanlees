"use client";
import { Table } from "@/shadcn/components/table";

interface PersonalAddressData {
  data: {
    currentDistrictDetail: {
      id: number;
      districtName: string;
      provinceName: string;
    };
    currentVillage: string;
  }[];
}

export function getCurrentAddress(personalAddressData: PersonalAddressData) {
  return <Table.Column
    header="ທີ່ຢູ່ ປະຈຸບັນ"
    id="personalAddressId"
    accessorKey="personalAddressId"
    cell={({ row }) => {
      console.log("row.original.personalAddressId", row.original.personalAddressId)
      console.log("personalAddressData", personalAddressData)
      const displayText = personalAddressData?.data.find(
        (item) => item?.currentDistrictDetail.id === row.original.personalAddressId.currentDistrictId
      );
      return (
        <div>
          {`${displayText?.currentVillage}, ${displayText?.currentDistrictDetail.districtName}, ${displayText?.currentDistrictDetail.provinceName}`}
        </div>
      );
    }}/>;
}
