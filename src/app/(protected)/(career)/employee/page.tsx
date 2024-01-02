/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/naming-convention */
"use client";

import { List } from "@/shadcn/components/crud";
import { Table, type TableFilterProps } from "@/shadcn/components/table";
import { Badge, Checkbox, CommandItem } from "@src/shadcn/elements";
import { useMany, useUserFriendlyName } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { Edit, Eye, Trash2 } from "lucide-react";
import moment from "moment";
import type {
  IEmployee,
  IPersonalAddress,
  GenderType,
  MaritalStatusType,
  ISector,
} from "./interface";
// import { statusBadge } from "./lib/utils";
import { EmployeeContainer, TableSection } from "./employeeLayout";
import { getGenderDisplayText, getMaritalStatusDisplayText } from "./lib/genderUtils";

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
  const employees = table.options.data ?? [];
  const personalAddressId = employees.map((item) =>
    item?.profileDetail?.personalAddressId !== undefined ? item.profileDetail.personalAddressId : 0,
  );

  const { data: personalAddressData } = useMany<IPersonalAddress>({
    resource: "personal_address",
    ids: personalAddressId,
    queryOptions: {
      enabled: employees.length > 0,
    },
  });

  const sectorId = employees.map((item) =>
    item?.positionDetail?.sectorId !== undefined ? item.positionDetail.sectorId : 0,
  );

  const { data: sectorData } = useMany<ISector>({
    resource: "sector",
    ids: sectorId,
    queryOptions: {
      enabled: employees.length > 0,
    },
  });

  const friendly = useUserFriendlyName();
  return (
    <List>
      <EmployeeContainer>
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
                  onCheckedChange={(value) => {
                    row.toggleSelected(Boolean(value));
                  }}
                  aria-label="Select row"
                  key={`checkbox-${row.original.id}`}
                />
              )}
            />
            <Table.Column
              header={"ຊື່ ແລະ ນາມສະກຸນ (ຊຶ່ຫຼີ້ນ)"}
              accessorKey="profileDetail.fullname"
              id="fullname"
              enableSorting
              enableHiding
              filter={(props: TableFilterProps) => (
                <Table.Filter.Search {...props} title="Search fullname" />
              )}
              cell={(props) => {
                const fullName = props.row.original.profileDetail.fullname;
                const nickName = props.row.original.profileDetail.nickname;
                return <p className="font-bold">{`${fullName} (${nickName})`}</p>;
              }}
            />
            <Table.Column
              header={"ເບີໂທລະສັບ"}
              accessorKey="profileDetail.phoneNumber"
              id="phoneNumber"
              enableSorting
              enableHiding
              filter={(props: TableFilterProps) => (
                <Table.Filter.Search {...props} title="Search phoneNumber" />
              )}
              cell={(props) => {
                return <p className="-mx-5 italic text-blue-500 underline ">{`+856 ${props.getValue() as unknown as string}`}</p>;
              }}
            />
            <Table.Column
              header="ເພດ"
              id="gender"
              accessorKey="profileDetail.gender"
              enableSorting
              enableHiding
              cell={(props) => {
                const gender = props.getValue() as unknown as GenderType;
                const displayText = getGenderDisplayText(gender);
                return <Badge>{displayText}</Badge>;
              }}
            />
            <Table.Column
              header="ສະຖານະ"
              id="maritalStatus"
              accessorKey="profileDetail.maritalStatus"
              enableSorting
              enableHiding
              cell={(props) => {
                const maritalStatus = props.getValue() as unknown as MaritalStatusType;
                const displayText = getMaritalStatusDisplayText(maritalStatus);
                return <Badge className="bg-green-500">{displayText}</Badge>;
              }}
            />
            <Table.Column
              header="ວັນເດືອນປີ ເກີດ"
              id="birthday"
              accessorKey="profileDetail.birthday"
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
              header="ວັນທີ່ເຂົ້າບໍລິສັດ"
              id="joiningDate"
              accessorKey="joiningDate"
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
              header="ທີ່ຢູ່ ປະຈຸບັນ"
              id="currentVillage"
              accessorKey="profileDetail.personalAddressId"
              enableSorting
              enableHiding
              cell={({ row }) => {
                const displayText = personalAddressData?.data.find(
                  (item) =>
                    item?.id === row.original.profileDetail.personalAddressId,
                );
                return <div>{`${displayText?.currentVillage}, ${displayText?.currentDistrictDetail.districtName}, ${displayText?.currentDistrictDetail.provinceName}`}</div>;
              }}
            />
            <Table.Column
              header="ຕຳແໜ່ງ"
              id="position"
              accessorKey="positionDetail.name"
              enableSorting
              enableHiding
              cell={(props) => {
                const position = props?.getValue<string>();
                return <div>{position ?? ""}</div>;
              }}
            />
            <Table.Column
              header="ສັງກັດ"
              id="sector"
              accessorKey="positionDetail.id"
              enableSorting
              enableHiding
              cell={({ row }) => {
                const displayText = sectorData?.data.find(
                  (item) => item?.id === row.original.positionDetail.sectorId,
                );
                return <div>{`${displayText?.name}, ${displayText?.branchDetail?.name}`}</div>;
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
                    resource="employee"
                    icon={<Eye size={16} />}
                  />
                  <Table.EditAction
                    title="Edit"
                    row={original}
                    resource="employee"
                    icon={<Edit size={16} />}
                  />
                  <Table.DeleteAction
                    title="Delete"
                    row={original}
                    withForceDelete={true}
                    resource="employee"
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
