import { Table } from "@/shadcn/components/table";
import type { IWorkExperience } from "../../interface";

export function workExperienceColumn(dataWorkExperience: IWorkExperience[]) {
  return (
    <Table.Column
      header={"ປະສົບການເຮັດວຽກ"}
      accessorKey="id"
      id="applicationId"
      cell={({ row: { original } }) => {
        const display = (
          dataWorkExperience as { data?: IWorkExperience[] }
        )?.data?.filter((item) => item?.applicationId === original.id);
        return (
          <div className="space-y-2">
            {display?.map((item, index) => (
              <div key={item.id} className="flex items-center p-2 bg-gray-100 rounded-md shadow-md">
                <div className="font-semibold text-md">
                  <div className="flex items-start">
                    <span className="pr-2 text-gray-400">ປະສົບການ:</span>
                    <span>{`${item.time}: ${item.position}`}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="pr-2 text-gray-400">ຢູ່ທີ:</span>
                    <span>{item.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      }}
    />
  );
}
