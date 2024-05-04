"use client";

import { List } from "@/shadcn/components/crud";
import { InputToClipboard } from "@/shadcn/components/InputToClipboard";
import { Table } from "@/shadcn/components/table";
import { MarriageColumn, PhoneNumberColumn } from "@src/common/containers/column";
import { getActionsColumn } from "@src/common/containers/column/action";

import {
  ApplicationDate, ApplicationStatusColumn, AppliedPosition, ExpectedSalary, FullNameColumn,
  ProfileImageColumn, ProvinceColumn, TagIDColumn,
} from "./containers/column";
import { useTableApplication } from "./hooks/useTableApplication";

export default function ApplicationList(): JSX.Element {
  const { table } = useTableApplication();
  return (
    <List showCreate={false}>
      <span className="mx-2 mt-10 text-sm font-bold">ສົ່ງລີ້ງໃຫ້ຜູ້ສະໝັກ:</span>
      <InputToClipboard value={`${process.env.NEXTAUTH_URL}/application/apply`} />
      <div className="-mt-[3.25rem]">
        <Table table={table} SearchBarTitle="ຄົ້ນຫາດ້ວຍ ຊື່ແທ້ ເບີໂທລະສັບ">
          {ProfileImageColumn()}
          {TagIDColumn}
          {FullNameColumn("profileId.fullname")}
          {PhoneNumberColumn("profileId.phoneNumber")}
          {MarriageColumn("profileId.maritalStatus")}
          {ApplicationDate}
          {AppliedPosition}
          {ExpectedSalary}
          {ProvinceColumn}
          {ApplicationStatusColumn()}
          {getActionsColumn({ resource: "application", hideEdit: true })}
        </Table>
      </div>
    </List>
  );
}
