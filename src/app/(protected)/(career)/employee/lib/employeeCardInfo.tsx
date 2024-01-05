/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/naming-convention */
import { MapPinned, GraduationCap, CalendarDays, Badge } from "lucide-react";
import moment from "moment";
import React from "react";
import { type IEmployee, type ISector } from "../interface";

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
      <div className="my-4 text-2xl font-bold">Address</div>
      <div className="flex flex-wrap">
        <div className="px-2">
          <MapPinned className="w-5 h-5 mt-0.5" />
        </div>
        <div className="font-bold">Born Address:</div>
        <div className="px-2">
          {`ບ້ານ${personalAddressData?.data.bornVillage} - ${personalAddressData?.data.bornDistrictDetail.districtName} - ແຂວງ${personalAddressData?.data.bornDistrictDetail.provinceName}`}
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="px-2">
          <MapPinned className="w-5 h-5 mt-0.5" />
        </div>
        <div className="font-bold">Current Address:</div>
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
      <div className="my-4 text-2xl font-bold">Education</div>
      {educationData?.data?.map((education, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-wrap">
            <div className="px-2">
              <GraduationCap className="w-5 h-5 mt-0.5" />
            </div>
            <div className="font-bold">ລະດັບການສຶກສາສາມັນ:</div>
            <div className="px-2">{`${education?.sector} - ${education?.branch}`}</div>
          </div>
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
      <div className="my-4 text-2xl font-bold">Joining Date - Company</div>
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
      <div className="mb-4 text-2xl font-bold">Position</div>
      <div className="flex flex-wrap">
        <div className="px-2">
          <Badge className="w-5 h-5 mt-0.5" />
        </div>
        <div className="font-bold">Position:</div>
        <div className="px-2">{record?.positionDetail.name}</div>
      </div>
      <div className="flex flex-wrap">
        <div className="px-2">
          <Badge className="w-5 h-5 mt-0.5" />
        </div>
        <div className="font-bold">Sector:</div>
        <div className="px-2">{sectorData?.name}</div>
      </div>
      <div className="flex flex-wrap">
        <div className="px-2">
          <Badge className="w-5 h-5 mt-0.5" />
        </div>
        <div className="font-bold">Branch:</div>
        <div className="px-2">{sectorData?.name}</div>
      </div>
    </div>
  );
};
