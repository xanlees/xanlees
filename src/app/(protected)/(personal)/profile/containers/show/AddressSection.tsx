/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { MapPinned } from "lucide-react";
import React from "react";

export const AddressSection: React.FC<any> = ({ personalAddressData }) => {
  return (
    <>
      <div className="my-4 text-2xl font-bold">ທີ່ຢູ່</div>
      <div className="flex flex-wrap">
        <div className="px-2">
          <MapPinned className="w-5 h-5 mt-0.5" />
        </div>
        <div className="font-bold">ສະຖານທີ່ເກີດ:</div>
        <div className="px-2">
          {`ບ້ານ${personalAddressData?.bornVillage} - ${personalAddressData?.bornDistrictId?.districtName} - ແຂວງ${personalAddressData?.bornDistrictId?.provinceName}`}
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="px-2">
          <MapPinned className="w-5 h-5 mt-0.5" />
        </div>
        <div className="font-bold">ທີ່ຢູ່ປະຈຸບັນ:</div>
        <div className="px-2">
          {`ບ້ານ${personalAddressData?.currentVillage} - ${personalAddressData?.currentDistrictId?.districtName} - ແຂວງ${personalAddressData?.currentDistrictId?.provinceName}`}
        </div>
      </div>
    </>
  );
};
