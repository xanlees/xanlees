/* eslint-disable max-lines */
/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines-per-function */
"use client";
import { Badge } from "@src/shadcn/elements";
import { cn } from "@src/lib/utils";
import { type IBranch, type IPosition, type ISector } from "../../..";
import { Show } from "@/shadcn/components/crud";
import { useList, useShow } from "@refinedev/core";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@src/shadcn/elements/card";

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
  const joinedData = sectorData?.data.map((sector) => {
    const sectorId = sector.id;
    const positionsInSector = positionData?.data
      .filter((position) => position?.sectorId === sectorId)
      .map((position) => ({
        ...position,
        sectorId: {
          name: sector.name,
          id: sectorId,
          branchId: sector.branchId,
        },
      }));
    return {
      name: sector.branchId.name,
      id: sector.branchId.id,
      sector: [
        {
          ...sector,
          position: positionsInSector,
        },
      ],
    };
  });

  return (
    <Show>
      <Card className={cn("w-2/3 mx-auto my-5 rounded-lg p-2")}>
        <CardHeader>
          <CardTitle className="text-4xl text-center">
            <div>ສາຂາ</div>
            {`${record?.name}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Card className="grid grid-cols-1 gap-3 p-2 rounded-lg sm:grid-cols-2 md:grid-cols-3 ">
            {joinedData?.map((item) => {
              return (
                <div className="p-2 border rounded-lg w-90" key={item.id}>
                  <CardHeader>
                    <CardTitle className="text-2xl text-center">
                      ຂະແໜງ {item.sector[0].name}
                    </CardTitle>
                  </CardHeader>
                  <Card className="p-2 rounded-lg">
                    <CardHeader>
                      <CardTitle className="text-xl text-center">
                        ຕໍາແໜ່ງ
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {item?.sector?.[0]?.position?.map((position) => (
                          <Badge key={position.id}>{position.name}</Badge>
                        ))}
                      </div>
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
