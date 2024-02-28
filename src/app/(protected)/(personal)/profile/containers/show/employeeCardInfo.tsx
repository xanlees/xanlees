/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Badge } from "lucide-react";
import React from "react";

export const SectionPosition: React.FC<{ employee?: any, sectorData?: any }> = ({ employee, sectorData }) => {
  return (
    <>
      <div className="mb-4 text-2xl font-bold">ຕໍາແໜ່ງ</div>
      {employee.data.map((item: { isLatest: any, id: React.Key | null | undefined, positionId: { name: any, id: any, sectorId: any } }) => {
        return (
          <div key={item.id} className="my-4">
            <div className="flex flex-wrap ">
              <div className="px-2">
                <Badge className="w-5 h-5 mt-0.5" />
              </div>
              <div className="font-bold">
                  ຕໍາແໜ່ງ: {item?.isLatest ? "ຕໍາແໜ່ງໃນອະດິດ" : "ຕໍາແໜ່ງປະຈຸບັນ"}
              </div>
              <div className="px-2">{item.positionId?.name}</div>
            </div>
            <SectionBranch item={item} sectorData={sectorData}/>
            <SectionSector item={item} sectorData={sectorData}/>
          </div>
        );
      },
      )}
    </>
  );
};

export const SectionBranch: React.FC<{ item?: any, sectorData?: any }> = ({ item, sectorData }) => {
  return (
    <div className="flex flex-wrap">
      <div className="px-2">
        <Badge className="w-5 h-5 mt-0.5" />
      </div>
      <div className="font-bold">ຂະແໜງ:</div>
      <div className="px-2">
        {sectorData?.data.map((sector: { id: any, name: any }) => {
          return (
            <div key={sector.id}>
              {item.positionId.sectorId === sector.id
                ? (
                  <div>{sector.name}</div>)
                : null}
            </div>
          );
        },
        )}
      </div>
    </div>
  );
};

export const SectionSector: React.FC<{ item?: any, sectorData?: any }> = ({ item, sectorData }) => {
  return (
    <div className="flex flex-wrap">
      <div className="px-2">
        <Badge className="w-5 h-5 mt-0.5" />
      </div>
      <div className="font-bold">ສາຂາ:</div>
      <div className="px-2">
        {sectorData?.data.map((sector: { id: any, branchDetail: { name: any } }) => {
          return <div key={sector.id}>
            {item?.positionId?.sectorId === sector.id
              ? (
                <div>{sector.branchDetail.name}</div>)
              : null}
          </div>;
        },
        )}
      </div>
    </div>
  );
};

