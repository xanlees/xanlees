"use client";
import moment from "moment";
import React, { type ReactNode } from "react";

import { Show } from "@/shadcn/components/crud";
import { Card, CardHeader, CardTitle, Label } from "@src/shadcn/elements";

import { type IApplication } from "../../interface";
import {
  getApplicationStatusLabel, getTypeDrivingLicenseLabel, getTypeVaccineLabel,
} from "../../lib/constant";

export const Application: React.FC<{ applicationData: IApplication }> = ({ applicationData }) => {
  return (
    <CardContainer title={"ຂໍ້ມູນແບບຟອມສະໝັກວຽກ"}>
      <div className="px-4 py-2">
        <PositionDetail applicationData={applicationData}/>
        <EmergencyDetail applicationData={applicationData}/>
        <General applicationData={applicationData}/>
      </div>
    </CardContainer>
  );
};

export const PositionDetail: React.FC<{ applicationData: IApplication }> = ({ applicationData }) => {
  const { province, appliedPosition, expectedSalary } = applicationData ?? {};
  return (
    <div>
      <Label className="text-lg pl-5 font-bold">ຕໍາແຫນ່ງທີ່ຕ້ອງການສະຫມັກ</Label>
      <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ຕໍາແຫນ່ງທີ່ສະຫມັກ"} content={(appliedPosition)} />
      <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ເງິນເດືອນທີ່ຕ້ອງການ"} content={`${Number(expectedSalary)?.toLocaleString()} ກີບ`} />
      <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ສະໝັກຢູ່ແຂວງ"} content={province?.provinceName} />
    </div>
  );
};

export const EmergencyDetail: React.FC<{ applicationData: IApplication }> = ({ applicationData }) => {
  const { emergencyFullname, emergencyRelationship, emergencyPhoneNumber } = applicationData ?? {};
  return (
    <div>
      <Label className="text-lg pl-5 font-bold">ກໍລະນີສຸກເສີນຕິດຕໍ່ຫາ</Label>
      <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ຊື່ ແລະ ນາມສະກຸນ"} content={emergencyFullname} />
      <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ຄວາມສໍາພັນ"} content={emergencyRelationship} />
      <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ຊື່ ແລະ ນາມສະກຸນ"} content={emergencyPhoneNumber} />
    </div>
  );
};

export const General: React.FC<{ applicationData: IApplication }> = ({ applicationData }) => {
  const { typeDrivingLicense, vehicleType, applicationStatus, createdOn, tagId, pledgeReason, appliedReason } = applicationData ?? {};
  const defaultText = "ບໍ່ມີຂໍ້ມູນ";

  return (
    <div>
      <Label className="text-lg pl-5 font-bold">ຂໍ້ມູນທົ່ວໄປ</Label>
      <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ໃບຂັບຂີ່"} content={getTypeDrivingLicenseLabel(typeDrivingLicense)}/>
      <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ສາມາດໃຊ້ພາຫະນະປະເພດ"} content={getTypeVaccineLabel(vehicleType)} />
      <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ສະຖານະແບບຟອມ"} content={getApplicationStatusLabel(applicationStatus)} />
      <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ລະຫັດຟອມ"} content={tagId} />
      <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ສະໝັກວັນທີ"} content={moment(createdOn).format("DD/MMM/YYYY")} />
      <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-700">
        <div className="text-md font-bold">{"ເຫດຜົນທີ່ຢາກເຮັດວຽກນໍາບໍລິລັດເຮົາ"}</div>
        <div className="text-gray-600 dark:text-gray-300">{pledgeReason || defaultText}</div>
      </div>
      <div className="px-5 py-3">
        <div className="text-md font-bold">{"ຄໍາປະຕິຍານຕົນ"}</div>
        <div className="text-gray-600 dark:text-gray-300">{appliedReason || defaultText}</div>
      </div>
    </div>
  );
};

const CardContainer: React.FC<{ children: ReactNode, title: string }> = ({ children, title }) => {
  return (
    <Card className="shadow-xl pb-3 rounded-lg w-full bg-white dark:bg-gray-800 dark:text-white h-fit ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
          {title}
        </CardTitle>
      </CardHeader>
      {children}
    </Card>
  );
};

