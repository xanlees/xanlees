/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Table } from "@/shadcn/components/table";
import { type IWorkExperience } from "../../../work-experience/interface";
export function workExperienceColumn(dataWorkExperience: IWorkExperience[]) {
  return (
    <Table.Column
      header={"ປະສົບການເຮັດວຽກ"}
      accessorKey="id"
      id="applicationId"
      cell={({ row: { original } }) => {
        const display = (dataWorkExperience as { data?: IWorkExperience[] })?.data?.filter((item) => item?.applicationId === original.id);
        return (
          <div className="space-y-2">
            {display?.map((item, index) => (
              <div key={item.id} className="">
                <div className="flex items-start text-md">
                  <span className="mx-2">{index + 1}.</span>
                  <div className="flex">
                    <div className="mx-1 text-gray-400">ຢູ່ທີ:</div>
                    <div className="">{item.company}</div>
                  </div>
                  <div className="flex">
                    <div className="mx-1 text-gray-400">ເປັນເວລາ:</div>
                    <div className="">{item.time}/{item.position}</div>
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
