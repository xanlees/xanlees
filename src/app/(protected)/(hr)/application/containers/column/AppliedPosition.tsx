/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import { Table } from "@/shadcn/components/table";
import { type IApplication } from "../../interface";
import UpdateApplicationStatus from "@src/shadcn/components/updateOnSelect";

export const AppliedPosition = (
  <Table.Column
    header="ສະໝັກຕໍາແໜ່ງ"
    accessorKey="tagId"
    id="appliedPosition"
    cell={(props) => {
      const { appliedPosition } = (props.row.original as IApplication) ?? {};
      return <p className="font-bold">{`${appliedPosition}`}</p>;
    }}
  />
);

export const TagIDColumn = (
  <Table.Column
    header="ເລກລະຫັດຟອມ"
    accessorKey="tagId"
    id="tagId"
    cell={(props) => {
      const { tagId } = (props.row.original as IApplication) ?? {};
      return <p className="font-bold">{`${tagId}`}</p>;
    }}
  />
);

export function ProfileImageColumn() {
  return (
    <Table.Column
      header="ຮູບພາບ"
      id="user"
      accessorKey="user"
      cell={({ row }: { row: { original: { profileId: { profilePicture: string } } } }) => {
        const rows = row?.original?.profileId;
        return <div className="">
          <Table.ImageTable row={rows} accessorKey={"profilePicture"} />
        </div>;
      }}
    />
  );
}

export const ExpectedSalary = (
  <Table.Column
    header="ເງິນເດືອນທີຕ້ອງການ"
    accessorKey="expectedSalary"
    id="expectedSalary"
    cell={(props) => {
      const { expectedSalary } = (props.row.original as IApplication) ?? {};
      const numericSalary = parseFloat(expectedSalary);
      const formattedSalary = numericSalary?.toLocaleString();
      return <p className="font-bold">{`${formattedSalary} ກີບ`}</p>;
    }}
  />
);
export const ProvinceColumn = (
  <Table.Column<IApplication>
    header="ແຂວງ"
    accessorKey="province"
    id="province"
    cell={(props) => {
      const provinceName = props?.row?.original?.province?.provinceName as unknown as string;
      return <p className="font-bold">{provinceName}</p>;
    }}
  />
);

export const UpdateProfileStatusColumn = (
  <Table.Column
    header="ເລືອນຂັ້ນເປັນພະນັກງານ"
    id="profileId"
    accessorKey="profileId"
    cell={(props) => {
      const dateValue = props.getValue();
      const id = dateValue.id as number;
      return (
        <UpdateApplicationStatus
          className=""
          defaultValue={""}
          id={id}
          optionsItem={optionsItem}
          field="type"
          resource="profile"
          isMultipart
        />
      );
    }}
  />
);

export const optionsItem = [
  { value: "EMPLOYEE", label: "ເລືອນຂັ້ນເປັນພະນັກງານ" },
];
