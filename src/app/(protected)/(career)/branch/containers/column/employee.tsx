import { Table } from "@/shadcn/components/table";
import { stringToColorCode } from "@src/lib/string2Color";
import { type IEmployeeExpandProfile } from "../../../employee/interface";

export function employeeColumn({ employeeData, title }: { employeeData: IEmployeeExpandProfile[], title: string }) {
  return (
    <Table.Column
      header={title}
      accessorKey="id"
      id="employee"
      cell={({ row: { original } }) => {
        const branchId = original?.id;
        const filteredEmployee = employeeData?.filter((employee) => employee?.branchId === branchId);
        return (
          <div>
            {filteredEmployee?.map((item, index) => (
              <div
                className="text-center text-white  dark:bg-white mt-0.5"
                style={{ backgroundColor: `${stringToColorCode(item?.positionId?.sectorId?.name)}` }}
                key={index}
              >
                {item?.profileId?.fullname}
              </div>
            ))}
          </div>
        );
      }}
    />
  );
}

