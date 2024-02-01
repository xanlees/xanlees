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
    id="personalAddressDetail"
    accessorKey="personalAddressDetail.currentDistrictId"
    cell={({ row }) => {
      const displayText = personalAddressData?.data.find(
        (item) => item?.currentDistrictDetail.id === row.original.personalAddressDetail.currentDistrictId
      );
      return (
        <div>
          {`${displayText?.currentVillage}, ${displayText?.currentDistrictDetail.districtName}, ${displayText?.currentDistrictDetail.provinceName}`}
        </div>
      );
    }}/>;
}
