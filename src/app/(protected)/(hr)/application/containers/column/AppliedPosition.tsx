"use client";
import { Table } from "@/shadcn/components/table";
import { type IApplication } from "../../interface";
import { CardImageDialog } from "@src/common/elements/CardImageDialog";

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
        const image = row?.original?.profileId?.profilePicture ?? "";
        return <div className="">
          <CardImageDialog imageUrl={image}/>
        </div>;
      }}
    />
  );
}

