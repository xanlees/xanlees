import { Table } from "@/shadcn/components/table";
import { type IEmployee } from "@career";

export function TotalEarningColumn({ data }: { data: Array<{ user: number, value: number }> }) {
  return (
    <Table.Column
      header="ເງິນເດືອນໄດ້ຮັບ"
      id="user" accessorKey="user"
      cell={(props) => {
        const user = props.getValue() as unknown as number;
        const value = data?.find((item) => item?.user === user)?.value;
        if (isNaN(value as number)) {
          return <></>;
        }
        const roundedValue = Math.floor(Number(value));
        return (
          <>{`${roundedValue.toLocaleString()} ກີບ`}</>
        );
      }}
    />
  );
}

export function SalaryColumn({ employeeData }: { employeeData: IEmployee[] }) {
  return (
    <Table.Column
      header="ເງິນເດືອນ"
      id="employee" accessorKey="profile.id"
      cell={(props) => {
        const profile = props.getValue() as unknown as number;
        const employee = employeeData.find((eml) => eml.profileId === profile)?.salary;
        return (
          <>{`${Number(employee)?.toLocaleString()} ກີບ`}</>
        );
      }}
    />
  );
}
