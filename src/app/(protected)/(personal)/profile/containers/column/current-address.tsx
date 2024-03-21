/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Table } from "@/shadcn/components/table";
import type { IPersonalAddress } from "../../../../(career)/employee/interface";

export interface PersonalAddressData {
  data?: IPersonalAddress[]
}

export function getCurrentAddress(personalAddressData: PersonalAddressData) {
  return (
    <Table.Column
      header="ທີ່ຢູ່ ປະຈຸບັນ"
      id="personalAddressId"
      accessorKey="personalAddressId"
      cell={({ row }) => {
        const currentDistrict = row.original?.personalAddressId?.id as number;
        const displayText = personalAddressData?.data?.find((item) => item?.id === currentDistrict);
        return (
          <div>
            {`${displayText?.currentVillage}, ${displayText?.currentDistrictId?.districtName}, ${displayText?.currentDistrictId?.provinceName}`}
          </div>
        );
      }}
    />
  );
}
