import { MapPinned } from "lucide-react";
import React from "react";
import type { IPersonalAddress } from "../../interface";

interface AddressSectionProps {
  personalAddressData?: IPersonalAddress
}

export const Address: React.FC<AddressSectionProps> = ({ personalAddressData }) => {
  return (
    <>
      <div className="my-4 text-xl  font-bold">ທີ່ຢູ່</div>
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
