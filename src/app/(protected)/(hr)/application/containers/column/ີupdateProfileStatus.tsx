"use client";
import { Table } from "@/shadcn/components/table";
import UpdateApplicationStatus from "@src/shadcn/components/updateOnSelect";

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
          optionsConfig={optionsConfig}
          field="type"
          resource="profile"
          isMultipartFormData
        />
      );
    }}
  />
);

export const optionsConfig = [
  { value: "EMPLOYEE", label: "ເລືອນຂັ້ນເປັນພະນັກງານ" },
];
