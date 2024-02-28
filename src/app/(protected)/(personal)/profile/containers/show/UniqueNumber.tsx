/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { Badge as ShadcnBadge } from "@src/shadcn/elements/badge";

export const UniqueNumber: React.FC<{
  record?: any
}> = ({ record }) => {
  const codeType = getTypeDisplayText(
    record?.data?.[0]?.profileId?.typeOfUniqueNumber,
  );
  const uniqueNumberList = record?.data?.[0]?.profileId?.uniqueNumber ?? [];
  return (
    <div>
      <div className="mb-4 text-2xl font-bold">{codeType}</div>
      <div className="flex flex-wrap">
        <div className="gap-2 px-2">
          {uniqueNumberList.map(
            (
              item: any,
            ) => (
              <ShadcnBadge className="mx-1.5">{item}</ShadcnBadge>
            ),
          )}
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
  return "";
};
