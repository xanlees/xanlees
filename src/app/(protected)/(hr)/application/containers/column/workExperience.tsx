import { Table } from "@/shadcn/components/table";
import type { IWorkExperience } from "../../interface";

export function workExperienceColumn(dataWorkExperience: IWorkExperience[]) {
  return (
    <Table.Column
      header={"ປະສົບການເຮັດວຽກ"}
      accessorKey="id"
      id="applicationId"
      enableSorting
      enableHiding
      cell={({ row: { original } }) => {
        const displaySectors = (dataWorkExperience as { data?: IWorkExperience[] })?.data
          ?.filter((item) => item?.applicationId === original.id);
        return (
          <div>
            {displaySectors?.map((item, index) => (
              <div key={index}>
                <div>{item.time}</div>
                <div>{item.position}</div>
              </div>
            ))}
          </div>
        );
      }}
    />
  );
}
