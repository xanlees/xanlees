/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
"use client";

import { cn } from "@src/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@src/shadcn/elements/card";
import { Show } from "@/shadcn/components/crud";
import { type GetListResponse, useList, useShow } from "@refinedev/core";
import type { ISector, IPosition, IBranch } from "../../interface/interface";

export default function BranchShow({
  params,
}: {
  params: { id: number }
}): JSX.Element {
  const { queryResult } = useShow<IBranch>();
  const { data } = queryResult;
  const record: IBranch | undefined = data?.data;
  const { data: sectorData } = useList<ISector>({
    resource: "sector",
    filters: [
      {
        field: "branch_id",
        operator: "eq",
        value: record?.id ?? 0,
      },
    ],
    errorNotification: false,
  });

  const sectorIs = sectorData?.data.map((item) =>
    item?.id !== undefined ? item.id : [0],
  );
  const { data: positionData } = useList<IPosition>({
    resource: "position",
    filters: [
      {
        field: "sector_id",
        operator: "eq",
        value: sectorIs,
      },
    ],
    errorNotification: false,
  });
  const branchDetailsWithPositions = mapSectorToBranchDetails({
    sectorData,
    positionData,
  });
  return (
    <Show>
      <Card className={cn("w-2/3 mx-auto my-5 rounded-lg p-2")}>
        <CardHeader>
          <CardTitle className="text-4xl text-center">
            {`ສາຂາ ${record?.name}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Card className="flex flex-col gap-2 p-2 rounded-lg md:flex-row">
            {branchDetailsWithPositions?.map((item) => {
              return (
                <div
                  className="w-full p-2 border rounded-lg md:w-1/2"
                  key={item?.id}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl text-center">
                      ຂະແໜງ {item?.sector[0]?.name}
                    </CardTitle>
                  </CardHeader>
                  <Card className="p-2 rounded-lg">
                    <CardHeader>
                      <CardTitle className="text-xl text-center">
                        ຕໍາແໜ່ງ
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul>
                        {item?.sector?.[0]?.position?.map((position) => (
                          <li key={position.id}>{position?.name}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </Card>
        </CardContent>
      </Card>
    </Show>
  );
}

function mapSectorToBranchDetails({
  sectorData,
  positionData,
}: {
  sectorData: ISector[] | undefined
  positionData: GetListResponse<IPosition> | undefined
}) {
  if (!Array.isArray(sectorData)) {
    return [];
  }

  const positions = positionData?.data ?? [];
  return sectorData.map((sector) => {
    const sectorId = sector.id;
    const positionsInSector = positions
      ?.filter((position) => position?.sectorId === sectorId)
      ?.map((position) => ({
        ...position,
        sectorDetail: {
          name: sector.name,
          id: sectorId,
          branchId: sector.branchId,
        },
      }));

    return {
      name: sector.branchDetail.name,
      id: sector.branchDetail.id,
      sector: [
        {
          ...sector,
          position: positionsInSector,
        },
      ],
    };
  });
}
