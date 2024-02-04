/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/naming-convention */
import { MapPinned, GraduationCap, CalendarDays, Badge } from "lucide-react";
import moment from "moment";
import React from "react";
import { type IEmployee, type ISector } from "../../interface";
import { Badge as ShadcnBadge } from "@src/shadcn/elements/badge";
interface AddressSectionProps {
  personalAddressData?: {
    data: {
      bornVillage: string
      currentVillage: string
      bornDistrictDetail: {
        districtName: string
        provinceName: string
      }
      currentDistrictDetail: {
        districtName: string
        provinceName: string
      }
    }
  }
}

export const AddressSection: React.FC<AddressSectionProps> = ({
  personalAddressData,
}) => {
  return (
    <>
      <div className="my-4 text-2xl font-bold">ທີ່ຢູ່</div>
      <div className="flex flex-wrap">
        <div className="px-2">
          <MapPinned className="w-5 h-5 mt-0.5" />
        </div>
        <div className="font-bold">ສະຖານທີ່ເກີດ:</div>
        <div className="px-2">
          {`ບ້ານ${personalAddressData?.data.bornVillage} - ${personalAddressData?.data.bornDistrictDetail.districtName} - ແຂວງ${personalAddressData?.data.bornDistrictDetail.provinceName}`}
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="px-2">
          <MapPinned className="w-5 h-5 mt-0.5" />
        </div>
        <div className="font-bold">ທີ່ຢູ່ປະຈຸບັນ:</div>
        <div className="px-2">
          {`ບ້ານ${personalAddressData?.data.currentVillage} - ${personalAddressData?.data.currentDistrictDetail.districtName} - ແຂວງ${personalAddressData?.data.currentDistrictDetail.provinceName}`}
        </div>
      </div>
    </>
  );
};

interface EducationSectionProps {
  educationData?: {
    data?: Array<{
      sector?: string
      branch?: string
      graduationDetail?: { degree?: string, sector?: string }
    }>
  }
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  educationData,
}) => {
  return (
    <>
      <div className="my-4 text-2xl font-bold">ການສຶກສາ</div>
      {educationData?.data?.[0] === undefined ? "ຍັງບໍ່ທັນຕື່ມຂໍ້ມູນ" : "" }
      {educationData?.data?.map((education, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-wrap">
            <div className="px-2">
              <GraduationCap className="w-5 h-5 mt-0.5" />
            </div>
            <div className="font-bold">ລະດັບຈົບການສຶກສາວິຊາສະເພາະ:</div>
            <div className="px-2">{`${education?.graduationDetail?.degree} - ${education?.graduationDetail?.sector}`}</div>
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

interface JoiningDateSectionProps {
  joiningDate?: string
}
export const JoiningDateSection: React.FC<JoiningDateSectionProps> = ({
  joiningDate,
}) => {
  return (
    <>
      <div className="my-4 text-2xl font-bold">ວັນທີ ເດືອນປີ ເຂົ້າວຽກກັບ</div>
      <div className="flex flex-wrap">
        <div className="px-2">
          <CalendarDays className="w-5 h-5 mt-0.5" />
        </div>
        <div className="font-bold">ວັນທີ ເດືອນປີ ເຂົ້າວຽກກັບ ບໍລິສັດ:</div>
        <div className="px-2">
          <div>{`${moment(joiningDate).format("MMMM DD, YYYY")}`}</div>
        </div>
      </div>
    </>
  );
};

export const SectionPosition: React.FC<{
  record?: IEmployee
  sectorData?: ISector
}> = ({ record, sectorData }) => {
  return (
    <div>
      <div className="mb-4 text-2xl font-bold">ຕໍາແໜ່ງ</div>
      <div className="flex flex-wrap">
        <div className="px-2">
          <Badge className="w-5 h-5 mt-0.5" />
        </div>
        <div className="font-bold">ຕໍາແໜ່ງ:</div>
        <div className="px-2">{record?.positionDetail.name}</div>
      </div>
      <div className="flex flex-wrap">
        <div className="px-2">
          <Badge className="w-5 h-5 mt-0.5" />
        </div>
        <div className="font-bold">ຂະແໜງ:</div>
        <div className="px-2">{sectorData?.name}</div>
      </div>
      <div className="flex flex-wrap">
        <div className="px-2">
          <Badge className="w-5 h-5 mt-0.5" />
        </div>
        <div className="font-bold">ສາຂາ:</div>
        <div className="px-2">{sectorData?.name}</div>
      </div>
    </div>
  );
};

export const UniqueNumber: React.FC<{
  record?: IEmployee
}> = ({ record }) => {
  const codeType = getTypeDisplayText(
    record?.profileId?.typeOfUniqueNumber,
  );
  const uniqueNumberList = record?.profileId?.uniqueNumber ?? [];
  return (
    <div>
      <div className="mb-4 text-2xl font-bold">{codeType}</div>
      <div className="flex flex-wrap">
        <div className="gap-2 px-2">
          {uniqueNumberList.map((item) => (
            <ShadcnBadge className="mx-1.5">{item}</ShadcnBadge>
          ))}
        </div>
      </div>
    </div>
  );
};

const getTypeDisplayText = (type: string | undefined): string => {
  if (type === "IDENTIFY") {
    return "ເລກບັດປະຈໍາຕົວ";
  } else if (type === "CENSUS_BOOK") {
    return "ປື້ມສໍາມະໂມຄົວເລກທີ";
  } else if (type === "MACHINE") {
    return "ເລກເຄື່ອງຂາຍເລກ";
  }
  return "ເລືອກລະຫັດ";
};
