import { Table } from "@/shadcn/components/table";
import { stringToColorCode } from "@src/lib/string2Color";

export function employeeColumn({ employeeData, title }: { employeeData: any[], title: string }) {
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
            {filteredEmployee?.map((item, index) => {
              const sectorName: string | undefined = item?.positionId?.sectorId?.name;
              const backgroundColor = sectorName ? stringToColorCode(sectorName) : "#000000";
              return (
                <div
                  className="text-center text-white dark:bg-white mt-0.5"
                  style={{ backgroundColor }}
                  key={index}
                >
                  {item?.profileId?.fullname}
                </div>
              );
            })}
          </div>
        );
      }}
    />
  );
}

