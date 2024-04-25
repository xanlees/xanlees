/* eslint-disable max-lines */

"use client";
import { Show } from "@/shadcn/components/crud";
import React, { type ReactNode } from "react";
import { Card, CardHeader, CardTitle, Label } from "@src/shadcn/elements";
import moment from "moment";
import { type IApplication } from "../../interface";
import { getApplicationStatusLabel, getTypeDrivingLicenseLabel, getTypeVaccineLabel } from "../../lib/constant";

export const Application: React.FC<{ applicationData: IApplication }> = ({ applicationData }) => {
  const { pledgeReason, appliedReason } = applicationData ?? {};
  return (
    <>
      <CardContainer title={"ຂໍ້ມູນແບບຟອມສະໝັກວຽກ"}>
        <div className="px-4 py-2">
          <PositionDetail applicationData={applicationData}/>
          <EmergencyDetail applicationData={applicationData}/>
          <General applicationData={applicationData}/>
        </div>
      </CardContainer>
      <CardContainer title={"ເປັນຫຍັງທ່ານຈື່ງຢາກເຮັດວຽກກັບ ວິສາຫະກິດສ່ນບຸກຄົນ ເອັສບີເອັສ"}>
        <Label className="pl-5">{appliedReason}</Label>
      </CardContainer>
      <CardContainer title={"ຖ້າໄດ້ເປັນພະນັກງານຂອງ ເອັສບີເອັສ ແລ້ວທ່ານຈະປະຕິຍານຕົນແນວໃດ ?"}>
        <Label className="pl-5">{pledgeReason}</Label>
      </CardContainer>
    </>
  );
};

export const PositionDetail: React.FC<{ applicationData: IApplication }> = ({ applicationData }) => {
  const { expectedSalary, appliedPosition } = applicationData ?? {};
  return (
    <div>
      <Label className="text-lg pl-5 font-bold">ຕໍາແຫນ່ງທີ່ຕ້ອງການສະຫມັກ</Label>
      <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ຕໍາແຫນ່ງທີ່ສະຫມັກ"} content={(appliedPosition)} />
      <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ເງິນເດືອນທີ່ຕ້ອງການ"} content={`${Number(expectedSalary)?.toLocaleString()} ກີບ`} />
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
  const { typeDrivingLicense, vehicleType, applicationStatus, createdOn, tagId } = applicationData ?? {};
  return (
    <div>
      <Label className="text-lg pl-5 font-bold">ຂໍ້ມູນທົ່ວໄປ</Label>
      <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ໃບຂັບຂີ່"} content={getTypeDrivingLicenseLabel(typeDrivingLicense)}/>
      <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ສາມາດໃຊ້ພາຫະນະປະເພດ"} content={getTypeVaccineLabel(vehicleType)} />
      <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ສະຖານະແບບຟອມ"} content={getApplicationStatusLabel(applicationStatus)} />
      <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ລະຫັດຟອມ"} content={tagId} />
      <Show.Row className="text-md text-gray-700 dark:text-gray-300" title={"ສະໝັກວັນທີ"} content={moment(createdOn).format("DD/MMM/YYYY")} />
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

