/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable max-lines */
"use client";

import { List } from "@/shadcn/components/crud";
import { Table, type TableFilterProps } from "@/shadcn/components/table";
import { Checkbox, CommandItem } from "@/shadcn/ui";
import { useUserFriendlyName } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { Edit, Eye, Trash2 } from "lucide-react";
import moment from "moment";
import { type IEmployee } from "./interface";
// import { statusBadge } from "./lib/utils";
import { EmployeeContainer, CardSection, TableSection } from "./employeeLayout";
import Card from "./lib/card";

// eslint-disable-next-line max-lines-per-function
export default function EmployeeList(): JSX.Element {
  const table = useTable<IEmployee>({
    columns: [],
    enableSorting: true,
    enableColumnFilters: true,
    refineCoreProps: {
      resource: "employee",
    },
  });
  const friendly = useUserFriendlyName();
  return (
    <List>
      <EmployeeContainer>
        <CardSection>
          <Card key="uniqueKey1" />
        </CardSection>
        <TableSection>
          <Table table={table}>
            <Table.Column
              id={"select"}
              accessorKey="id"
              header={({ table }) => (
                <Table.CheckAll table={table}>
                  <CommandItem
                    onSelect={() => {
                      alert("Delete Selected");
                    }}
                  >
                    Delete Selected ({table.getSelectedRowModel().rows.length}){" "}
                    {friendly(
                      "Row",
                      table.getSelectedRowModel().rows.length > 1 ? "plural" : "singular",
                    )}
                  </CommandItem>
                </Table.CheckAll>
              )}
              cell={({ row }) => (
                <Checkbox
                  className="translate-y-[2px]"
                  checked={row.getIsSelected()}
                  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                  onCheckedChange={(value) => {
                    row.toggleSelected(!!value);
                  }}
                  aria-label="Select row"
                  key={`checkbox-${row.original.id}`}
                />
              )}
            />
            <Table.Column
              header="First Name"
              id="firstName"
              accessorKey="firstName"
              enableSorting
              enableHiding
              filter={(props: TableFilterProps) => (
                <Table.Filter.Search {...props} title="Search First Name" />
              )}
            />
            <Table.Column
              header="Last Name"
              id="lastName"
              accessorKey="lastName"
              enableSorting
              enableHiding
              filter={(props: TableFilterProps) => (
                <Table.Filter.Search {...props} title="Search Last Name" />
              )}
            />
            <Table.Column
              header="Phone Number"
              id="phoneNumber"
              accessorKey="phoneNumber"
              enableSorting
              enableHiding
            />
            <Table.Column
              header="Birth Date"
              id="birthOfDate"
              accessorKey="birthOfDate"
              enableSorting
              enableHiding
              cell={(props) => {
                const dateValue = props.getValue();
                if (typeof dateValue === "string") {
                  return moment(dateValue).format("DD MMM YYYY");
                }
                return "";
              }}
            />
            <Table.Column
              header="Village Current"
              id="villageCurrent"
              accessorKey="villageCurrent"
              enableSorting
              enableHiding
            />
            <Table.Column
              header="Gender"
              id="gender"
              accessorKey="gender"
              enableSorting
              enableHiding
              cell={(props) => {
                const gender = props.getValue() as unknown as
                  | "MALE"
                  | "FEMALE"
                  | "OTHER";
                return <>{gender}</>;
              }}
            />
            <Table.Column
              header="Marital Status"
              id="maritalStatus"
              accessorKey="maritalStatus"
              enableSorting
              enableHiding
              cell={(props) => {
                const maritalStatus = props.getValue() as unknown as
                  | "SINGLE"
                  | "MARRIED"
                  | "DIVORCED"
                  | "WIDOWED";
                return <>{maritalStatus}</>;
              }}
            />
            <Table.Column
              header="Academic Year"
              id="academicYear"
              accessorKey="academicYear"
              enableSorting
              enableHiding
              cell={(props) => {
                const dateValue = props.getValue();
                if (typeof dateValue === "string") {
                  return moment(dateValue).format("DD MMM YYYY");
                }
                return "";
              }}
            />

            <Table.Column
              header="Start Work Date"
              id="startWorkDate"
              accessorKey="startWorkDate"
              enableSorting
              enableHiding
              cell={(props) => {
                const startWorkDate = props.getValue() as unknown as string;
                return <>{startWorkDate}</>;
              }}
            />

            <Table.Column
              header="Village Born"
              id="villageBorn"
              accessorKey="villageBorn"
              enableSorting
              enableHiding
              cell={(props) => {
                const villageBorn = props.getValue() as unknown as string;
                return <>{villageBorn}</>;
              }}
            />

            <Table.Column
              header="Position ID"
              id="positionId"
              accessorKey="positionId"
              enableSorting
              enableHiding
              cell={(props) => {
                const positionId = props.getValue() as unknown as number;
                return <>{positionId}</>;
              }}
            />

            <Table.Column
              header="Birth Address"
              id="birthAddress"
              accessorKey="birthAddress"
              enableSorting
              enableHiding
              cell={(props) => {
                const birthAddress = props.getValue() as unknown as number;
                return <>{birthAddress}</>;
              }}
            />

            <Table.Column
              header="Current Address"
              id="currentAddress"
              accessorKey="currentAddress"
              enableSorting
              enableHiding
              cell={(props) => {
                const currentAddress = props.getValue() as unknown as number;
                return <>{currentAddress}</>;
              }}
            />
            <Table.Column
              accessorKey={"id"}
              id={"actions"}
              cell={({ row: { original } }) => (
                <Table.Actions>
                  <Table.ShowAction
                    title="Detail"
                    row={original}
                    resource="user"
                    icon={<Eye size={16} />}
                  />
                  <Table.EditAction
                    title="Edit"
                    row={original}
                    resource="user"
                    icon={<Edit size={16} />}
                  />
                  <Table.DeleteAction
                    title="Delete"
                    row={original}
                    withForceDelete={true}
                    resource="user"
                    icon={<Trash2 size={16} />}
                  />
                </Table.Actions>
              )}
            />
          </Table>
        </TableSection>
      </EmployeeContainer>
    </List>
  );
}
