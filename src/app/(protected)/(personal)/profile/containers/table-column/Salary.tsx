import { Table } from "@/shadcn/components/table";
import type { IEmployee } from "@career";
import { type IProfile } from "../../interface/model";

export function Salary(positionId: number[]) {
  return (
    <Table.Column
      header="ເງິນເດືອນ"
      id="salary"
      accessorKey="salary"
      cell={({ row }) => {
        const employee = (row.original as IProfile).employee;
        if (employee.length > 0) {
          const latestEmployee = employee.find((emp) => emp.isLatest && positionId.includes(emp.positionId)) as IEmployee;
          if (latestEmployee) {
            return (
              <div className="mx-2">
                <div>{`${latestEmployee?.salary?.toLocaleString()} ກີບ`}</div>
              </div>
            );
          }
        }
        return <></>;
      }}
    />
  );
}

export function getWorkingAge() {
  return (
    <Table.Column
      header="ອາຍຸການເຮັດວຽກ"
      id="employee"
      accessorKey="employee"
      cell={({ row }) => {
        const employee = (row.original as IProfile).employee;
        if (employee.length > 0) {
          const sortedEmployees = sortEmployeesByJoiningDate(employee)?.[0];
          if (sortedEmployees) {
            const { years, months } = calculateWorkingAge(sortedEmployees?.joiningDate);
            return (
              <div className="mx-2">
                <div>{years} ປີ {months} ເດືອນ</div>
              </div>
            );
          }
        }
        return <></>;
      }}
    />
  );
}

const sortEmployeesByJoiningDate = (employees: IEmployee[]) => {
  return employees.slice().sort((a, b) => {
    const dateA = new Date(a.joiningDate).getTime();
    const dateB = new Date(b.joiningDate).getTime();
    return dateA - dateB;
  });
};
const monthsInYear = 12;

function calculateWorkingAge(joiningDate: string): { years: number, months: number } {
  const currentDate = new Date();
  const joiningDateObj = new Date(joiningDate);
  let yearsDiff = currentDate.getFullYear() - joiningDateObj.getFullYear();
  let monthsDiff = currentDate.getMonth() - joiningDateObj.getMonth();
  if (monthsDiff < 0) {
    yearsDiff--;
    monthsDiff += monthsInYear;
  }
  const currentDateDay = currentDate.getDate();
  const joiningDateDay = joiningDateObj.getDate();
  if (currentDateDay < joiningDateDay) {
    if (monthsDiff === 0) {
      yearsDiff--;
      monthsDiff = monthsInYear - 1;
    } else {
      monthsDiff--;
    }
  }

  return { years: yearsDiff, months: monthsDiff };
}
